# Oasis Cleaning of Austin LLC — Website

Next.js 14 (App Router) + Tailwind CSS site for Oasis Cleaning of Austin LLC.

- 4 pages: Home, About Us, Reviews, Services
- All-static pages, generated at build time (fast loading)
- Single-codebase backend via Next.js API routes (no extra server)
- Live Google Reviews, refreshed automatically once per week
- "Get a Free Quote" modal that emails the submission to a fixed inbox
- Tap-to-call CTA reused across pages via one `<CallButton />` component
- Footer/navigation content driven by a single JSON file
- Deploy-ready for Vercel or Cloudflare Pages

---

## 1. Quick Start

```bash
# 1. Clone your empty GitHub repo, then copy this project's files into it
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env.local
# then open .env.local and fill in the values (see "Environment variables" below)

# 4. Run the dev server
npm run dev
# open http://localhost:3000
```

---

## 2. Project Structure

```
oasis-cleaning/
├── public/
│   └── images/                # logo, hero photos, manager portrait
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── layout.tsx         # root layout — wires Navbar + Footer + fonts
│   │   ├── page.tsx           # /            (Home)
│   │   ├── about/page.tsx     # /about
│   │   ├── reviews/page.tsx   # /reviews
│   │   ├── services/page.tsx  # /services
│   │   ├── globals.css
│   │   └── api/
│   │       ├── quote/route.ts    # POST – sends quote-request email
│   │       └── reviews/route.ts  # GET cached reviews | POST forces refresh
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx     # sticky top nav (mobile drawer)
│   │   │   └── Footer.tsx
│   │   ├── ui/
│   │   │   ├── Logo.tsx
│   │   │   ├── CallButton.tsx     # ← reused on every page
│   │   │   ├── Ornament.tsx
│   │   │   ├── SocialIcons.tsx
│   │   │   └── ServiceIcons.tsx
│   │   └── sections/
│   │       └── QuoteFormButton.tsx # modal + submit-to-API
│   ├── data/                  # site-wide JSON content
│   │   ├── site.json          # company info, nav, footer, social
│   │   ├── home.json
│   │   ├── about.json
│   │   └── services.json
│   └── lib/
│       └── google-reviews.ts  # Places API fetcher (weekly cache)
├── .env.example
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── vercel.json                # weekly cron job
```

### Editing site-wide content

The footer, nav links, phone number, emails, hours, slogan, and copyright are
all in `src/data/site.json` — change it once, every page updates.
Page-specific copy lives in `src/data/home.json`, `about.json`, `services.json`.

---

## 3. Environment variables

Create `.env.local` (locally) and set the same values in Vercel's
**Project → Settings → Environment Variables** for production.

| Variable                  | Purpose                                                                 |
|---------------------------|-------------------------------------------------------------------------|
| `NEXT_PUBLIC_SITE_URL`    | Full URL of the deployed site, e.g. `https://oasiscleaningofaustin.com` |
| `GOOGLE_PLACES_API_KEY`   | Google Cloud Places API key                                             |
| `GOOGLE_PLACE_ID`         | The Place ID of the Oasis Cleaning Google Business listing              |
| `SMTP_HOST`               | SMTP host (e.g. `smtp.gmail.com`)                                        |
| `SMTP_PORT`               | `465` for SSL, `587` for STARTTLS                                       |
| `SMTP_SECURE`             | `true` for port 465, `false` for 587                                    |
| `SMTP_USER`               | SMTP login email                                                        |
| `SMTP_PASSWORD`           | SMTP password / app-password                                            |
| `QUOTE_RECIPIENT_EMAIL`   | Inbox that receives quote-form submissions                              |
| `REVALIDATE_SECRET`       | Long random string used by the weekly cron                              |

### Getting Google Places API credentials

1. Go to https://console.cloud.google.com/ and create a project.
2. **APIs & Services → Library** → enable **"Places API"**.
3. **APIs & Services → Credentials** → create an **API key**. Restrict it to the Places API.
4. Find your Place ID using https://developers.google.com/maps/documentation/places/web-service/place-id

### Sending email via Gmail (simplest option)

