import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, updateDoc, getDoc,setDoc, serverTimestamp } from 'firebase/firestore';

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { paymentId, status, adminEmail } = body;

    // Validate required fields
    if (!paymentId || !status || !adminEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate status
    if (!['approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    // Get payment request
    const paymentRef = doc(db, 'paymentRequests', paymentId);
    const paymentSnap = await getDoc(paymentRef);

    if (!paymentSnap.exists()) {
      return NextResponse.json(
        { error: 'Payment request not found' },
        { status: 404 }
      );
    }

    const paymentData = paymentSnap.data();

    // Update payment status
    await updateDoc(paymentRef, {
      status,
      processedAt: serverTimestamp(),
      processedBy: adminEmail,
    });

    // If approved, update user plan
    if (status === 'approved') {
      const plan = paymentData.plan;
      const maxDailyGenerations = plan === 'pro' ? 20 : 3;
      // Set expiry to 30 days from approval
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 30);

      // Use userId from paymentRequest to update correct user document
      const userId = paymentData.userId;
      if (userId) {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          await setDoc(userRef, {
            email: paymentData.userEmail,
            plan: plan,
            maxDailyGenerations: maxDailyGenerations,
            planExpiry: expiryDate.toISOString(),
            createdAt: new Date().toISOString(),
            sitesUsed: 0,
            dailyGenerations: 0,
            lastActive: new Date().toISOString(),
            isBanned: false,
            displayName: paymentData.accountName || '',
          });
        } else {
          await updateDoc(userRef, {
            plan: plan,
            maxDailyGenerations: maxDailyGenerations,
            planExpiry: expiryDate.toISOString(),
          });
        }
        console.log(`User ${userId} upgraded to ${plan} plan with ${maxDailyGenerations} generations per day`);
      } else {
        console.error('No userId found in paymentRequest, cannot update user plan.');
      }
    }

    return NextResponse.json({
      success: true,
      message: `Payment ${status} successfully`
    });

  } catch (error) {
    console.error('Error updating payment status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
