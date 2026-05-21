import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs'; // nodemailer requires the Node.js runtime

interface QuotePayload {
  fullName: string;
  email: string;
  phone: string;
  serviceType: string;
  propertyType: string;
  city: string;
  details?: string;
}

function escapeHtml(s: string) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function validate(b: Partial<QuotePayload>): { ok: true; data: QuotePayload } | { ok: false; message: string } {
  const required = ['fullName', 'email', 'phone', 'serviceType', 'propertyType', 'city'] as const;
  for (const k of required) {
    if (!b[k] || typeof b[k] !== 'string' || !String(b[k]).trim()) {
      return { ok: false, message: `Missing field: ${k}` };
    }
  }
  // Loose email check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email!)) {
    return { ok: false, message: 'Please enter a valid email address.' };
  }
  return {
    ok: true,
    data: {
      fullName: b.fullName!.trim(),
      email: b.email!.trim(),
      phone: b.phone!.trim(),
      serviceType: b.serviceType!.trim(),
      propertyType: b.propertyType!.trim(),
      city: b.city!.trim(),
      details: b.details?.trim() || '',
    },
  };
}

export async function POST(req: NextRequest) {
  let body: Partial<QuotePayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid JSON body.' }, { status: 400 });
  }

  const result = validate(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, message: result.message }, { status: 400 });
  }

  const d = result.data;
  const recipient = process.env.QUOTE_RECIPIENT_EMAIL;
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASSWORD;
  const smtpSecure = (process.env.SMTP_SECURE || 'true') === 'true';

  if (!recipient || !smtpHost || !smtpUser || !smtpPass) {
    console.error('[quote] SMTP env vars are missing — cannot send email.');
    return NextResponse.json(
      { ok: false, message: 'Email is not configured on the server. Please try again later.' },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: { user: smtpUser, pass: smtpPass },
  });

  const html = `
    <div style="font-family: Arial, sans-serif; color: #1a1a1a; max-width: 600px;">
      <div style="background: linear-gradient(135deg, #3FB8C9, #1F8A9C); padding: 20px; color: #fff;">
        <h2 style="margin:0;">New Quote Request</h2>
        <p style="margin:6px 0 0; opacity: .85;">Oasis Cleaning of Austin LLC</p>
      </div>
      <table style="width:100%; border-collapse:collapse; margin-top: 20px;">
        ${[
          ['Full Name', d.fullName],
          ['Email', `<a href="mailto:${escapeHtml(d.email)}">${escapeHtml(d.email)}</a>`],
          ['Phone', `<a href="tel:${escapeHtml(d.phone)}">${escapeHtml(d.phone)}</a>`],
          ['Service Type', d.serviceType],
          ['Property Type', d.propertyType],
          ['City', d.city],
          ['Additional Details', d.details ? d.details.replace(/\n/g, '<br>') : '<em>None provided</em>'],
        ]
          .map(
            ([label, value]) => `
              <tr>
                <td style="padding:10px 12px; border-bottom:1px solid #eee; font-weight:600; width:160px; vertical-align:top;">${label}</td>
                <td style="padding:10px 12px; border-bottom:1px solid #eee;">${value}</td>
              </tr>
            `
          )
          .join('')}
      </table>
      <p style="margin-top: 20px; color:#666; font-size: 12px;">
        Sent via the contact form at oasiscleaningofaustin.com
      </p>
    </div>
  `;

  const text = [
    'New Quote Request — Oasis Cleaning of Austin LLC',
    '',
    `Full Name: ${d.fullName}`,
    `Email: ${d.email}`,
    `Phone: ${d.phone}`,
    `Service Type: ${d.serviceType}`,
    `Property Type: ${d.propertyType}`,
    `City: ${d.city}`,
    `Additional Details: ${d.details || '(none)'}`,
  ].join('\n');

  try {
    await transporter.sendMail({
      from: `"Oasis Cleaning Website" <${smtpUser}>`,
      to: recipient,
      replyTo: d.email,
      subject: `New Quote Request – ${d.fullName} (${d.serviceType})`,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[quote] sendMail failed:', err);
    return NextResponse.json(
      { ok: false, message: 'Could not send your request right now. Please try again.' },
      { status: 500 }
    );
  }
}
