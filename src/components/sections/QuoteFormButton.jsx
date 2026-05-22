'use client';

import { useEffect, useState } from 'react';
import { X, Send, Lock, FileText, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import services from '@/data/services.json';

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  serviceType: '',
  propertyType: '',
  city: '',
  details: '',
};

export default function QuoteFormButton() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setTimeout(() => {
      if (status === 'success') {
        setForm(initialForm);
        setStatus('idle');
      }
    }, 300);
  };

  const update = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.message || 'Could not send your request.');
      }
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group inline-flex items-center gap-3 rounded-xl border border-brand-teal/60 bg-brand-surface/30 px-6 py-3.5 text-brand-teal transition-all hover:bg-brand-teal/10 hover:shadow-teal-glow"
      >
        <FileText className="h-5 w-5" />
        <span className="font-semibold tracking-[0.15em]">GET A FREE QUOTE</span>
      </button>

      {/* Modal */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="quote-title"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-fade-in"
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />

          {/* dialog */}
          <div className="relative z-10 w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border border-brand-border bg-brand-surface p-6 shadow-2xl sm:p-8">
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-md p-1 text-brand-textMuted transition-colors hover:bg-white/5 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              {/* w-fit wrapper so ornament spans exactly the heading text width */}
              <div className="w-fit">
                <h2 id="quote-title" className="font-display text-3xl">
                  Get a <span className="text-brand-teal">Free Quote</span>
                </h2>
                <div className="mt-2 flex w-full items-center gap-3">
                  <span className="block h-px flex-1 bg-brand-gold/70" />
                  <span className="block h-2 w-2 shrink-0 rotate-45 bg-brand-gold" />
                  <span className="block h-px flex-1 bg-brand-gold/70" />
                </div>
              </div>
              <p className="mt-3 text-sm text-brand-textMuted">
                Fill out the form below and we&apos;ll get back to you with a free, no-obligation quote.
              </p>
            </div>

            {status === 'success' ? (
              <div className="mt-8 flex flex-col items-center text-center">
                <CheckCircle2 className="h-12 w-12 text-brand-teal" />
                <h3 className="mt-3 font-display text-2xl text-white">Thank you!</h3>
                <p className="mt-2 text-sm text-brand-text">
                  We received your request and will be in touch shortly.
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="mt-6 rounded-lg border border-brand-border px-5 py-2 text-sm text-brand-text hover:border-brand-teal hover:text-brand-teal"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <Field label="Full Name" required>
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={update('fullName')}
                    placeholder="Enter your full name"
                    className={inputClass}
                  />
                </Field>

                <Field label="Email Address" required>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={update('email')}
                    placeholder="Enter your email"
                    className={inputClass}
                  />
                </Field>

                <Field label="Phone Number" required>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={update('phone')}
                    placeholder="(512) 123-4567"
                    className={inputClass}
                  />
                </Field>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Service Type" required>
                    <select
                      required
                      value={form.serviceType}
                      onChange={update('serviceType')}
                      className={inputClass}
                    >
                      <option value="">Select a service</option>
                      {services.quoteForm.serviceTypes.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Property Type" required>
                    <select
                      required
                      value={form.propertyType}
                      onChange={update('propertyType')}
                      className={inputClass}
                    >
                      <option value="">Select property type</option>
                      {services.quoteForm.propertyTypes.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Location (City)" required>
                  <input
                    type="text"
                    required
                    value={form.city}
                    onChange={update('city')}
                    placeholder="Enter your city"
                    className={inputClass}
                  />
                </Field>

                <Field label="Additional Details (Optional)">
                  <textarea
                    rows={3}
                    value={form.details}
                    onChange={update('details')}
                    placeholder="Tell us more about your space or specific cleaning needs"
                    className={`${inputClass} resize-y`}
                  />
                </Field>

                {status === 'error' && (
                  <div className="flex items-start gap-2 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-gradient py-3.5 font-semibold text-white shadow-teal-glow transition-all hover:shadow-teal-glow-strong disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      SUBMIT REQUEST
                    </>
                  )}
                </button>

                <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-brand-textMuted">
                  <Lock className="h-3 w-3" />
                  Your information is safe and secure.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

const inputClass =
  'w-full rounded-lg border border-brand-border bg-brand-bg/60 px-3 py-2.5 text-sm text-white placeholder:text-brand-textDim focus:border-brand-teal focus:outline-none focus:ring-1 focus:ring-brand-teal transition-colors';

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-white">
        {label}
        {required && <span className="ml-1 text-red-400">*</span>}
      </span>
      {children}
    </label>
  );
}
