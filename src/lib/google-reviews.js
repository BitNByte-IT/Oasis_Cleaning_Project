const REVALIDATE_SECONDS = 60 * 60 * 24 * 7; // 7 days
const POSITIVE_MIN_STARS = 4;

const FALLBACK_REVIEWS = [
  {
    author_name: 'Paula Hess',
    rating: 5,
    text:
      'I highly recommend giving Erica with Oasis a call to schedule a cleaning. She is friendly, professional and outstanding in helping you receive the best possible experience. My experience with the providers has been amazing. They are friendly, thorough, and prompt.',
    relative_time_description: '3 months ago',
    time: Date.now() / 1000 - 90 * 86400,
  },
  {
    author_name: 'Michelle Morse',
    rating: 5,
    text:
      'Erica was very good with communicating from the initial text to the finish. I went through every corner, baseboard and cabinet to make sure the cleaning was done thoroughly… and it was! I highly recommend Oasis. I will definitely use them again in the future.',
    relative_time_description: '5 months ago',
    time: Date.now() / 1000 - 150 * 86400,
  },
  {
    author_name: 'Bob',
    rating: 5,
    text:
      "I've used the services of Oasis twice now and I was impressed both times by the level of thoroughness and attention to detail shown by their friendly and professional cleaners. I will be using them again, and I highly recommend!",
    relative_time_description: '6 months ago',
    time: Date.now() / 1000 - 180 * 86400,
  },
  {
    author_name: 'B Bird',
    rating: 5,
    text:
      "I reached out to Oasis Cleaners for a deep cleaning job. I was given a quote that was fair and reasonable. The two person crew did a pretty outstanding job. The owner is a female veteran, and I expected no less than what she offered to me: hassle free housecleaning at a fair price. You may find a cheaper alternative, but I dare you to find an efficient and effective group of professionals.",
    relative_time_description: '6 months ago',
    time: Date.now() / 1000 - 182 * 86400,
  },
  {
    author_name: 'Allen Blair',
    rating: 5,
    text:
      'I hired Oasis on short notice to get my home ready for my 50th birthday party. They were responsive, met my tight timeline, and did meticulous, top-to-bottom work. The house looks fantastic. Based on this experience, I\'m a loyal customer from here on out.',
    relative_time_description: '7 months ago',
    time: Date.now() / 1000 - 210 * 86400,
  },
  {
    author_name: 'Parker Guerin',
    rating: 5,
    text:
      'Oasis has been great to work with. I have given them quick deadlines on cleanings needed, and they handle it within minutes. Communication is clear and easy, and the cleanings have been great. We have no complaints!',
    relative_time_description: '8 months ago',
    time: Date.now() / 1000 - 240 * 86400,
  },
  {
    author_name: 'Edward Munk',
    rating: 5,
    text:
      "Five stars isn't enough! Sarah and Alicia from Oasis Cleaning are truly exceptional. Their attention to detail was outstanding — every corner of our home was spotless, and they went above and beyond to make sure everything was perfect.",
    relative_time_description: '11 months ago',
    time: Date.now() / 1000 - 330 * 86400,
  },
  {
    author_name: 'Emily Dumas',
    rating: 5,
    text:
      'Oasis cleaning was absolutely AMAZING. My father unexpectedly went into the hospital and Erica worked with me to find the perfect deep clean for his apartment. Hazel came out in a timely manner and spent 4 HOURS on a smaller sized apartment — I couldn\'t believe the difference when I walked in. Hazel listened to the specific areas my father was looking to have deep cleaned and she went above and beyond. Definitely worth the money.',
    relative_time_description: 'a year ago',
    time: Date.now() / 1000 - 365 * 86400,
  },
];

export async function getGoogleReviews() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return {
      rating: 4.9,
      totalReviews: 203,
      reviews: FALLBACK_REVIEWS,
      source: 'fallback',
    };
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total,reviews&reviews_no_translations=true&reviews_sort=newest&key=${apiKey}`;

    const res = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS, tags: ['google-reviews'] },
    });

    if (!res.ok) {
      throw new Error(`Places API responded with ${res.status}`);
    }

    const data = await res.json();

    if (data.status !== 'OK') {
      throw new Error(`Places API status: ${data.status}`);
    }

    const result = data.result || {};
    const rawReviews = result.reviews || [];

    const positive = rawReviews
      .filter((r) => r.rating >= POSITIVE_MIN_STARS)
      .sort((a, b) => (b.time || 0) - (a.time || 0));

    return {
      rating: typeof result.rating === 'number' ? result.rating : 5.0,
      totalReviews: result.user_ratings_total || positive.length,
      reviews: positive,
      source: 'google',
    };
  } catch (err) {
    console.error('[reviews] Google Places fetch failed:', err);
    return {
      rating: 4.9,
      totalReviews: 203,
      reviews: FALLBACK_REVIEWS,
      source: 'fallback',
    };
  }
}
