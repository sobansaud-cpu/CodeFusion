import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { getAuth } from 'firebase-admin/auth';

const isAdmin = async (token: string) => {
  try {
    const decoded = await getAuth().verifyIdToken(token);
    // Add your admin check logic here
    return true; // Temporary: make everyone admin for testing
  } catch {
    return false;
  }
};

// POST: send admin response to feedback
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = req.headers.get('authorization') || '';
    if (!authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    if (!(await isAdmin(token))) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const body = await req.json();
    const { response } = body;

    if (!response?.trim()) {
      return NextResponse.json({ error: 'Response is required' }, { status: 400 });
    }

    await db.collection('feedback').doc(params.id).update({
      adminResponse: response.trim(),
      status: 'reviewed',
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Send feedback response error:', err);
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 });
  }
}