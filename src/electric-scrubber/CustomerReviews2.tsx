import type { ReactNode } from "react";

type Review = { name: string; location: string; quote: string; image?: string };
const productPhotos = [
  "/electric-scrubber/reviews2-images/product-review-1.webp",
  "/electric-scrubber/reviews2-images/product-review-2.jpeg",
  "/electric-scrubber/reviews2-images/product-review-3.jpeg",
  "/electric-scrubber/reviews2-images/product-review-4.webp",
];
const reviews: Review[] = [
  { name: "Shegun Michael", location: "Lagos", quote: "My tiles always looked clean but not bright, now they actually shine. Even the corners that used to stress me are easy now. This is none of my best online purchases this year." },
  { name: "Chioma Uchenna", location: "Abuja", quote: "I used to finish cleaning and feel angry for no reason. Now I realize it was just stress and tiredness. Since I started using this, cleaning doesn't frustrate me anymore." },
  { name: "Patricia Okon", location: "Uyo", quote: "As a pregnant woman, this long lasting electric scrubber have saved me. You don't need to wait until you are pregnant, get this for your household to save the stress." },
  { name: "Musa Saheed", location: "Kaduna", quote: "Omo these people are for real. I got my package with the free gift, free delivery, delivered directly to my door post within the speculated time." },
];
function OrderButton() {
  return (
    <div className="mx-auto my-10 max-w-3xl">
      <a href="#order-form" className="block rounded-xl bg-[#04cb12] px-5 py-6 text-center text-xl font-black tracking-[.12em] text-white shadow-sm transition hover:bg-[#00a90d] sm:text-3xl">
        Click Here To Order Now
      </a>
      <p className="mt-3 text-center text-base font-extrabold leading-snug text-red-600 sm:text-xl" role="note">
        🔥 HURRY! ONLY 17 UNITS LEFT!
      </p>
      <p className="mt-1 text-center text-sm font-bold leading-snug text-slate-900 sm:text-lg">
        🎁 ORDER BEFORE 11:59 PM &amp; GET FREE GIFTS + FREE DELIVERY!
      </p>
    </div>
  );
}
function Paragraph({children}: {children: ReactNode}) {
  return <p className="mb-7 text-[clamp(1.15rem,2.7vw,1.85rem)] leading-[1.65] font-medium text-black">{children}</p>;
}
export default function CustomerReviews2() {
  return <section id="customer-reviews-second" className="bg-white px-4 py-12 text-black sm:px-7 sm:py-20">
    <style>{`@keyframes reviews2Float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}.reviews2-card{animation:reviews2Float 5.5s ease-in-out infinite}.reviews2-card:hover{animation-play-state:paused}@media(prefers-reduced-motion:reduce){.reviews2-card{animation:none}}`}</style>
    <div className="mx-auto max-w-5xl">
      <div className="mb-16 rounded-3xl bg-[#f4f6f9] px-4 py-12 sm:px-8">
        <h2 className="mb-10 text-center text-[clamp(2.4rem,6vw,5rem)] font-black uppercase leading-tight text-[#0bb4f5]">WHAT OUR CUSTOMERS ARE SAYING</h2>
        <div className="grid gap-7 md:grid-cols-2">{reviews.map((r,i)=><article key={`${r.name}-${i}`} className="reviews2-card overflow-hidden rounded-[30px] border border-[#e1e8f0] bg-white shadow-sm" style={{animationDelay:`${-i*1.3}s`}}>
          <div className="p-7">
            <div className="flex items-center gap-4"><span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#078bd5] text-3xl font-black text-white">{r.name.charAt(0).toUpperCase()}</span><div><h3 className="text-2xl font-black">{r.name}</h3><p className="text-lg text-slate-500">{r.location}</p></div></div>
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2" aria-label="5 out of 5 stars">
              <span className="text-2xl tracking-[.06em] text-[#f5b301]" aria-hidden="true">★★★★★</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eaf8ee] px-3 py-1 text-sm font-bold text-[#13803b]" title="Verified customer review"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true"><path d="m9 12 2 2 4-4"/><path d="M12 2 14.5 4l3.2.3 1.3 2.9 2.5 2-.5 3.2.5 3.2-2.5 2-1.3 2.9-3.2.3L12 22l-2.5-2-3.2-.3L5 16.8l-2.5-2 .5-3.2-.5-3.2 2.5-2L6.3 3.5l3.2-.3L12 2Z"/></svg>Verified</span>
            </div>
            <blockquote className="mt-5 text-xl leading-relaxed text-slate-700">“{r.quote}”</blockquote>
          </div>
          <div className="bg-slate-50 p-5"><img src={r.image || productPhotos[i % productPhotos.length]} alt={`Electric Spin Scrubber product photo displayed with ${r.name}'s review`} loading="lazy" className="mx-auto max-h-[420px] w-full rounded-2xl object-contain"/></div>
        </article>)}</div>
      </div>
      <div className="space-y-1">
        <Paragraph>Because it was built around torque and posture.</Paragraph><Paragraph>Power plus upright design.</Paragraph><Paragraph>Which means powered scrubbing with less bending.</Paragraph><Paragraph>Maybe you’re thinking....</Paragraph><Paragraph>“It seems too good to be true.”</Paragraph><Paragraph>Let’s address that right now.</Paragraph>
      </div>
      <OrderButton/>
      <div className="mx-auto mb-10 max-w-4xl"><img src="/electric-scrubber/reviews2-images/no-more-bending.jpg" alt="Comparison of upright electric scrubbing and kneeling to scrub manually" loading="lazy" className="w-full"/></div>
      <div className="mx-auto mb-10 max-w-4xl"><img src="/electric-scrubber/reviews2-images/clean-smarter.jpg" alt="Clean smarter, not harder: comparison of electric and manual cleaning" loading="lazy" className="w-full"/></div>
      <div className="mx-auto mb-12 max-w-4xl"><img src="/electric-scrubber/reviews2-images/nine-brush-heads.jpg" alt="Nine replaceable brush head attachments and their uses" loading="lazy" className="w-full"/></div>
      <h2 className="mb-9 text-center text-[clamp(2.5rem,6vw,5rem)] font-black leading-[1.1]">It’s Designed For High-Impact Cleaning</h2>
      <Paragraph>We are not promising magic. We are promising mechanical advantage.</Paragraph><Paragraph>And mechanical advantage is predictable.</Paragraph><Paragraph>When rotation replaces repeated hand scrubbing, the brush supplies consistent movement while you guide it.</Paragraph><Paragraph>Grime can loosen with less manual effort. That’s the advantage of powered cleaning.</Paragraph><Paragraph>Maybe you’re thinking....</Paragraph><Paragraph>“I don’t need this. I can manage.”</Paragraph><Paragraph>Of course you can manage. You’ve been managing for years.</Paragraph><Paragraph>But managing may have been costing you.</Paragraph><Paragraph>More time. More soreness. More frustration.</Paragraph><Paragraph>The question isn’t “Can I survive without this?”</Paragraph><Paragraph>The question is “Why am I choosing harder when easier exists?”</Paragraph><Paragraph>And here’s the part most people ignore.</Paragraph><Paragraph>Every time you bend deeply over tile, your back and knees take on the work.</Paragraph><Paragraph>Repeated awkward postures can add unnecessary strain.</Paragraph><Paragraph>So this isn’t just about cleaning.</Paragraph><Paragraph>It’s about making everyday cleaning more comfortable.</Paragraph>
      <OrderButton/>
    </div>
  </section>;
}