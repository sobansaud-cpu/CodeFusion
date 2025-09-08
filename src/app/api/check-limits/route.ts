import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userData = userSnap.data();
    const now = new Date();
    
    // Use firstGenerationDate if available, otherwise fallback to lastGenerationDate
    let firstGenDate: Date;
    try {
      const firstGenDateStr = userData.firstGenerationDate || userData.lastGenerationDate;
      if (firstGenDateStr) {
        firstGenDate = new Date(firstGenDateStr);
        // Validate the date
        if (isNaN(firstGenDate.getTime())) {
          throw new Error('Invalid date format');
        }
      } else {
        firstGenDate = now;
      }
    } catch (error) {
      console.error('Error parsing date:', error);
      firstGenDate = now;
    }
    
    // Check for subscription expiry
    let currentUserData = userData;
    if (userData.planExpiry && userData.plan === 'pro') {
      try {
        const expiryDate = new Date(userData.planExpiry);
        if (now > expiryDate) {
          // Update user to free plan
          await updateDoc(userRef, {
            plan: 'free',
            maxDailyGenerations: 3,
            planExpiry: null
          });
          currentUserData = {
            ...userData,
            plan: 'free',
            maxDailyGenerations: 3,
            planExpiry: null
          };
        }
      } catch (error) {
        console.error('Error parsing expiry date:', error);
      }
    }
    
    // Check if 24 hours have passed since the FIRST generation of the day
    // This creates a rolling 24-hour window
    const isNewDay = (now.getTime() - firstGenDate.getTime()) > 24 * 60 * 60 * 1000;
    
    if (isNewDay) {
      return NextResponse.json({ 
        remaining: currentUserData.maxDailyGenerations,
        max: currentUserData.maxDailyGenerations,
        plan: currentUserData.plan
      });
    }

    const remaining = Math.max(0, currentUserData.maxDailyGenerations - currentUserData.dailyGenerations);
    
    return NextResponse.json({ 
      remaining,
      max: currentUserData.maxDailyGenerations,
      plan: currentUserData.plan
    });

  } catch (error) {
    console.error('Error checking limits:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
