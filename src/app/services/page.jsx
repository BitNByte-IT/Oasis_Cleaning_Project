import Image from 'next/image';
import { Phone } from 'lucide-react';
import QuoteFormButton from '@/components/sections/QuoteFormButton';
import CallButton from '@/components/ui/CallButton';
import services from '@/data/services.json';
import site from '@/data/site.json';
import { serviceIcons, whyChooseIcons } from '@/components/ui/ServiceIcons';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Services',
  description:
    'Standard, deep, move-in/out, Airbnb, post-construction, commercial, recurring, and apartment cleaning across Austin.',
};

export default function ServicesPage() {
  return (
    <>
      {/* ============== HERO ============== */}
      <section className="container-page grid grid-cols-1 items-center gap-10 pt-10 lg:grid-cols-2 lg:gap-12 lg:pt-16">
        <div>
          <h1 className="font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
            <span className="block text-white">{services.hero.eyebrow}</span>
            <span className="block text-brand-teal">{services.hero.title}</span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-brand-text">
            {services.hero.description}
          </p>

          <div className="mt-8">
            <QuoteFormButton />
          </div>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl lg:aspect-[5/4]">
          <Image
            src="/images/services-kitchen.png"
            alt="Dark luxury kitchen with marble island"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* ============== OUR SERVICES GRID ============== */}
      <section className="container-page mt-16 lg:mt-24">
        <h2 className="text-center text-sm font-semibold tracking-[0.25em] text-brand-teal">
          OUR SERVICES
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {services.services.map((service) => {
            const Icon = serviceIcons[service.icon];
            return (
              <div
                key={service.name}
                className="card-bordered flex aspect-square flex-col items-center justify-center gap-3 p-4 hover:shadow-teal-glow"
              >
                {Icon && <Icon className="h-12 w-12 text-brand-teal" />}
                <h3 className="text-center font-display text-base leading-tight text-white sm:text-lg">
                  {service.name}
                </h3>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============== WHY CHOOSE US ============== */}
      <section className="container-page mt-16">
        <h2 className="text-center text-sm font-semibold tracking-[0.25em] text-brand-teal">
          {services.whyChooseUs.title}
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-y-8 md:grid-cols-5 md:divide-x md:divide-brand-border">
          {services.whyChooseUs.items.map((item) => {
            const Icon = whyChooseIcons[item.icon];
            return (
              <div
                key={item.label}
                className="flex flex-col items-center px-4 text-center"
              >
                {Icon && <Icon className="h-8 w-8 text-brand-teal" />}
                <p className="mt-3 max-w-[10rem] text-sm leading-relaxed text-brand-text">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============== CALL BANNER ============== */}
      <section className="container-page mt-16">
        <div className="rounded-2xl border border-brand-border bg-brand-surface/40 p-6 sm:p-8">
          <div className="flex flex-col items-center gap-6 md:flex-row md:gap-8">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-brand-teal/60 text-brand-teal">
              <Phone className="h-6 w-6" />
            </span>

            <div className="flex-1 text-center md:text-left">
              <h3 className="font-display text-2xl text-brand-teal">Need More Details?</h3>
              <p className="mt-1 text-sm text-brand-text">
                To learn more about pricing, availability, or custom cleaning plans, please
                call us directly.
              </p>
            </div>

            <CallButton variant="primary" label={`CALL NOW`} className="shrink-0" />
          </div>
        </div>
      </section>
    </>
  );
}
