'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import site from '@/data/site.json';

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-border/40 bg-brand-bg/80 backdrop-blur-md">
      <div className="container-page flex items-center justify-between py-4 lg:py-5">
        <Logo size={140} className="shrink-0" />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {site.navigation.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-2 text-base font-medium transition-colors ${
                  active ? 'text-brand-teal' : 'text-brand-text hover:text-brand-teal'
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full bg-brand-teal" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile menu trigger */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="rounded-md border border-brand-border p-2 text-brand-text lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <nav
          aria-label="Mobile"
          className="absolute inset-x-0 top-full border-b border-brand-border bg-brand-bg lg:hidden animate-fade-in"
        >
          <ul className="container-page flex flex-col py-4">
            {site.navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block py-3 text-lg font-medium border-b border-brand-border/40 last:border-0 ${
                      active ? 'text-brand-teal' : 'text-brand-text'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
