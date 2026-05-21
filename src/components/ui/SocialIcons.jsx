import { Facebook, Instagram } from 'lucide-react';
import site from '@/data/site.json';

function GoogleIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.77 4.1-1.12 1.12-2.87 2.35-5.93 2.35-4.72 0-8.42-3.8-8.42-8.52s3.7-8.52 8.42-8.52c2.55 0 4.41 1 5.79 2.3l2.32-2.32C18.88 1.85 16.4.6 12.48.6 5.86.6.13 6.18.13 12.13s5.73 11.53 12.35 11.53c3.58 0 6.27-1.18 8.37-3.36 2.16-2.16 2.83-5.2 2.83-7.65 0-.76-.06-1.46-.18-2.05z"
      />
    </svg>
  );
}

const iconMap = {
  facebook: Facebook,
  instagram: Instagram,
  google: GoogleIcon,
};

export default function SocialIcons({ className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {site.social.map((s) => {
        const Icon = iconMap[s.platform];
        if (!Icon) return null;
        return (
          <a
            key={s.platform}
            href={s.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={s.platform}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-border text-brand-text transition-all hover:border-brand-teal hover:text-brand-teal"
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  );
}
