// import { NextResponse } from 'next/server';
// import { waitUntil } from '@vercel/functions';
// import nodemailer from 'nodemailer';

// export const runtime = 'nodejs';

// function escapeHtml(s) {
//   return String(s)
//     .replace(/&/g, '&amp;')
//     .replace(/</g, '&lt;')
//     .replace(/>/g, '&gt;')
//     .replace(/"/g, '&quot;')
//     .replace(/'/g, '&#39;');
// }

// function validate(b) {
//   const required = ['fullName', 'email', 'phone', 'serviceType', 'propertyType', 'city'];
//   for (const k of required) {
//     if (!b[k] || typeof b[k] !== 'string' || !String(b[k]).trim()) {
//       return { ok: false, message: `Missing field: ${k}` };
//     }
//   }
//   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email)) {
//     return { ok: false, message: 'Please enter a valid email address.' };
//   }
//   return {
//     ok: true,
//     data: {
//       fullName: b.fullName.trim(),
//       email: b.email.trim(),
//       phone: b.phone.trim(),
//       serviceType: b.serviceType.trim(),
//       propertyType: b.propertyType.trim(),
//       city: b.city.trim(),
//       details: b.details?.trim() || '',
//     },
//   };
// }

// export async function POST(req) {
//   let body;
//   try {
//     body = await req.json();
//   } catch {
//     return NextResponse.json({ ok: false, message: 'Invalid JSON body.' }, { status: 400 });
//   }

//   const result = validate(body);
//   if (!result.ok) {
//     return NextResponse.json({ ok: false, message: result.message }, { status: 400 });
//   }

//   const d = result.data;
//   const recipient = process.env.QUOTE_RECIPIENT_EMAIL;
//   const smtpHost = process.env.SMTP_HOST;
//   const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);
//   const smtpUser = process.env.SMTP_USER;
//   const smtpPass = process.env.SMTP_PASSWORD;
//   const smtpSecure = (process.env.SMTP_SECURE || 'true') === 'true';

//   if (!recipient || !smtpHost || !smtpUser || !smtpPass) {
//     console.error('[quote] SMTP env vars are missing — cannot send email.');
//     return NextResponse.json(
//       { ok: false, message: 'Email is not configured on the server. Please try again later.' },
//       { status: 500 }
//     );
//   }

//   const transporter = nodemailer.createTransport({
//     host: smtpHost,
//     port: smtpPort,
//     secure: smtpSecure,
//     auth: { user: smtpUser, pass: smtpPass },
//   });

//   const html = `
//     <div style="font-family: Arial, sans-serif; color: #1a1a1a; max-width: 600px;">
//       <div style="background: linear-gradient(135deg, #3FB8C9, #1F8A9C); padding: 20px; color: #fff;">
//         <h2 style="margin:0;">New Quote Request</h2>
//         <p style="margin:6px 0 0; opacity: .85;">Oasis Cleaning of Austin LLC</p>
//       </div>
//       <table style="width:100%; border-collapse:collapse; margin-top: 20px;">
//         ${[
//           ['Full Name', d.fullName],
//           ['Email', `<a href="mailto:${escapeHtml(d.email)}">${escapeHtml(d.email)}</a>`],
//           ['Phone', `<a href="tel:${escapeHtml(d.phone)}">${escapeHtml(d.phone)}</a>`],
//           ['Service Type', d.serviceType],
//           ['Property Type', d.propertyType],
//           ['City', d.city],
//           ['Additional Details', d.details ? d.details.replace(/\n/g, '<br>') : '<em>None provided</em>'],
//         ]
//           .map(
//             ([label, value]) => `
//               <tr>
//                 <td style="padding:10px 12px; border-bottom:1px solid #eee; font-weight:600; width:160px; vertical-align:top;">${label}</td>
//                 <td style="padding:10px 12px; border-bottom:1px solid #eee;">${value}</td>
//               </tr>
//             `
//           )
//           .join('')}
//       </table>
//       <p style="margin-top: 20px; color:#666; font-size: 12px;">
//         Sent via the contact form at oasiscleaningofaustin.com
//       </p>
//     </div>
//   `;

