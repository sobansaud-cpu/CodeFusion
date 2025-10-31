import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { getAuth } from 'firebase-admin/auth';

const isAdmin = async (token: string) => {
  try {
    const decoded = await getAuth().verifyIdToken(token);
    // Add your admin check logic here, for example:
    // return decoded.email?.endsWith('@yourdomain.com') || decoded.uid === 'specific-admin-uid';
    return true; // Temporary: make everyone admin for testing
  } catch {
    return false;
  }
};

// GET: list all feedback items (admin only)
export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization') || '';
    if (!authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    if (!(await isAdmin(token))) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const snapshot = await db
      .collection('feedback')
      .orderBy('createdAt', 'desc')
      .get();
      
    const items = snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as any)
    }));

    return NextResponse.json({ success: true, items });
  } catch (err: any) {
    console.error('Admin Feedback GET error:', err);
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 });
  }
}