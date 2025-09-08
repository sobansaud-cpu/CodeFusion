import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, userEmail, paymentMethod, amount, plan, screenshotUrl, accountName, accountNumber } = body;

    // Validate required fields
    if (!userId || !userEmail || !paymentMethod || !amount || !plan) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create payment request document
    const paymentRequest = {
      userId,
      userEmail,
      paymentMethod,
      amount,
      plan,
      status: 'pending',
      screenshotUrl: screenshotUrl ? screenshotUrl.substring(0, 1000000) : null, // Limit URL length
      accountName: accountName || 'Muhammad Noaman Sauod',
      accountNumber: accountNumber || '03232204085',
      createdAt: serverTimestamp(),
    };

    // Add to Firestore
    const docRef = await addDoc(collection(db, 'paymentRequests'), paymentRequest);

    return NextResponse.json({
      success: true,
      paymentId: docRef.id,
      message: 'Payment request submitted successfully'
    });

  } catch (error) {
    console.error('Error creating payment request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
