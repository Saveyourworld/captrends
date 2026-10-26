// CustomerReviews.tsx — first review group, immediately after HeroSection.
// Place the four supplied review images in public/review-images/.

const reviews = [
  {
    name: "Shegun Michael",
    location: "Lagos",
    initial: "S",
    avatarColor: "#078bd5",
    quote: "My tiles always looked clean but not bright, now they actually shine. Even the corners that used to stress me are easy now. This is none of my best online purchases this year.",
    image: "/electric-scrubber/review-images/shegun-review.jpg",
    imageAlt: "Shegun Michael's electric spin scrubber package and accessories",
  },
  {
    name: "Chioma Uchenna",
    location: "Abuja",
    initial: "C",
    avatarColor: "#8423ff",
    quote: "I used to finish cleaning and feel angry for no reason. Now I realize it was just stress and tiredness. Since I started using this, cleaning doesn't frustrate me anymore.",
    image: "/electric-scrubber/review-images/chioma-review.jpg",
    imageAlt: "Chioma Uchenna's electric cleaning brush kit",
  },
  {
    name: "Patricia Okon",
    location: "Uyo",
    initial: "P",
    avatarColor: "#009f72",
    quote: "As a pregnant woman, this long lasting electric scrubber have saved me. You don't need to wait until you are pregnant, get this for your household to save the stress.",
    image: "/electric-scrubber/review-images/patricia-review.jpg",
    imageAlt: "Patricia Okon's electric spin scrubber with attachments",
  },
  {
    name: "Musa Saheed",
    location: "Kaduna",
    initial: "M",
    avatarColor: "#f6004b",
    quote: "Omo these people are for real. I got my package with the free gift, free delivery, delivered directly to my door post within the speculated time.",
    image: "/electric-scrubber/review-images/musa-review.jpg",
    imageAlt: "Musa Saheed's delivered electric spin scrubber package",
  },
] as const;

export default function CustomerReviews() {
  return (
    <section id="customer-reviews-first" aria-labelledby="customer-reviews-heading" className="bg-[#f4f6f9] px-4 py-12 text-[#111b36] sm:px-6 sm:py-16 lg:py-20">
      <style>{`
        @keyframes reviewGentleFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-9px); }
        }
        .review-float-card {
          animation: reviewGentleFloat 5.5s ease-in-out infinite;
          will-change: transform;
        }
        .review-float-card:hover,
        .review-float-card:focus-within {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .review-float-card { animation: none !important; }
        }
      `}</style>
      <div className="mx-auto max-w-[1180px]">
        <header className="mx-auto mb-10 max-w-[1100px] text-center sm:mb-14">
          <h2 id="customer-reviews-heading" className="text-[clamp(2.3rem,7vw,5.6rem)] font-black uppercase leading-[1.14] tracking-[-0.035em] text-[#0bb4f5]">
            SEE OUR HAPPY<br />CUSTOMERS<br className="sm:hidden" /> REVIEWS
          </h2>
          <p className="mx-auto mt-7 max-w-[1000px] text-[clamp(1.2rem,3.5vw,2.6rem)] leading-[1.45] text-[#494949]">
            99% of reviewers would recommend this product to a friend!
          </p>
        </header>

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          {reviews.map((review, index) => (
            <article
              key={review.name}
              style={{ animationDelay: `${index * -1.3}s` }}
              className="review-float-card flex h-full flex-col overflow-hidden rounded-[30px] border-2 border-[#e1e8f0] bg-white shadow-[0_2px_5px_rgba(20,40,65,0.10)] transition-shadow duration-300 hover:shadow-[0_14px_30px_rgba(20,40,65,0.17)] sm:rounded-[38px]"
            >
              <div className="flex flex-1 flex-col px-6 pb-8 pt-7 sm:px-9 sm:pb-10 sm:pt-9">
                <div className="flex items-center gap-4 sm:gap-5">
                  <span aria-hidden="true" className="flex h-[66px] w-[66px] shrink-0 items-center justify-center rounded-full text-[33px] font-black text-white sm:h-[82px] sm:w-[82px] sm:text-[40px]" style={{ backgroundColor: review.avatarColor }}>
                    {review.initial}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[23px] font-black leading-tight tracking-[-0.03em] sm:text-[29px]">{review.name}</h3>
                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      <p className="text-[19px] text-[#6c7c96] sm:text-[22px]">{review.location}</p>
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-600 sm:text-sm border border-emerald-200">
                        ✓ Verified Buyer
                      </span>
                    </div>
                    <div className="mt-1 text-[18px] text-[#e9ae27]" aria-label="Five stars">★★★★★</div>
                  </div>
                </div>
                <blockquote className="mt-7 text-[clamp(1.12rem,2.3vw,1.65rem)] leading-[1.8] text-[#35445e] sm:mt-9">
                  “{review.quote}”
                </blockquote>
              </div>
              <div className="border-t border-[#edf1f6] bg-[#f7f9fc] p-5 sm:p-7">
                <div className="flex min-h-[250px] items-center justify-center overflow-hidden rounded-[24px] bg-white sm:min-h-[300px]">
                  <img src={review.image} alt={review.imageAlt} loading="lazy" decoding="async" className="block max-h-[420px] w-full object-contain" />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-[600px] sm:mt-14">
          <a href="#order-form" className="flex min-h-[66px] items-center justify-center rounded-[9px] bg-[#00d416] px-5 py-4 text-center text-[18px] font-black text-white transition hover:bg-[#00b914] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-green-700 sm:text-[23px]">
            Click Here To Order Now
          </a>
          <p className="mt-5 text-center text-[17px] font-extrabold leading-snug text-[#111b36] sm:text-[21px]">
            ORDER BEFORE 11:59 PM &amp; <span className="text-[#d62828]">Get Free Gift + Free Shipping</span>
          </p>
        </div>
      </div>
    </section>
  );
}