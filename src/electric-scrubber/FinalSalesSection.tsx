import { useEffect, useState } from 'react';
import type { TransitionEvent } from 'react';

type Tier = 'regular' | 'silver' | 'gold';
type Offer = { id: Tier; name: string; qty: number; price: number; original: number; pitch: string; giftNames: string[]; photos: string[]; color: string };
const IMG = '/free-gifts/';
const REVIEW_IMG = '/final-review-images/';
const offers: Offer[] = [
  { id:'regular',name:'REGULAR',qty:1,price:43000,original:70000,color:'border-slate-300',pitch:'Your first step towards easier cleaning. Get one 9-in-1 Electric Spin Scrubber plus a pair of cleaning gloves, at no extra cost. Everything you need to stop scrubbing the hard way.',giftNames:['1 Electric Spin Scrubber','FREE Cleaning Gloves'],photos:[IMG+'scrubber.jpeg',IMG+'gloves.jpeg'] },
  { id:'silver',name:'SILVER',qty:2,price:84000,original:140000,color:'border-sky-500',pitch:'Double the cleaning power and share the convenience. Keep one for yourself and give the second to someone who deserves a break. You also get free gloves and an additional washing brush.',giftNames:['2 Electric Spin Scrubbers','FREE Cleaning Gloves','FREE Washing Brush'],photos:[IMG+'scrubber.jpeg',IMG+'gloves.jpeg',IMG+'washer.jpeg'] },
  { id:'gold',name:'GOLD',qty:3,price:127000,original:210000,color:'border-amber-400',pitch:'The biggest value for a household or thoughtful gifting. Three scrubbers, plus the full gift bundle: cleaning gloves, a washing brush and a cotton towel. More cleaning flexibility, more to share, and the highest naira savings.',giftNames:['3 Electric Spin Scrubbers','FREE Cleaning Gloves','FREE Washing Brush','FREE Cotton Towel'],photos:[IMG+'scrubber.jpeg',IMG+'gloves.jpeg',IMG+'washer.jpeg',IMG+'towel.webp'] },
];
const naira = (n:number) => '₦'+n.toLocaleString('en-NG');
function selectOffer(offer:Offer){
  const detail={packageId:offer.id,quantity:offer.qty,price:offer.price};
  try{sessionStorage.setItem('scrubber-selected-package',JSON.stringify(detail));}catch{/* optional */}
  window.dispatchEvent(new CustomEvent('scrubber:package-selected',{detail}));
  const url=new URL(window.location.href);url.searchParams.set('package',offer.id);url.searchParams.set('quantity',String(offer.qty));url.hash='order-form';history.replaceState({},'',url);
  document.getElementById('order-form')?.scrollIntoView({behavior:'smooth',block:'start'});
}
function CTA({onClick,label='Click Here To Order Now'}:{onClick?:()=>void;label?:string}){
  return <div className="my-8 text-center"><a href="#order-form" onClick={onClick ? (event) => { event.preventDefault(); onClick(); } : undefined} className="block rounded-xl bg-[#05c914] px-4 py-5 text-lg font-black tracking-wide text-white shadow-md hover:bg-green-700 sm:text-2xl">{label}</a><p className="mt-3 font-black text-red-600">🔥 HURRY! ONLY 17 UNITS LEFT!</p><p className="mt-1 text-sm font-bold text-slate-900 sm:text-base">🎁 ORDER BEFORE 11:59 PM &amp; GET FREE GIFTS + FREE DELIVERY!</p></div>;
}
function ProductSlides({offer}:{offer:Offer}) {
  const [slide, setSlide] = useState(0);
  const [animated, setAnimated] = useState(true);
  const [paused, setPaused] = useState(false);
  const count = offer.photos.length;
  const current = slide === count ? 0 : slide;

  useEffect(() => {
    if (paused || count < 2) return;
    const id = window.setInterval(() => {
      setAnimated(true);
      setSlide((previous) => previous + 1);
    }, 4000);
    return () => window.clearInterval(id);
  }, [paused, count]);

  function onSlideComplete(event: TransitionEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget || event.propertyName !== 'transform') return;
    if (slide === count) {
      // Loop back to the real first image without moving the visible image.
      setAnimated(false);
      setSlide(0);
    }
  }

  return <div
    className="my-5 min-w-0 overflow-hidden rounded-2xl bg-slate-50 p-3 lg:my-6 lg:p-4 [overflow-anchor:none]"
    onMouseEnter={() => setPaused(true)}
    onMouseLeave={() => setPaused(false)}
    onFocusCapture={() => setPaused(true)}
    onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false); }}
  >
    {/* Viewport dimensions never depend on any image or its loading state. */}
    <div className="relative h-56 w-full min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white sm:h-64 lg:h-[280px] [contain:layout_paint]" aria-label={`${offer.name} package product gallery`}>
      {/* An absolutely positioned track cannot contribute to the card's height or width. */}
      <div
        className="absolute inset-0 flex"
        style={{
          transform: `translate3d(-${slide * 100}%, 0, 0)`,
          transition: animated ? 'transform 700ms ease-in-out' : 'none',
          willChange: 'transform',
        }}
        onTransitionEnd={onSlideComplete}
      >
        {[...offer.photos, offer.photos[0]].map((photo, i) => (
          <div key={`${offer.id}-${i}`} className="relative h-full w-full min-w-0 shrink-0 grow-0 basis-full overflow-hidden">
            <img
              src={photo}
              alt={i === current ? offer.giftNames[i % count] : ''}
              aria-hidden={i !== current}
              width={440}
              height={330}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className="absolute inset-0 block h-full w-full object-contain object-center p-3 lg:p-5"
            />
          </div>
        ))}
      </div>
    </div>
    <div className="mt-2 flex h-12 items-center justify-center overflow-hidden px-2 text-center text-sm font-bold leading-5 lg:h-14" aria-live="off">
      {offer.giftNames[current]}
    </div>
    <div className="mt-3 flex h-14 items-center justify-center gap-2 lg:h-16">
      {offer.photos.map((photo, i) => <button
        type="button" key={photo} onClick={() => { setAnimated(true); setSlide(i); }}
        aria-label={`Show ${offer.giftNames[i]}`} aria-pressed={current === i}
        className={`h-12 w-12 shrink-0 overflow-hidden rounded-lg border-2 bg-white p-1 transition-colors lg:h-14 lg:w-14 ${current === i ? 'border-green-600' : 'border-slate-200'}`}
      ><img src={photo} alt="" width={80} height={80} loading="lazy" className="block h-full w-full object-contain" /></button>)}
    </div>
  </div>;
}
function OfferCard({offer}:{offer:Offer}){
 const saving=offer.original-offer.price; const pct=Math.round(saving/offer.original*100);
 return <article className={`flex h-full min-w-0 flex-col rounded-[28px] border-[3px] ${offer.color} bg-white p-5 shadow-xl sm:p-7`}>
  <h3 className="text-center text-3xl font-black sm:text-4xl">{offer.name}</h3><p className="mt-2 text-center text-lg font-black">BUY {offer.qty} · SAVE {pct}%</p>
  <ProductSlides offer={offer}/>
  <p className="text-center text-base leading-relaxed text-slate-700 lg:min-h-[204px] xl:min-h-[168px]">{offer.pitch}</p>
  <p className="mt-5 text-center text-sm font-black uppercase text-green-700">Your package includes</p>
  <div className="mt-3 grid grid-cols-2 content-start gap-2 lg:grid-rows-[160px_160px]">{offer.giftNames.map((name,i)=><div key={name} className="min-w-0 overflow-hidden rounded-xl border bg-slate-50 p-2 text-center lg:h-[160px]"><img src={offer.photos[i]} alt={name} className="block h-20 w-full object-contain sm:h-24 lg:h-24" width={160} height={96} loading="lazy"/><p className="mt-2 text-xs font-bold sm:text-sm lg:flex lg:h-10 lg:items-center lg:justify-center lg:overflow-hidden lg:leading-tight">{name}</p></div>)}{Array.from({length:4-offer.giftNames.length},(_,i)=><div key={`reserved-gift-${i}`} aria-hidden="true" className="hidden lg:block lg:h-[160px]" />)}</div>
  <div className="mt-5 text-center"><p className="text-lg text-slate-500 line-through">{naira(offer.original)}</p><p className="text-4xl font-black text-green-700">{naira(offer.price)}</p><p className="mt-1 font-bold text-red-600">YOU SAVE {naira(saving)}</p></div>
  <ul className="mt-5 space-y-2 text-center font-bold"><li>✓ FREE DELIVERY</li><li>✓ PAY ON DELIVERY</li><li>✓ FREE GIFTS INCLUDED</li></ul>
  <div className="mt-auto"><CTA label={`ORDER ${offer.name} PACKAGE NOW`} onClick={()=>selectOffer(offer)}/></div>
 </article>;
}
const customerReviews=[
 {name:'Emeka Okafor',location:'Enugu',image:'shegun-review.jpg',quote:'My bathroom floor tiles had old stains that no detergent could lift. I used the hard dome brush attachment on this scrubber, and in less than 10 minutes, the floor looked brand new. No more bending down and breaking my back!"'},
 {name:'Zainab Bello',location:'Kano',image:'chioma-review.jpg',quote:"I used to finish cleaning and feel angry for no reason. Now I realize it was just stress and tiredness. Since I started using this, cleaning doesn't frustrate me anymore."},
 {name:'Tunde Adebayo',location:'Ibadan',image:'patricia-review.jpg',quote:"At first, I thought it was just another hype product on social media, but Omo! This thing is powerful. The extension handle is a lifesaver for high wall tiles and ceilings"},
 {name:'Nkechi Okoro',location:'Kaduna',image:'musa-review.jpg',quote:'I use the smaller brush heads for my gas cooker and sink, and the large flat brush for the bathroom floor. Having 9 attachments means there’s a tool for literally every corner of the house.'},
];
const questions=[
 ['What’s inside the package?','A rechargeable 9-in-1 Electric Spin Scrubber, interchangeable cleaning attachments and the package-specific gifts shown below. Check your delivered package against the confirmed order.'],
 ['How does it work?','Attach the appropriate brush head, switch on the scrubber and guide the rotating brush across the surface. The powered rotation reduces the need for repeated manual scrubbing.'],
 ['What makes it different from an ordinary brush?','The motor rotates the cleaning head for you, so you can focus on guiding the brush instead of doing every scrubbing movement by hand.'],
 ['Can I use it on different surfaces?','The interchangeable heads suit different cleaning tasks. Test a small inconspicuous area first and follow the manufacturer’s instructions for delicate surfaces.'],
 ['How much does it cost?','Regular is ₦43,000, Silver is ₦84,000 and Gold is ₦127,000. All package offers shown here include free delivery.'],
 ['How do I pay?','Choose your package, fill in your details and wait for an order-confirmation call. Payment on delivery is offered as described on this page.'],
 ['When will I receive my order?','Delivery time depends on your location and courier arrangements. We will confirm the estimated delivery window when we call you.'],
 ['What if there is a problem with my order?','Contact our support team promptly. Any return, replacement or refund depends on the actual policy communicated at purchase; we do not promise an unconfirmed guarantee.'],
];
const process=[['🛒','PLACE YOUR ORDER','Choose a package and complete the form.'],['📞','WE CALL TO CONFIRM','We verify your details and delivery location.'],['🚚','WE PROCESS & SEND','Your confirmed package is prepared and dispatched.'],['😊','RECEIVE YOUR PRODUCT','Receive and inspect your order.']];
export default function FinalSalesSection(){
 const [remaining,setRemaining]=useState(24*60*60);
 useEffect(()=>{
  const KEY='scrubber-24-hour-cycle-start',CYCLE=86400000;
  const update=()=>{const now=Date.now();let start=now;try{const stored=Number(window.localStorage.getItem(KEY));if(Number.isFinite(stored)&&stored>0&&stored<=now){start=stored;}else{window.localStorage.setItem(KEY,String(now));}}catch{}setRemaining(Math.floor((CYCLE-((now-start)%CYCLE))/1000));};
  update();const timer=window.setInterval(update,1000);return()=>window.clearInterval(timer);
 },[]);
 const hh=String(Math.floor(remaining/3600)).padStart(2,'0'),mm=String(Math.floor(remaining%3600/60)).padStart(2,'0'),ss=String(remaining%60).padStart(2,'0');
 return <section id="final-sales-section" className="bg-[#f5f5f5] text-black">
  <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
   <h2 className="text-center text-5xl font-black sm:text-7xl">How We Work</h2><p className="mt-8 text-center text-xl font-black sm:text-3xl">Get Your Electric Spin Scrubber™ Today <u>(BEFORE WE SELL OUT)</u></p><p className="mt-5 text-center text-xl font-black text-red-600 sm:text-2xl">HURRY! <u>17 Items In Stock</u></p>
   <div className="mx-auto mt-12 grid max-w-4xl gap-9 sm:grid-cols-2">{process.map(([icon,title,desc])=><div key={title} className="text-center"><div className="text-6xl" aria-hidden="true">{icon}</div><h3 className="mt-4 text-xl font-black">{title}</h3><p className="mt-2 text-lg">{desc}</p></div>)}</div><CTA/>
  </div>
  <div className="bg-black px-4 py-14 text-center text-white"><h2 className="mx-auto max-w-4xl text-3xl font-black sm:text-5xl">ARE YOU READY TO ACCEPT THIS OFFER + FREE DELIVERY BEFORE IT ENDS?</h2><p className="mt-6 text-lg font-bold">24-HOUR SPECIAL OFFER + FREE GIFTS + FREE DELIVERY</p><div className="mt-8 flex justify-center gap-3">{[[hh,'Hours'],[mm,'Minutes'],[ss,'Seconds']].map(([v,label])=><div key={label} className="min-w-20 bg-[#ff4d55] px-4 py-3"><div className="text-4xl font-black">{v}</div><div className="text-sm">{label}</div></div>)}</div><p className="mt-4 text-sm text-slate-300">This is a real countdown for the limited time offer. Order yours now!</p></div>
  <div className="mx-auto max-w-5xl px-4 py-16 sm:px-8"><h2 className="text-center text-4xl font-black text-sky-500 sm:text-6xl">SEE OUR HAPPY CUSTOMERS REVIEWS</h2><div className="mt-10 grid gap-7 md:grid-cols-2">{customerReviews.map((review)=><article key={review.name} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-md"><div className="p-6"><div className="flex items-center gap-3"><div className="flex h-14 w-14 items-center justify-center rounded-full bg-sky-600 text-2xl font-black text-white">{review.name[0]}</div><div><h3 className="text-xl font-black">{review.name}</h3><p className="text-slate-500">{review.location}</p></div></div><div className="mt-3 flex flex-wrap items-center gap-3"><span className="text-2xl tracking-widest text-amber-500" aria-label="5 out of 5 stars">★★★★★</span><span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-sm font-extrabold text-green-700" title="Verified purchase"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true"><path d="m9 12 2 2 4-4"/><path d="M12 2 14.5 4l3.2.3 1.3 2.9 2.5 2-.5 3.2.5 3.2-2.5 2-1.3 2.9-3.2.3L12 22l-2.5-2-3.2-.3L5 16.8l-2.5-2 .5-3.2-.5-3.2 2.5-2L6.3 3.5l3.2-.3L12 2Z"/></svg>Verified</span></div><blockquote className="mt-4 text-lg leading-relaxed text-slate-700">“{review.quote}”</blockquote></div><img src={REVIEW_IMG+review.image} alt={`Electric Spin Scrubber product photo shown with ${review.name}'s review`} className="h-72 w-full bg-slate-50 object-contain" loading="lazy"/></article>)}</div><CTA/></div>
  <div className="mx-auto max-w-5xl px-4 py-16 sm:px-8"><h2 className="mb-12 text-center text-4xl font-black sm:text-6xl">Now Let’s Answer Every Question Forming In Your Mind.</h2><div className="space-y-8">{questions.map(([q,a])=><div key={q}><h3 className="text-2xl font-black sm:text-3xl">{q}</h3><p className="mt-3 text-lg leading-relaxed sm:text-xl">{a}</p></div>)}</div><CTA/></div>
  <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-8"><h2 className="text-4xl font-black sm:text-6xl">Why You Should Place Your Order Now</h2><div className="mt-12 grid gap-8 sm:grid-cols-3"><div><div className="text-5xl">🛡️</div><p className="mt-4 text-xl">Choose the package that fits your home and budget.</p></div><div><div className="text-5xl">🎁</div><p className="mt-4 text-xl">Enjoy the free gifts included with your selected package.</p></div><div><div className="text-5xl">🚚</div><p className="mt-4 text-xl">Free delivery and payment on delivery.</p></div></div><CTA/></div>
  <div className="bg-white px-4 py-16 sm:px-8" id="final-package-offers"><div className="mx-auto max-w-7xl"><h2 className="text-center text-4xl font-black sm:text-6xl">CHOOSE YOUR PACKAGE</h2><p className="mt-4 text-center text-xl font-black text-red-600">HURRY! 17 ITEMS LEFT + FREE GIFTS + FREE DELIVERY</p><p className="mx-auto mt-5 max-w-3xl text-center text-lg">Whether you want one for your home, two to share or three for the ultimate cleaning bundle, there’s a package made for you. Compare the savings and pick your best fit.</p><div className="mt-12 grid min-w-0 items-stretch gap-7 lg:grid-cols-3">{offers.map(o=><OfferCard key={o.id} offer={o}/>)}</div><p className="mt-8 text-center text-sm text-slate-500">Once your order is confirmed, your package will be on the way to you.</p></div></div>
 </section>;
}