import Reveal from "@/components/Reveal";

function Star({ className = "h-4 w-4" }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M10 1.6l2.47 5 5.53.8-4 3.9.94 5.5L10 14.9l-4.94 2.6.94-5.5-4-3.9 5.53-.8z" />
    </svg>
  );
}

function Stars({ className = "h-4 w-4" }) {
  return (
    <span
      className="inline-flex items-center gap-0.5 text-gold"
      aria-label="5 out of 5 stars"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className={className} />
      ))}
    </span>
  );
}

function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C0DAE7] px-2.5 py-0.5 font-sans text-[10px] uppercase tracking-wide2 text-[#0C1731]">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="h-3 w-3"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
      Verified Purchase
    </span>
  );
}

export default function ReviewsSection({ reviews = [] }) {
  return (
    <section className="border-t border-stone/70 bg-cream">
      <div className="mx-auto max-w-5xl px-6 py-20 md:px-10 md:py-28">
        {/* Heading + overall rating */}
        <Reveal className="text-center">
          <h2 className="font-serif text-4xl font-light text-ink md:text-5xl">
            What Our Customers Say
          </h2>
          <div className="mt-7 flex flex-col items-center gap-2.5">
            <div className="flex items-center gap-3">
              <span className="font-serif text-3xl text-ink">5.0</span>
              <Stars className="h-5 w-5" />
            </div>
            <p className="font-sans text-[13px] uppercase tracking-wide2 text-charcoal/50">
              Based on {reviews.length} reviews
            </p>
          </div>
        </Reveal>

        {/* Review grid */}
        <div className="mt-14 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-2 md:gap-6">
          {reviews.map((review, i) => (
            <Reveal
              key={review.title}
              delay={(i % 2) * 0.08}
              amount={0.2}
              className="flex flex-col rounded-sm border border-stone/70 p-6 md:p-7"
            >
              <Stars />
              <h3 className="mt-4 font-sans text-[15px] font-medium leading-snug text-charcoal">
                {review.title}
              </h3>
              <p className="mt-2.5 font-sans text-[14px] leading-relaxed text-charcoal/65">
                {review.body}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="font-sans text-[13px] font-medium text-charcoal">
                  {review.name}
                </span>
                <VerifiedBadge />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
