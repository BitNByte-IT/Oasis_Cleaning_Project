import { Phone } from 'lucide-react';
import site from '@/data/site.json';

export default function CallButton({ variant = 'primary', className = '', label }) {
  const phone = site.company.phone;
  const phoneRaw = site.company.phoneRaw;

  if (variant === 'compact') {
    return (
      <a
        href={`tel:${phoneRaw}`}
        className={`inline-flex items-center gap-2 text-brand-teal hover:text-brand-tealLight transition-colors ${className}`}
        aria-label={`Call ${phone}`}
      >
        <Phone className="h-4 w-4" />
        <span className="font-medium">{phone}</span>
      </a>
    );
  }

  if (variant === 'outline') {
    return (
      <a
        href={`tel:${phoneRaw}`}
        className={`group inline-flex items-center gap-4 rounded-xl border border-brand-border bg-brand-surface/40 px-5 py-4 transition-all hover:border-brand-teal hover:bg-brand-surface/70 ${className}`}
        aria-label={`Call ${phone}`}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-teal/60 text-brand-teal transition-colors group-hover:bg-brand-teal/10">
          <Phone className="h-5 w-5" />
        </span>
        <span className="flex flex-col items-start">
          <span className="text-xs font-medium uppercase tracking-widest text-brand-teal">
            {label || 'CALL NOW'}
          </span>
          <span className="text-lg font-medium text-brand-text">{phone}</span>
        </span>
      </a>
    );
  }

  return (
    <a
      href={`tel:${phoneRaw}`}
      className={`group inline-flex items-center gap-4 rounded-xl bg-teal-gradient px-6 py-4 shadow-teal-glow transition-all hover:shadow-teal-glow-strong hover:scale-[1.02] active:scale-[0.99] ${className}`}
      aria-label={`Call ${phone}`}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/80 text-white">
        <Phone className="h-5 w-5" />
      </span>
      <span className="flex flex-col items-start text-white">
        <span className="text-xs font-semibold uppercase tracking-[0.18em]">
          {label || 'CALL NOW'}
        </span>
        <span className="text-lg font-semibold leading-tight">{phone}</span>
      </span>
    </a>
  );
}
