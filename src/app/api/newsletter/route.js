import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request.' }, { status: 400 });
  }

  const email = body?.email?.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, message: 'Please enter a valid email address.' }, { status: 400 });
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASSWORD;
  const smtpSecure = (process.env.SMTP_SECURE || 'true') === 'true';
  const recipient = process.env.QUOTE_RECIPIENT_EMAIL;

  if (!smtpHost || !smtpUser || !smtpPass || !recipient) {
    // Silently succeed if SMTP not configured (don't block the user)
    return NextResponse.json({ ok: true });
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: { user: smtpUser, pass: smtpPass },
  });

  try {
    await transporter.sendMail({
      from: `"Oasis Cleaning Website" <${smtpUser}>`,
      to: recipient,
      subject: 'New Newsletter Subscriber',
      text: `New newsletter subscription:\n\nEmail: ${email}`,
      html: `<p><strong>New newsletter subscriber:</strong></p><p>${email}</p>`,
    });
  } catch (err) {
    console.error('[newsletter] sendMail failed:', err);
  }

  return NextResponse.json({ ok: true });
}
