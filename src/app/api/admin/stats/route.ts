import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { AdminStats } from '@/types';

export async function GET(request: NextRequest) {
  try {
    // Get users collection
    const usersRef = collection(db, 'users');
    const usersSnapshot = await getDocs(usersRef);
    
    // Get payment requests collection
    const paymentsRef = collection(db, 'paymentRequests');
    const paymentsSnapshot = await getDocs(paymentsRef);
    
    // Calculate statistics
    let totalUsers = 0;
    let premiumUsers = 0;
    let freeUsers = 0;
    let totalGenerations = 0;
    let pendingPayments = 0;
    let totalRevenue = 0;
    
    // Process users
    usersSnapshot.forEach((doc) => {
      const userData = doc.data();
      totalUsers++;
      
      if (userData.plan === 'free') {
        freeUsers++;
      } else {
        premiumUsers++;
      }
      
      totalGenerations += userData.dailyGenerations || 0;
    });
    
    // Process payments
    paymentsSnapshot.forEach((doc) => {
      const paymentData = doc.data();
      
      if (paymentData.status === 'pending') {
        pendingPayments++;
      } else if (paymentData.status === 'approved') {
        totalRevenue += paymentData.amount || 0;
      }
    });
    
    const stats: AdminStats = {
      totalUsers,
      premiumUsers,
      freeUsers,
      totalGenerations,
      pendingPayments,
      totalRevenue
    };

    return NextResponse.json({
      success: true,
      stats
    });

  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
