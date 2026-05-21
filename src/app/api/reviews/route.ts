import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { getGoogleReviews } from '@/lib/google-reviews';

/**
 * GET /api/reviews
 *   Returns cached Google reviews JSON. Useful for client-side widgets
 *   or for sanity-checking what the page is showing.
 *
 * POST /api/reviews?secret=...
 *   Forces a refresh of the Google reviews cache. Pair this with a
 *   Vercel cron (vercel.json) or any external scheduler to call it
 *   exactly once per week.
 */

export const runtime = 'nodejs';

export async function GET() {
  const data = await getGoogleReviews();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 });
  }
  revalidateTag('google-reviews');
  return NextResponse.json({ ok: true, revalidated: true, at: new Date().toISOString() });
}
