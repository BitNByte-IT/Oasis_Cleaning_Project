import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import SocialIcons from '@/components/ui/SocialIcons';
import site from '@/data/site.json';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-brand-border/40 bg-brand-bg">
      <div className="container-page py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {/* Logo + slogan */}
          <div>
            <Logo size={150} />
            <p className="mt-3 text-sm leading-relaxed text-brand-text">
              Spotless spaces.
              <br />
              Better living.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:justify-self-center">
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

          {/* Social */}
          <div className="md:justify-self-end">
            <SocialIcons />
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
