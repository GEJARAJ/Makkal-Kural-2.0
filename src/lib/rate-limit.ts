import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 60; // 60 requests per minute
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getClientId(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return 'client-' + (Math.random().toString(36).substring(2, 8));
}

function checkRateLimit(key: string, maxLimit = RATE_LIMIT_MAX): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    const resetAt = now + RATE_LIMIT_WINDOW_MS;
    rateLimitMap.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: maxLimit - 1, resetAt };
  }

  if (entry.count >= maxLimit) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count += 1;
  return { allowed: true, remaining: maxLimit - entry.count, resetAt: entry.resetAt };
}

export function applySecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  return response;
}

export function withSecurityHeaders(response: NextResponse) {
  return applySecurityHeaders(response);
}

export function withRateLimit(req: NextRequest, options?: { max?: number; windowMs?: number }) {
  const max = options?.max || RATE_LIMIT_MAX;
  const key = getClientId(req);
  const result = checkRateLimit(key, max);

  const response = NextResponse.next();
  applySecurityHeaders(response);
  response.headers.set('X-RateLimit-Limit', String(max));
  response.headers.set('X-RateLimit-Remaining', String(result.remaining));
  response.headers.set('X-RateLimit-Reset', String(Math.ceil(result.resetAt / 1000)));

  if (!result.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a moment before trying again.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((result.resetAt - Date.now()) / 1000)),
        },
      }
    );
  }

  return response;
}

export function getRateLimitInfo(req: NextRequest) {
  const key = getClientId(req);
  return checkRateLimit(key);
}
