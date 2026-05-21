import Image from 'next/image';
import { Sparkles, Quote } from 'lucide-react';
import CallButton from '@/components/ui/CallButton';
import Ornament from '@/components/ui/Ornament';
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
          <p className="eyebrow">{about.hero.eyebrow}</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
            <span className="block text-white">{about.hero.titleLine1}</span>
            <span className="block text-brand-teal">{about.hero.titleLine2}</span>
          </h1>

          <Ornament className="!justify-start mt-6" width="md" />

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
              <p className="eyebrow flex items-center gap-3">
                {about.manager.eyebrow}
                <span className="block h-px w-12 bg-brand-gold/60" />
              </p>
              <h2 className="mt-2 font-display text-4xl text-white sm:text-5xl">
                {about.manager.name}
              </h2>
              <span className="mt-3 block h-0.5 w-16 bg-brand-teal" />

              <div className="mt-6 space-y-5 text-brand-text leading-relaxed">
                <Quote className="h-6 w-6 text-brand-teal" />
                <p className="text-base">{about.manager.statement}</p>
              </div>

              <div className="mt-8 border-t border-brand-border/60 pt-6">
                <p className="font-display text-2xl italic text-white">{about.manager.name}</p>
                <p className="mt-1 text-brand-teal">{about.manager.name}</p>
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