1. Enable 2-step verification on the Google account.
2. Visit https://myaccount.google.com/apppasswords and generate an "App password".
3. Use that 16-char password as `SMTP_PASSWORD`. `SMTP_USER` is the Gmail address.

> Want a different provider (SendGrid, Resend, Mailgun)? The `/api/quote` route
> uses standard SMTP via `nodemailer`, so just swap the SMTP credentials.

---

## 4. How the three required features work

### a) Call Now button (reusable across pages)

`src/components/ui/CallButton.tsx` renders an `<a href="tel:+1...">` link in
three variants. The phone number lives in `src/data/site.json` — change once,
updates everywhere. On mobile, tapping it places the call directly.

### b) Reviews from Google (weekly refresh, positive only)

- `src/lib/google-reviews.ts` calls the **Places "Details"** endpoint and asks
  for the latest reviews.
- It **filters to reviews with 4+ stars** ("positive only") and sorts newest-first.
- The `fetch()` call is configured with `next: { revalidate: 604800, tags: ['google-reviews'] }`,
  so Next.js caches the response for **7 days** and only hits Google once per week.
- `/api/reviews?secret=YOUR_SECRET` (POST) can be hit by a cron to force a refresh.
  `vercel.json` already contains a cron entry — replace `REPLACE_WITH_YOUR_REVALIDATE_SECRET`
  with the value of your `REVALIDATE_SECRET` env var.
- Until the Google credentials are configured, the page renders a built-in set of
  placeholder reviews so the design still looks correct.

### c) Get a Free Quote (popup → email)

- `src/components/sections/QuoteFormButton.tsx` is a Client Component that opens a modal,
  validates input client-side, and POSTs JSON to `/api/quote`.
- `src/app/api/quote/route.ts` validates again on the server and emails the submission
  to `QUOTE_RECIPIENT_EMAIL` using `nodemailer`.
- All running inside the same Next.js app — no external backend.

---

## 5. Deploy to Vercel

1. Push the project to your GitHub repo:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```
2. Go to https://vercel.com/new and import the GitHub repo.
3. **Framework Preset** is auto-detected as "Next.js" — keep defaults.
4. Add all the environment variables from section 3 under **Environment Variables**.
5. Click **Deploy**.
6. Edit `vercel.json` and replace `REPLACE_WITH_YOUR_REVALIDATE_SECRET` with your
   actual `REVALIDATE_SECRET` value, commit, and push — the weekly cron will start.
7. Point your domain (e.g. `oasiscleaningofaustin.com`) at the Vercel deployment
   from **Project → Settings → Domains**.

### Deploy to Cloudflare Pages (alternative)

Cloudflare Pages supports Next.js via the official adapter:

```bash
npm install --save-dev @cloudflare/next-on-pages
npx @cloudflare/next-on-pages
```

Then in Cloudflare Pages:
- **Framework preset**: Next.js
- **Build command**: `npx @cloudflare/next-on-pages`
- **Build output directory**: `.vercel/output/static`
- **Node version**: 18 or 20
- Add the same env variables in **Settings → Environment Variables**.

> Note: Cloudflare Pages uses the Edge runtime by default. The `/api/quote` route
> is pinned to `runtime = 'nodejs'` because `nodemailer` needs Node APIs. Cloudflare
> will run it on their Node.js compatibility layer. If you hit problems, swap
> `nodemailer` for an HTTP-based provider like **Resend** or **SendGrid Web API**
> and remove the `runtime` export.

---

## 6. Common edits

- **Change the phone number, emails, hours, slogan**: `src/data/site.json`
- **Change service list**: `src/data/services.json` → `services` array
- **Change manager statement / name / photo**: `src/data/about.json` + replace `public/images/manager.jpeg`
- **Change a hero image**: replace the file in `public/images/` with the same name
- **Add a navigation link**: add to `navigation` in `src/data/site.json` and create a folder in `src/app/<new-route>/page.tsx`

---

## 7. Scripts

```bash
npm run dev      # start dev server on http://localhost:3000
npm run build    # production build
npm run start    # start the production server (after build)
npm run lint     # lint
```