//   const text = [
//     'New Quote Request — Oasis Cleaning of Austin LLC',
//     '',
//     `Full Name: ${d.fullName}`,
//     `Email: ${d.email}`,
//     `Phone: ${d.phone}`,
//     `Service Type: ${d.serviceType}`,
//     `Property Type: ${d.propertyType}`,
//     `City: ${d.city}`,
//     `Additional Details: ${d.details || '(none)'}`,
//   ].join('\n');

//   waitUntil(
//     transporter
//       .sendMail({
//         from: `"Oasis Cleaning Website" <${smtpUser}>`,
//         to: recipient,
//         replyTo: d.email,
//         subject: `New Quote Request – ${d.fullName} (${d.serviceType})`,
//         text,
//         html,
//       })
//       .catch((err) => console.error('[quote] sendMail failed:', err))
//   );

//   return NextResponse.json({ ok: true });
// }

import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const RESEND_API_URL = 'https://api.resend.com/emails';

/**
 * Escape user input before putting it inside HTML.
 */
function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Remove characters that shouldn't appear in an email subject.
 */
function sanitizeSubject(value = '') {
  return String(value)
    .replace(/[\r\n]+/g, ' ')
    .trim();
}

/**
 * Validate request payload.
 */
function validate(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return {
      ok: false,
      message: 'Invalid request body.',
    };
  }

  const required = [
    'fullName',
    'email',
    'phone',
    'serviceType',
    'propertyType',
    'city',
  ];

  for (const key of required) {
    if (
      typeof body[key] !== 'string' ||
      !body[key].trim()
    ) {
      return {
        ok: false,
        message: `Missing field: ${key}`,
      };
    }
  }

  const fullName = body.fullName.trim();
  const email = body.email.trim().toLowerCase();
  const phone = body.phone.trim();
  const serviceType = body.serviceType.trim();
  const propertyType = body.propertyType.trim();
  const city = body.city.trim();

  const details =
    typeof body.details === 'string'
      ? body.details.trim()
      : '';

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return {
      ok: false,
      message: 'Please enter a valid email address.',
    };
  }

  // Basic length protection
  if (fullName.length > 100) {
    return {
      ok: false,
      message: 'Full name is too long.',
    };
  }

  if (email.length > 254) {
    return {
      ok: false,
      message: 'Email address is too long.',
    };
  }

  if (phone.length > 40) {
    return {
      ok: false,
      message: 'Phone number is too long.',
    };
  }

  if (serviceType.length > 100) {
    return {
      ok: false,
      message: 'Service type is too long.',
    };
  }

  if (propertyType.length > 100) {
    return {
      ok: false,
      message: 'Property type is too long.',
    };
  }

  if (city.length > 100) {
    return {
      ok: false,
      message: 'City is too long.',
    };
  }

  if (details.length > 5000) {
    return {
      ok: false,
      message: 'Additional details are too long.',
    };
  }

  return {
    ok: true,
    data: {
      fullName,
      email,
      phone,
      serviceType,
      propertyType,
      city,
      details,
    },
  };
}

