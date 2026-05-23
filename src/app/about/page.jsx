import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import CallButton from '@/components/ui/CallButton';
import about from '@/data/about.json';

export const dynamic = 'force-static';

function TexasIcon({ className }) {
  return (
    <svg
      viewBox="0 0 512 512"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Texas outline */}
      <path
        d="
          M105 120
          L270 120
          L270 170
          L360 170
          L420 230
          L420 300
          L390 330
          L360 320
          L340 360
          L300 400
          L270 450
          L220 430
          L210 390
          L170 390
          L140 360
          L140 310
          L100 280
          L110 230
          L90 180
          Z
        "
        stroke="currentColor"
        strokeWidth="12"
        strokeLinejoin="round"
        strokeLinecap="round"
        filter="url(#glow)"
      />

      {/* Austin glowing dot */}
      <circle
        cx="255"
        cy="265"
        r="10"
        fill="currentColor"
        filter="url(#glow)"
      />

      {/* Sparkle */}
      <path
        d="
          M255 225
          L262 255
          L292 262
          L262 269
          L255 299
          L248 269
          L218 262
          L248 255
          Z
        "
        fill="currentColor"
        opacity="0.9"
        filter="url(#glow)"
      />
    </svg>
  );
}

export const metadata = {
  title: 'About Us',
  description:
    'Meet the team behind Oasis Cleaning of Austin LLC — a professional cleaning company committed to quality, reliability, and customer care.',
};

export default function AboutPage() {
  return (
    <>
      {/* ============== HERO ============== */}
      <section className="container-page grid grid-cols-1 items-center gap-10 pt-10 lg:grid-cols-2 lg:gap-12 lg:pt-16">
        <div>
          {/* Eyebrow: "ABOUT US ✦ ——" — short accent line only */}
          <div className="flex items-center gap-3">
            <p className="eyebrow shrink-0">{about.hero.eyebrow}</p>
            <span className="block h-2 w-2 shrink-0 rotate-45 bg-brand-gold" />
            <span className="block h-px w-10 bg-brand-gold/70" />
          </div>

          {/* Heading + ornament wrapped together so ornament matches text width */}
          <div className="mt-4 w-fit">
            <h1 className="font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
              <span className="block text-white">{about.hero.titleLine1}</span>
              <span className="block text-brand-teal">{about.hero.titleLine2}</span>
            </h1>

            {/* Gold ornament — spans exactly the heading text width */}
            <div className="mt-6 flex w-full items-center gap-3">
              <span className="block h-px flex-1 bg-brand-gold/70" />
              <span className="block h-2 w-2 shrink-0 rotate-45 bg-brand-gold" />
              <span className="block h-px flex-1 bg-brand-gold/70" />
            </div>
          </div>

          <p className="mt-6 max-w-md text-base leading-relaxed text-brand-text">
            {about.hero.description}
          </p>

          <div className="mt-8 flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-teal/60 text-brand-teal">
              <Sparkles className="h-5 w-5" />
            </span>
            <p className="font-display text-lg text-white">{about.hero.tagline}</p>
          </div>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-[5/4]">
          <Image
            src="/images/about-living-room.png"
            alt="Modern dark living room with sectional sofa"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          {/* Left-side blend into dark background */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, #000 0%, rgba(0,0,0,0.5) 20%, rgba(0,0,0,0) 45%)',
            }}
          />
          {/* Top and bottom edge fade */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, #000 0%, rgba(0,0,0,0) 15%, rgba(0,0,0,0) 85%, #000 100%)',
            }}
          />
        </div>
      </section>

      {/* ============== MEET THE MANAGER ============== */}
      <section className="container-page mt-16">
        <div className="rounded-2xl border border-brand-border bg-brand-surface/40 p-6 sm:p-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-14">

            {/* Manager image + call button */}
            <div className="flex flex-col gap-6">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-brand-bg">
                <Image
                  src="/images/manager.jpeg"
                  alt={about.manager.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <CallButton variant="outline" className="w-full" label="CALL ERICA DIRECTLY" />

              {/* "Can't wait to talk to y'all!" badge */}
              <div className="inline-flex w-full items-center gap-4 rounded-xl border border-brand-border bg-gradient-to-br from-brand-surface/70 to-black px-5 py-4 shadow-[0_0_25px_rgba(0,212,255,0.08)]">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-brand-teal/60 bg-black/40 text-brand-teal shadow-[0_0_18px_rgba(0,212,255,0.25)]">
                  <TexasIcon className="h-7 w-7 text-brand-teal drop-shadow-[0_0_8px_rgba(0,212,255,0.8)]" />
                </span>
                <span className="font-script text-xl text-brand-gold">
                  Can&apos;t wait to talk to y&apos;all!
                </span>
              </div>
            </div>

            {/* Manager statement */}
            <div>
              {/* Eyebrow: "MEET THE MANAGER ———" */}
              <div className="flex items-center gap-3">
                <p className="eyebrow shrink-0">{about.manager.eyebrow}</p>
                <span className="block h-px flex-1 bg-brand-gold/60" />
              </div>

              <h2 className="mt-2 font-display text-4xl text-white sm:text-5xl">
                {about.manager.name}
              </h2>
              <span className="mt-3 block h-0.5 w-16 bg-brand-teal" />

              {/* Statement with large typographic curly quotes */}
              <div className="mt-6">
                {/* Opening quote */}
                <span
                  className="block font-display leading-none text-brand-teal select-none"
                  style={{ fontSize: '5rem', lineHeight: 1 }}
                  aria-hidden
                >
                  &ldquo;
                </span>

                <p className="mt-2 text-base leading-relaxed text-brand-text">
                  {about.manager.statement}
                </p>

                {/* Closing quote — right-aligned */}
                <div className="flex justify-end">
                  <span
                    className="block font-display leading-none text-brand-teal select-none"
                    style={{ fontSize: '5rem', lineHeight: 1 }}
                    aria-hidden
                  >
                    &rdquo;
                  </span>
                </div>
              </div>

              {/* Signature block */}
              <div className="mt-4 border-t border-brand-border/60 pt-6">
                {/* Handwritten cursive signature via Dancing Script */}
                <p className="font-script text-4xl text-white">
                  {about.manager.name}
                </p>
                <p className="mt-1 font-medium text-brand-teal">{about.manager.name}</p>
                <p className="text-brand-textMuted">{about.manager.title}</p>
                <p className="text-brand-textMuted">{about.manager.tenure}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
