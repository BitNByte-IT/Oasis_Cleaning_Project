import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import CallButton from '@/components/ui/CallButton';
import about from '@/data/about.json';

export const dynamic = 'force-static';

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

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl lg:aspect-[5/4]">
          <Image
            src="/images/about-living-room.png"
            alt="Modern dark living room with sectional sofa"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
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
              <CallButton variant="outline" className="w-full" />
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
