import { NextResponse } from 'next/server';
import { waitUntil } from '@vercel/functions';
import { createSign } from 'crypto';

export const runtime = 'nodejs';

function b64url(data) {
  return Buffer.from(data).toString('base64url');
}

function makeJWT(issuer, privateKey) {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = b64url(JSON.stringify({
    iss: issuer,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  }));
  const input = `${header}.${claim}`;
  const sig = b64url(createSign('RSA-SHA256').update(input).sign(privateKey));
  return `${input}.${sig}`;
}

async function getAccessToken(issuer, privateKey) {
  const jwt = makeJWT(issuer, privateKey);
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error(`Token exchange failed: ${JSON.stringify(data)}`);
  return data.access_token;
}

async function appendToSheet(email) {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const serviceEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  // Private key stored in env has literal \n — convert them back to real newlines
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!spreadsheetId || !serviceEmail || !privateKey) {
    console.warn('[newsletter] Google Sheets env vars not set — subscriber not saved.');
    return;
  }

  const token = await getAccessToken(serviceEmail, privateKey);

  const range = encodeURIComponent('Sheet1!A:B');
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`;

  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'America/Chicago',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ values: [[email, timestamp]] }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Sheets API ${res.status}: ${text}`);
  }
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request.' }, { status: 400 });
  }

  const email = body?.email?.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, message: 'Please enter a valid email address.' },
      { status: 400 }
    );
  }

  waitUntil(
    appendToSheet(email).catch((err) => console.error('[newsletter] Sheet append failed:', err))
  );

  return NextResponse.json({ ok: true });
}
