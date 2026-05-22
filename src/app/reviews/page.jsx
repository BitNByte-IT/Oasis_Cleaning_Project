import { Star, MessageCircle, ArrowRight } from 'lucide-react';
import Ornament from '@/components/ui/Ornament';
import { getGoogleReviews } from '@/lib/google-reviews';
import site from '@/data/site.json';

export const revalidate = 604800;

export const metadata = {
  title: 'Reviews',
  description:
    'See what our customers say about Oasis Cleaning of Austin. Live reviews from Google.',
};

function GoogleBadge({ className = 'h-7 w-7' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 5.5 29.3 3.6 24 3.6 12.7 3.6 3.6 12.7 3.6 24S12.7 44.4 24 44.4 44.4 35.3 44.4 24c0-1.2-.1-2.4-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.5 16 18.9 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34 5.5 29.3 3.6 24 3.6c-7.8 0-14.4 4.4-17.7 11.1z"
      />
      <path
        fill="#4CAF50"
        d="M24 44.4c5.2 0 9.9-2 13.4-5.3l-6.2-5.2c-2.1 1.4-4.7 2.2-7.2 2.2-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.6 40 16.3 44.4 24 44.4z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.7l6.2 5.2C40.9 35.6 44.4 30.3 44.4 24c0-1.2-.1-2.4-.4-3.5z"
      />
    </svg>
  );
}

function Stars({ count }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4"
          style={
            i < count
              ? { fill: '#F5C518', color: '#F5C518' }
              : { color: '#3a3f45' }
          }
        />
      ))}
    </div>
  );
}

function getInitial(name) {
  return (name?.trim()?.[0] || '?').toUpperCase();
}

function ReviewCard({ review }) {
  return (
    <article className="card-bordered flex flex-col p-5">
      <header className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-teal/15 text-brand-teal font-medium">
            {getInitial(review.author_name)}
          </span>
          <div>
            <p className="font-medium text-white">{review.author_name}</p>
            <p className="text-xs text-brand-textMuted">{review.relative_time_description}</p>
          </div>
        </div>
        <GoogleBadge className="h-6 w-6 shrink-0" />
      </header>

      <div className="mt-3">
        <Stars count={Math.round(review.rating)} />
      </div>

      <p className="mt-3 text-sm leading-relaxed text-brand-text">{review.text}</p>
    </article>
  );
}

export default async function ReviewsPage() {
  const data = await getGoogleReviews();

  return (
    <>
      {/* Title */}
      <section className="container-page pt-10 text-center lg:pt-16">
        <p className="eyebrow">REVIEWS</p>
        <h1 className="mt-3 font-display text-5xl text-white sm:text-6xl">Customer Reviews</h1>
        <Ornament className="mt-3" width="md" />
        <p className="mx-auto mt-5 max-w-xl text-brand-text">
          We take pride in providing exceptional cleaning services and love seeing our clients
          happy with the results.
        </p>
      </section>

      {/* Summary card */}
      <section className="container-page mt-10">
        <div className="card-bordered flex flex-col items-center gap-6 p-6 sm:p-8 lg:flex-row lg:gap-10">
          <div className="flex items-center gap-5">
            <GoogleBadge className="h-16 w-16" />
            <div>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-4xl text-white">{data.rating.toFixed(1)}</span>
                <Stars count={Math.round(data.rating)} />
              </div>
              <p className="mt-1 text-sm text-brand-textMuted">
                Based on {data.totalReviews} Google reviews
              </p>
            </div>
          </div>

          <div className="hidden h-12 w-px bg-brand-border lg:block" />

          <a
            href={site.social.find((s) => s.platform === 'google')?.href || '#'}
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex items-center gap-2 text-brand-teal transition-colors hover:text-brand-tealLight lg:ml-auto"
          >
            <span className="font-medium">See all reviews on Google</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </section>

      {/* Reviews grid */}
      <section className="container-page mt-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.reviews.slice(0, 6).map((review, i) => (
            <ReviewCard key={`${review.author_name}-${i}`} review={review} />
          ))}
        </div>

        {data.reviews.length === 0 && (
          <p className="mt-8 text-center text-brand-textMuted">
            No reviews available right now. Check back soon!
          </p>
        )}
      </section>

      {/* Feedback CTA */}
      <section className="container-page mt-12">
        <div className="card-bordered flex flex-col items-center gap-6 p-6 text-center sm:p-8 md:flex-row md:text-left">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-brand-teal/60 text-brand-teal">
            <MessageCircle className="h-6 w-6" />
          </span>

          <div className="flex-1">
            <h2 className="font-display text-2xl text-white">We&apos;d love your feedback!</h2>
            <p className="mt-1 text-brand-text">
              If you enjoyed our service, please consider reviewing us on Google.
            </p>
          </div>

          <a
            href={site.social.find((s) => s.platform === 'google')?.href || '#'}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex shrink-0 items-center gap-3 rounded-xl border border-brand-teal/60 bg-brand-surface/40 px-5 py-3 text-brand-teal transition-all hover:bg-brand-teal/10"
          >
            <GoogleBadge className="h-5 w-5" />
            <span className="font-medium">Review Us</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </>
  );
}
