import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { PaymentRequest } from '@/types';

export async function GET(request: NextRequest) {
  try {
    // Get all payment requests from Firestore
    const paymentsRef = collection(db, 'paymentRequests');
    const paymentsSnapshot = await getDocs(query(paymentsRef, orderBy('createdAt', 'desc')));
    
    const payments: PaymentRequest[] = [];
    
    paymentsSnapshot.forEach((doc) => {
      const paymentData = doc.data();
      payments.push({
        id: doc.id,
        userId: paymentData.userId || '',
        userEmail: paymentData.userEmail || '',
        paymentMethod: paymentData.paymentMethod || 'easypaisa' || 'polar',
        amount: paymentData.amount || 0,
        plan: paymentData.plan || 'pro',
        status: paymentData.status || 'pending',
        screenshotUrl: paymentData.screenshotUrl || null,
        accountName: paymentData.accountName || 'Muhammad Noaman Sauod',
        accountNumber: paymentData.accountNumber || '03232204085',
        createdAt: paymentData.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        processedAt: paymentData.processedAt?.toDate?.()?.toISOString() || undefined,
        processedBy: paymentData.processedBy || undefined,
      });
    });

    return NextResponse.json({
      success: true,
      payments
    });

  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
