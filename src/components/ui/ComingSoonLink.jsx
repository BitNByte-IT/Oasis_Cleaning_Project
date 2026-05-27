'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function ComingSoonLink({ children, className, ...rest }) {
  const [open, setOpen] = useState(false);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    // Prevent background scroll while modal is open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const handleClick = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <>
      <a
        href="#"
        onClick={handleClick}
        className={className}
        {...rest}
      >
        {children}
      </a>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="coming-soon-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Modal */}
          <div className="card-bordered relative z-10 w-full max-w-md p-6 sm:p-8 text-center">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-3 top-3 rounded-full p-1.5 text-brand-textMuted transition-colors hover:bg-white/5 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <h3
              id="coming-soon-title"
              className="font-display text-2xl text-white sm:text-3xl"
            >
              Coming Soon...
            </h3>

            <p className="mt-3 text-brand-text">
              This feature is coming soon! Thank you for your patience.
            </p>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex items-center justify-center rounded-xl border border-brand-teal/60 bg-brand-surface/40 px-5 py-2.5 font-medium text-brand-teal transition-all hover:bg-brand-teal/10"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}