import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ExternalLink } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useLanguage } from '../LanguageProvider';

const PLACE_ID = 'ChIJmV_f1yr_sUARNEf83Ig3aYM';
const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=CrossFit+Unbroken+Spirit&query_place_id=${PLACE_ID}`;
const GOOGLE_REVIEW_URL = `https://search.google.com/local/writereview?placeid=${PLACE_ID}`;

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-zinc-600'}`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review, index }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > 160;
  const displayText = !expanded && isLong ? review.text.slice(0, 160) + '…' : review.text;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 flex flex-col gap-3 hover:border-yellow-400/30 transition-colors duration-300"
    >
      <div className="flex items-center gap-3">
        <img
          src={review.profile_photo_url}
          alt={review.author_name}
          className="w-10 h-10 rounded-full object-cover border border-zinc-700"
        />
        <div>
          <p className="text-white font-semibold text-sm leading-tight">{review.author_name}</p>
          <p className="text-zinc-500 text-xs">{review.relative_time_description}</p>
        </div>
      </div>
      <StarRating rating={review.rating} />
      <p className="text-gray-300 text-sm leading-relaxed">
        {displayText}
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-1 text-sky-400 hover:text-sky-300 font-semibold text-xs"
          >
            {expanded ? ' Mai puțin' : ' Mai mult'}
          </button>
        )}
      </p>
    </motion.div>
  );
}

export default function GoogleReviewsSection() {
  const { language } = useLanguage();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.functions.invoke('getGoogleReviews', {})
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <div className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : data ? (
            <div className="inline-block">
              {/* Glowing card */}
              <div className="relative bg-zinc-900 border border-yellow-400/30 rounded-3xl px-10 py-8 shadow-2xl shadow-yellow-500/10 mb-6">
                {/* Subtle glow behind */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-yellow-400/5 to-transparent pointer-events-none" />

                <div className="flex items-center justify-center gap-2 mb-5">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-6 opacity-90" />
                  <span className="text-zinc-300 text-base font-semibold">
                    {language === 'ro' ? 'Recenzii' : 'Reviews'}
                  </span>
                </div>

                <div className="flex items-center justify-center gap-5 mb-4">
                  <span className="text-8xl font-black text-white leading-none">{data.rating}</span>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map((i) => (
                        <Star key={i} className="w-7 h-7 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-zinc-400 text-sm text-left">
                      {data.user_ratings_total} {language === 'ro' ? 'recenzii' : 'reviews'}
                    </p>
                  </div>
                </div>

                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sky-400 hover:text-sky-300 text-sm font-semibold transition-colors"
                >
                  {language === 'ro' ? 'Vezi pe Google Maps' : 'View on Google Maps'}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : null}
        </motion.div>

        {!loading && data?.reviews?.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.reviews.map((review, i) => (
              <ReviewCard key={i} review={review} index={i} />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-yellow-400/40 text-yellow-400 bg-yellow-400/10 hover:bg-yellow-400/20 font-bold text-sm transition-colors duration-150"
          >
            <Star className="w-4 h-4 fill-yellow-400" />
            {language === 'ro' ? 'Lasă o recenzie pe Google' : 'Leave a Google Review'}
          </a>
        </motion.div>
      </div>
    </section>
  );
}