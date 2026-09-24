import { NextRequest, NextResponse } from 'next/server';
import { submitCitizenFeedback } from '@/lib/supabase/database';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reference, rating, feedback } = body;

    if (!reference || typeof rating !== 'number') {
      return NextResponse.json({ error: 'Reference and numerical rating are required' }, { status: 400 });
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 });
    }

    const success = await submitCitizenFeedback(reference, rating, feedback);
    if (!success) {
      return NextResponse.json({ error: 'Complaint not found or could not update' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Thank you for your feedback!' });
  } catch (error: any) {
    console.error('Error in /api/complaints/feedback:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
