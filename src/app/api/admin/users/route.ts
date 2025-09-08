import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { AdminUser } from '@/types';

export async function GET(request: NextRequest) {
  try {
    // Get all users from Firestore
    const usersRef = collection(db, 'users');
    const usersSnapshot = await getDocs(query(usersRef, orderBy('createdAt', 'desc')));
    
    const users: AdminUser[] = [];
    
    usersSnapshot.forEach((doc) => {
      const userData = doc.data();
      users.push({
        uid: doc.id,
        email: userData.email || '',
        displayName: userData.displayName || '',
        plan: userData.plan || 'free',
        sitesUsed: userData.sitesUsed || 0,
        totalGenerations: userData.dailyGenerations || 0,
        createdAt: userData.createdAt || new Date().toISOString(),
        lastActive: userData.lastActive || new Date().toISOString(),
        isBanned: userData.isBanned || false,
      });
    });

    return NextResponse.json({
      success: true,
      users
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
