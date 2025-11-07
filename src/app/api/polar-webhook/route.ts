import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, updateDoc, setDoc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';

// Live credentials
const POLAR_PRO_PRODUCT_ID = 'b2b22887-75f1-438f-a77d-f715748504dd';
const POLAR_WEBHOOK_SECRET = 'polar_whs_BkAE2k4vfB9lic8GwDv3K5GfmPM89mDaHxOUR0qyUUo';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const sig = req.headers.get('polar-signature');
  // TODO: Verify webhook signature using POLAR_WEBHOOK_SECRET if Polar.sh provides a method
  // For now, assume it's valid

  try {
    // Handle Polar.sh Live  order events
    if ((body.type === 'order.created' || body.type === 'order.updated' || body.type === 'order.paid') && body.data.product_id === POLAR_PRO_PRODUCT_ID && body.data.status === 'paid') {
  const data = body.data;
  // Use Polar order ID (or payment id) as idempotency key when available
  const polarOrderId = data.id || data.order_id || data.payment_id || (data.order && (data.order.id || data.order._id)) || '';
      const userEmail = data.customer?.email || '';
      const cardNumber = data.card_last4 || data.customer?.id || '';

      // Look up Firebase Auth UID by email
      let userId = '';
      try {
        const { collection, getDocs, query, where } = await import('firebase/firestore');
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', userEmail));
        const querySnap = await getDocs(q);
        if (!querySnap.empty) {
          userId = querySnap.docs[0].id;
        }
      } catch (e) {
        console.error('Error looking up user UID for payment request:', e);
      }

      // First try to dedupe by Polar order id if provided (best idempotency)
      let existingId = '';
      try {
        const { collection, getDocs, query, where } = await import('firebase/firestore');
        const paymentRequestsRef = collection(db, 'paymentRequests');
        if (polarOrderId) {
          const qId = query(paymentRequestsRef, where('polarOrderId', '==', polarOrderId));
          const snap = await getDocs(qId);
          if (!snap.empty) {
            existingId = snap.docs[0].id;
          }
        }
        // If we couldn't find by polarOrderId, fall back to previous same-day heuristic
        if (!existingId) {
          // Check for same userEmail, accountNumber, plan, and createdAt (same day)
          const today = new Date();
          today.setHours(0,0,0,0);
          const q = query(
            paymentRequestsRef,
            where('userEmail', '==', userEmail),
            where('accountNumber', '==', cardNumber),
            where('plan', '==', 'pro'),
            where('paymentMethod', '==', 'polar')
          );
          const querySnap = await getDocs(q);
          querySnap.forEach(docSnap => {
            const d = docSnap.data();
            if (d.createdAt) {
              const created = new Date(d.createdAt);
              created.setHours(0,0,0,0);
              if (created.getTime() === today.getTime()) {
                existingId = docSnap.id;
              }
            }
          });
        }
      } catch (e) {
        console.error('Error checking for duplicate payment request:', e);
      }

      if (existingId) {
        // Update existing payment request
        const paymentRequestRef = doc(db, 'paymentRequests', existingId);
        await updateDoc(paymentRequestRef, {
          userId,
          userEmail,
          paymentMethod: 'polar',
          amount: data.amount ? data.amount / 100 : 10,
          plan: 'pro',
          status: 'pending',
          accountName: data.customer?.public_name || '',
          accountNumber: cardNumber,
          // keep original createdAt if present, but update processedAt/time
          updatedAt: new Date().toISOString(),
          polarOrderId: polarOrderId || null,
        });
      } else {
        // Create a new payment request
        const paymentRequestRef = doc(collection(db, 'paymentRequests'));
        await setDoc(paymentRequestRef, {
          id: paymentRequestRef.id,
          userId,
          userEmail,
          paymentMethod: 'polar',
          amount: data.amount ? data.amount / 100 : 10,
          plan: 'pro',
          status: 'pending',
          accountName: data.customer?.public_name || '',
          accountNumber: cardNumber,
          createdAt: new Date().toISOString(),
          polarOrderId: polarOrderId || null,
        });
      }
    }
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing Polar.sh webhook:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
