import Image from 'next/image';
import { Sparkles, ShieldCheck, User, Home, Mail, Clock, ShieldCheck as ShieldCheckBadge } from 'lucide-react';
import CallButton from '@/components/ui/CallButton';
import Ornament from '@/components/ui/Ornament';
import home from '@/data/home.json';
import site from '@/data/site.json';

const featureIcons = {
  sparkles: Sparkles,
  'shield-check': ShieldCheck,
  user: User,
  home: Home,
};

export const dynamic = 'force-static';

export default function HomePage() {
  return (
    <>
      {/* ============== HERO ============== */}
      <section className="relative">
        <div className="container-page grid grid-cols-1 items-center gap-10 pt-10 lg:grid-cols-2 lg:gap-12 lg:pt-16">
          {/* Left – copy */}
          <div className="order-2 lg:order-1">
            <h1 className="font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
              <span className="block text-white">{home.hero.titleLine1}</span>
              <span className="block text-brand-teal">{home.hero.titleLine2}</span>
            </h1>

            <Ornament className="!justify-start mt-6" width="md" />

            <p className="mt-6 max-w-md text-lg leading-relaxed text-brand-text">
              {home.hero.description}
            </p>

            <div className="mt-8">
              <CallButton variant="primary" />
            </div>
          </div>

          {/* Right – hero image */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl lg:aspect-[5/4]">
              <Image
                src="/images/home-kitchen.png"
                alt="Bright modern kitchen with marble island"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to right, #000 0%, rgba(0,0,0,0.4) 15%, rgba(0,0,0,0) 35%)',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============== FEATURES ============== */}
      <section className="container-page mt-16 lg:mt-24">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
          {home.features.map((f, i) => {
            const Icon = featureIcons[f.icon] || Sparkles;
            return (
              <div
                key={f.title}
                className="flex flex-col items-center text-center"
                style={{ animation: `fadeUp 0.6s ease-out ${i * 0.08}s both` }}
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-brand-teal/60 text-brand-teal transition-all hover:bg-brand-teal/10 hover:shadow-teal-glow">
                  <Icon className="h-7 w-7" strokeWidth={1.5} />
                </span>
                <h3 className="mt-5 font-display text-xl text-white">{f.title}</h3>
                <p className="mt-2 max-w-[14rem] text-sm leading-relaxed text-brand-textMuted">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>

        <div aria-hidden className="mt-2 hidden lg:flex justify-around">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-px w-0" />
          ))}
        </div>
      </section>

      {/* ============== EMAIL + HOURS BANNER ============== */}
      <section className="container-page mt-16">
        <div className="rounded-2xl border border-brand-border bg-brand-surface/40 p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:divide-x md:divide-brand-border">
            {/* Email block */}
            <div className="flex items-start gap-5 md:pr-8">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brand-teal/60 text-brand-teal">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-sm font-semibold tracking-[0.2em] text-brand-teal">
                  EMAIL US
                </h3>
                <ul className="mt-2 space-y-1">
                  {site.company.emails.map((email) => (
                    <li key={email}>
                      <a
                        href={`mailto:${email}`}
                        className="text-brand-text transition-colors hover:text-brand-teal"
                      >
                        {email}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Hours block */}
            <div className="flex items-start gap-5 md:pl-8">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brand-teal/60 text-brand-teal">
                <Clock className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-sm font-semibold tracking-[0.2em] text-brand-teal">
                  HOURS
                </h3>
                <ul className="mt-2 space-y-1 text-brand-text">
                  <li>{site.company.hours.weekdays}</li>
                  <li>
                    {site.company.hours.saturday}
                    <span className="mx-2 text-brand-textDim">|</span>
                    {site.company.hours.sunday}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== LICENSED & INSURED BANNER ============== */}
      <section className="container-page mt-8">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-brand-border bg-brand-surface/30 p-6 sm:flex-row sm:gap-6">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-brand-teal/60 text-brand-teal">
            <ShieldCheckBadge className="h-6 w-6" />
          </span>
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-semibold tracking-[0.2em] text-brand-teal">
              {home.licensedBanner.title}
            </h3>
            <p className="mt-1 text-brand-text">{home.licensedBanner.description}</p>
          </div>
        </div>
      </section>
    </>
  );
}
