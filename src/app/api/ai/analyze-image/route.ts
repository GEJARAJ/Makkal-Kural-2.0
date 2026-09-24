import { NextRequest, NextResponse } from 'next/server';
import { analyzeGrievanceImage } from '@/lib/ai-service';
import { withRateLimit, applySecurityHeaders } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    const rateLimitResponse = withRateLimit(req, { max: 10, windowMs: 60_000 });
    if (rateLimitResponse instanceof NextResponse && rateLimitResponse.status === 429) {
      return rateLimitResponse;
    }

    const body = await req.json();
    const { imageBase64, category } = body;

    if (!imageBase64) {
      return applySecurityHeaders(
        NextResponse.json({ error: 'Missing imageBase64 in request' }, { status: 400 })
      );
    }

    const result = await analyzeGrievanceImage(imageBase64, category);
    return applySecurityHeaders(NextResponse.json({ success: true, data: result }));
  } catch (error: any) {
    console.error('Image analysis API error', error);
    return applySecurityHeaders(
      NextResponse.json({ error: error.message || 'Image analysis failed' }, { status: 500 })
    );
  }
}
