import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import SocialIcons from '@/components/ui/SocialIcons';
import site from '@/data/site.json';
import home from '@/data/home.json';

function GoldDivider() {
  return (
    <div className="hidden md:flex flex-col items-center self-stretch py-2 px-2">
      <span className="block w-px flex-1 bg-brand-gold/70" />
      <span className="my-2 block h-2 w-2 shrink-0 rotate-45 bg-brand-gold" />
      <span className="block w-px flex-1 bg-brand-gold/70" />
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-brand-border/40 bg-brand-bg">
      <div className="container-page py-12">

        {/* 3-column grid with gold ornament dividers */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:gap-0 md:items-start">

          {/* Col 1: Logo + slogan */}
          <div className="flex flex-col items-center text-center md:pr-8">
            <Logo size={150} />
            <p className="mt-3 text-sm leading-relaxed text-brand-text">
              Spotless spaces.
              <br />
              Better living.
            </p>
          </div>

          <GoldDivider />

          {/* Col 2: Quick Links */}
          <div className="flex flex-col items-center text-center md:px-8">
            <h3 className="mb-4 text-sm font-semibold tracking-[0.2em] text-brand-textMuted">
              {site.footerLinks.title}
            </h3>
            <ul className="space-y-2">
              {site.footerLinks.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-brand-text transition-colors hover:text-brand-teal"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <GoldDivider />

          {/* Col 3: Licensed & Insured + Follow Us On */}
          <div className="flex flex-col items-center text-center md:pl-8">
            {/* Licensed & Insured */}
            <div className="flex flex-col items-center gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brand-teal/60 text-brand-teal">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-sm font-semibold tracking-[0.2em] text-brand-teal">
                  {home.licensedBanner.title}
                </h3>
                <p className="mt-1 text-sm text-brand-text">
                  {home.licensedBanner.description}
                </p>
              </div>
            </div>

            {/* Follow Us On — directly below Licensed & Insured */}
            <div className="mt-6 flex flex-col items-center">
              <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-brand-textMuted">
                FOLLOW US ON
              </p>
              <SocialIcons />
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-10 border-t border-brand-border/40 pt-6 text-center">
          <p className="text-sm text-brand-textMuted">{site.company.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
