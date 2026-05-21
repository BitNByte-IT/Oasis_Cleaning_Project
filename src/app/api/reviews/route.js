import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { getGoogleReviews } from '@/lib/google-reviews';

export const runtime = 'nodejs';

export async function GET() {
  const data = await getGoogleReviews();
  return NextResponse.json(data);
}

export async function POST(req) {
  const secret = req.nextUrl.searchParams.get('secret');
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 });
  }
  revalidateTag('google-reviews');
  return NextResponse.json({ ok: true, revalidated: true, at: new Date().toISOString() });
}
