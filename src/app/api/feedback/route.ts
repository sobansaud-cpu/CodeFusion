import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { getAuth } from 'firebase-admin/auth';

// POST: create new feedback (requires Authorization: Bearer <idToken>)
export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization') || '';
    if (!authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = await getAuth().verifyIdToken(token);
    const body = await req.json();
    const message = (body.message || '').trim();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const docRef = await db.collection('feedback').add({
      userId: decoded.uid,
      email: decoded.email || '',
      message,
      createdAt: new Date().toISOString(),
      status: 'pending',
    });

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (err: any) {
    console.error('Feedback POST error:', err);
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 });
  }
}

// GET: list all feedback items (public)
export async function GET() {
  try {
    const snapshot = await db.collection('feedback').orderBy('createdAt', 'desc').get();
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }));
    return NextResponse.json({ success: true, items });
  } catch (err: any) {
    console.error('Feedback GET error:', err);
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 });
  }
}
