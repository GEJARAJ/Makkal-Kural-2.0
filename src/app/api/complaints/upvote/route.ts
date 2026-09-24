import { NextRequest, NextResponse } from 'next/server';
import { upvoteComplaint } from '@/lib/supabase/database';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reference, fingerprint } = body;

    if (!reference) {
      return NextResponse.json({ error: 'Complaint reference is required' }, { status: 400 });
    }

    const result = await upvoteComplaint(reference, fingerprint || req.headers.get('x-forwarded-for') || 'anon');
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error in /api/complaints/upvote:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