export async function POST(req) {
  try {
    // =========================================================
    // 1. Parse request body
    // =========================================================

    let body;

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        {
          ok: false,
          message: 'Invalid JSON body.',
        },
        {
          status: 400,
        }
      );
    }

    // =========================================================
    // 2. Validate form
    // =========================================================

    const result = validate(body);

    if (!result.ok) {
      return NextResponse.json(
        {
          ok: false,
          message: result.message,
        },
        {
          status: 400,
        }
      );
    }

    const d = result.data;

    // =========================================================
    // 3. Environment variables
    // =========================================================

    const apiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.QUOTE_RECIPIENT_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL;

    if (!apiKey) {
      console.error('[quote] Missing RESEND_API_KEY');

      return NextResponse.json(
        {
          ok: false,
          message: 'Email service is not configured.',
        },
        {
          status: 500,
        }
      );
    }

    if (!recipient) {
      console.error('[quote] Missing QUOTE_RECIPIENT_EMAIL');

      return NextResponse.json(
        {
          ok: false,
          message: 'Email recipient is not configured.',
        },
        {
          status: 500,
        }
      );
    }

    if (!fromEmail) {
      console.error('[quote] Missing RESEND_FROM_EMAIL');

      return NextResponse.json(
        {
          ok: false,
          message: 'Sender email is not configured.',
        },
        {
          status: 500,
        }
      );
    }

    // =========================================================
    // 4. Escape HTML values
    // =========================================================

    const safeFullName = escapeHtml(d.fullName);
    const safeEmail = escapeHtml(d.email);
    const safePhone = escapeHtml(d.phone);
    const safeServiceType = escapeHtml(d.serviceType);
    const safePropertyType = escapeHtml(d.propertyType);
    const safeCity = escapeHtml(d.city);

    const safeDetails = d.details
      ? escapeHtml(d.details).replace(/\r?\n/g, '<br />')
      : '<em>None provided</em>';

    // =========================================================
    // 5. HTML email
    // =========================================================

    const html = `
      <!DOCTYPE html>

      <html>
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </head>

        <body
          style="
            margin: 0;
            padding: 0;
            background-color: #f5f7f8;
          "
        >

          <div
            style="
              max-width: 620px;
              margin: 40px auto;
              background: #ffffff;
              font-family: Arial, Helvetica, sans-serif;
              color: #1a1a1a;
            "
          >

            <!-- Header -->

            <div
              style="
                background: #1F8A9C;
                padding: 28px 24px;
              "
            >

              <h1
                style="
                  margin: 0;
                  color: #ffffff;
                  font-size: 24px;
                  font-weight: 700;
                "
              >
                New Quote Request
              </h1>

              <p
                style="
                  margin: 8px 0 0;
                  color: #e7f7f9;
                  font-size: 14px;
                "
              >
                Oasis Cleaning of Austin LLC
              </p>

            </div>


            <!-- Content -->

            <div
              style="
                padding: 24px;
              "
            >

              <p
                style="
                  margin: 0 0 20px;
                  color: #555555;
                  font-size: 14px;
                  line-height: 1.6;
                "
              >
                A customer submitted a new quote request through the
                Oasis Cleaning website.
              </p>


              <table
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  width: 100%;
                  border-collapse: collapse;
                "
              >

                ${createRow('Full Name', safeFullName)}

                ${createRow(
                  'Email',
                  `
                    <a
                      href="mailto:${safeEmail}"
                      style="
                        color: #1F8A9C;
                        text-decoration: none;
                      "
                    >
                      ${safeEmail}
                    </a>
                  `
                )}

                ${createRow(
                  'Phone',
                  `
                    <a
                      href="tel:${safePhone}"
                      style="
                        color: #1F8A9C;
                        text-decoration: none;
                      "
                    >
                      ${safePhone}
                    </a>
                  `
                )}

                ${createRow(
                  'Service Type',
                  safeServiceType
                )}

                ${createRow(
                  'Property Type',
                  safePropertyType
                )}

                ${createRow(
                  'City',
                  safeCity
                )}

                ${createRow(
                  'Additional Details',
                  safeDetails
                )}

              </table>


              <!-- Reply Button -->

              <div
                style="
                  margin-top: 28px;
                "
              >

                <a
                  href="mailto:${safeEmail}"
                  style="
                    display: inline-block;
                    background: #1F8A9C;
                    color: #ffffff;
                    padding: 12px 22px;
                    text-decoration: none;
                    border-radius: 5px;
                    font-size: 14px;
                    font-weight: 600;
                  "
                >
                  Reply to Customer
                </a>

              </div>


              <!-- Footer -->

              <p
                style="
                  margin: 30px 0 0;
                  color: #888888;
                  font-size: 12px;
                  line-height: 1.5;
                "
              >
                This quote request was sent via
                oasiscleaningofaustin.com.
              </p>

            </div>

          </div>

        </body>
      </html>
    `;

    // =========================================================
    // 6. Plain text fallback
    // =========================================================

    const text = [
      'New Quote Request',
      'Oasis Cleaning of Austin LLC',
      '',
      `Full Name: ${d.fullName}`,
      `Email: ${d.email}`,
      `Phone: ${d.phone}`,
      `Service Type: ${d.serviceType}`,
      `Property Type: ${d.propertyType}`,
      `City: ${d.city}`,
      '',
      'Additional Details:',
      d.details || '(none)',
      '',
      'Sent via oasiscleaningofaustin.com',
    ].join('\n');

    // =========================================================
    // 7. Send through Resend HTTP API
    // =========================================================

    const resendResponse = await fetch(RESEND_API_URL, {
      method: 'POST',

      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',

        // IMPORTANT:
        // Required for direct Resend HTTP API requests.
        'User-Agent': 'oasis-cleaning-website/1.0',
      },

      body: JSON.stringify({
        from: fromEmail,

        to: [
          recipient,
        ],

        // Raw HTTP API uses reply_to
        reply_to: d.email,

        subject: sanitizeSubject(
          `New Quote Request - ${d.fullName} (${d.serviceType})`
        ),

        html,

        text,
      }),

      // Prevent request hanging forever
      signal: AbortSignal.timeout(15000),
    });

    // =========================================================
    // 8. Read Resend response
    // =========================================================

    const responseText = await resendResponse.text();

    let resendData = null;

    if (responseText) {
      try {
        resendData = JSON.parse(responseText);
      } catch {
        resendData = {
          raw: responseText,
        };
      }
    }

    // =========================================================
    // 9. Handle Resend failure
    // =========================================================

    if (!resendResponse.ok) {
      console.error('[quote] Resend API failed', {
        status: resendResponse.status,
        statusText: resendResponse.statusText,
        response: resendData,
      });

      // Rate limit / free quota
      if (resendResponse.status === 429) {
        return NextResponse.json(
          {
            ok: false,
            message:
              'Email service is temporarily busy. Please try again later.',
          },
          {
            status: 503,
          }
        );
      }

      return NextResponse.json(
        {
          ok: false,
          message:
            'Unable to send your quote request. Please try again.',
        },
        {
          status: 500,
        }
      );
    }

    // =========================================================
    // 10. Success
    // =========================================================

    console.log('[quote] Email sent successfully', {
      id: resendData?.id,
    });

    return NextResponse.json(
      {
        ok: true,
        message: 'Your quote request has been sent successfully.',
      },
      {
        status: 200,
      }
    );

  } catch (error) {
    // =========================================================
    // Timeout
    // =========================================================

    if (
      error?.name === 'TimeoutError' ||
      error?.name === 'AbortError'
    ) {
      console.error('[quote] Resend request timed out');

      return NextResponse.json(
        {
          ok: false,
          message:
            'Email service timed out. Please try again.',
        },
        {
          status: 504,
        }
      );
    }

    // =========================================================
    // Unexpected error
    // =========================================================

    console.error('[quote] Unexpected error:', error);

    return NextResponse.json(
      {
        ok: false,
        message:
          'Something went wrong. Please try again.',
      },
      {
        status: 500,
      }
    );
  }
}


/**
 * Email table row
 */
function createRow(label, value) {
  return `
    <tr>

      <td
        style="
          width: 160px;
          padding: 12px;
          border-bottom: 1px solid #eeeeee;
          font-size: 14px;
          font-weight: 600;
          color: #333333;
          vertical-align: top;
        "
      >
        ${label}
      </td>

      <td
        style="
          padding: 12px;
          border-bottom: 1px solid #eeeeee;
          font-size: 14px;
          color: #555555;
          line-height: 1.5;
          vertical-align: top;
        "
      >
        ${value}
      </td>

    </tr>
  `;
}