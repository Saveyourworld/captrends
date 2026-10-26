import { useEffect, useState } from "react";

type PackageId = "regular" | "silver" | "gold";
type Gift = { name: string; image: string; description: string; quantity?: number };
type Package = {
  id: PackageId; label: string; quantity: number; headline: string; copy: string;
  gifts: Gift[]; badge: string; border: string;
};

const scrubber = "/electric-scrubber/free-gifts/scrubber.jpeg";
const gloves = "/electric-scrubber/free-gifts/gloves.jpeg";
const washer = "/electric-scrubber/free-gifts/washer.jpeg";
const towel = "/electric-scrubber/free-gifts/towel.webp";

const packages: Package[] = [
  {
    id: "regular", label: "REGULAR PACKAGE", quantity: 1, badge: "THE ESSENTIAL STARTER", border: "border-slate-200",
    headline: "Start cleaning smarter — and enjoy a free gift.",
    copy: "One powerful cleaning companion, plus a pair of cleaning gloves at no extra cost. A simple way to make everyday bathroom, tile and corner cleaning feel less like a chore.",
    gifts: [
      { name: "9-in-1 Electric Spin Scrubber", image: scrubber, description: "Your main cleaning tool", quantity: 1 },
      { name: "FREE Cleaning Gloves", image: gloves, description: "Protect your hands while you clean" },
    ],
  },
  {
    id: "silver", label: "SILVER PACKAGE", quantity: 2, badge: "MORE CLEANING POWER", border: "border-sky-400",
    headline: "Why settle for one when you can equip two spaces?",
    copy: "Get two Electric Spin Scrubbers — one for your bathroom and another for the kitchen, a second home, or someone you love. Add the free gloves and an extra washing brush, and you've got a more versatile cleaning setup from day one.",
    gifts: [
      { name: "9-in-1 Electric Spin Scrubber", image: scrubber, description: "Two scrubbers included", quantity: 2 },
      { name: "FREE Cleaning Gloves", image: gloves, description: "A useful cleaning companion" },
      { name: "FREE Washing Brush", image: washer, description: "For additional scrubbing tasks" },
    ],
  },
  {
    id: "gold", label: "GOLD PACKAGE", quantity: 3, badge: "THE COMPLETE GIFT BUNDLE", border: "border-amber-400",
    headline: "Give your home the complete cleaning upgrade.",
    copy: "Three Electric Spin Scrubbers give you flexibility for multiple rooms, households, or thoughtful gifting. And with cleaning gloves, an additional washing brush and a cotton towel included, this is the fullest gift bundle of the three.",
    gifts: [
      { name: "9-in-1 Electric Spin Scrubber", image: scrubber, description: "Three scrubbers included", quantity: 3 },
      { name: "FREE Cleaning Gloves", image: gloves, description: "Keep your hands covered" },
      { name: "FREE Washing Brush", image: washer, description: "An extra cleaning helper" },
      { name: "FREE Cotton Towel", image: towel, description: "For drying and wiping" },
    ],
  },
];

function goToOrder(selected: Package) {
  // Save a structured selection for the existing OrderForm component to consume.
  const detail = { packageId: selected.id, quantity: selected.quantity };
  try { window.sessionStorage.setItem("scrubber-selected-package", JSON.stringify(detail)); } catch { /* storage can be disabled */ }
  window.dispatchEvent(new CustomEvent("scrubber:package-selected", { detail }));
  // The query string also survives refresh and can be read by OrderForm.
  const url = new URL(window.location.href);
  url.searchParams.set("package", selected.id);
  url.searchParams.set("quantity", String(selected.quantity));
  url.hash = "order-form";
  window.history.replaceState({}, "", url.toString());
  document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function GiftPhoto({ gift }: { gift: Gift }) {
  return (
    <div className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white p-2 text-center sm:p-3">
      <div className="relative flex h-28 items-center justify-center overflow-hidden rounded-xl bg-slate-50 sm:h-40">
        <img src={gift.image} alt={gift.name} loading="lazy" className="h-full w-full object-contain" />
        {gift.quantity && gift.quantity > 1 && (
          <span className="absolute right-1 top-1 rounded-full bg-[#0a7f21] px-2 py-1 text-xs font-black text-white">×{gift.quantity}</span>
        )}
      </div>
      <p className="mt-3 text-xs font-extrabold leading-snug text-slate-950 sm:text-sm">{gift.name}</p>
      <p className="mt-1 text-[11px] leading-snug text-slate-500 sm:text-xs">{gift.description}</p>
    </div>
  );
}

function OfferCard({ offer }: { offer: Package }) {
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || offer.gifts.length < 2) return;
    const timer = window.setInterval(() => {
      setSelectedPhoto((current) => (current + 1) % offer.gifts.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [paused, offer.gifts.length]);
  const changePhoto = (direction: number) => {
    setSelectedPhoto((current) => (current + direction + offer.gifts.length) % offer.gifts.length);
  };
  return (
    <article className={`flex flex-col overflow-hidden rounded-[28px] border-2 ${offer.border} bg-white shadow-[0_12px_38px_rgba(15,23,42,.08)]`}>
      <div className="bg-[#0a2540] px-5 py-5 text-center text-white">
        <span className="inline-block rounded-full bg-white/15 px-4 py-1 text-xs font-extrabold tracking-wide text-yellow-200">{offer.badge}</span>
        <h3 className="mt-3 text-2xl font-black sm:text-3xl">{offer.label}</h3>
        <p className="mt-1 text-sm font-semibold text-sky-100">{offer.quantity} {offer.quantity === 1 ? "scrubber" : "scrubbers"} + FREE gifts</p>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <h4 className="text-center text-xl font-black leading-snug text-slate-950 sm:text-2xl">{offer.headline}</h4>
        <p className="mt-3 text-center text-base leading-relaxed text-slate-700">{offer.copy}</p>
        <p className="mt-5 text-center text-sm font-black uppercase tracking-wide text-[#087b25]">Here’s what comes in your package</p>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:gap-3">
          {offer.gifts.map((gift, i) => (
            <div key={gift.name} className="relative">
              <GiftPhoto gift={gift} />
              {i > 0 && <span aria-hidden="true" className="absolute -left-2 top-11 z-10 rounded-full bg-[#04cb12] px-1.5 py-0.5 text-base font-black text-white shadow">+</span>}
            </div>
          ))}
        </div>
        <div
          className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:p-4"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
          }}
        >
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="text-sm font-black text-slate-900">PACKAGE PHOTO GALLERY</span>
            <span className="rounded-full bg-white px-2 py-1 text-xs font-bold text-slate-600">
              {selectedPhoto + 1} / {offer.gifts.length}
            </span>
          </div>
          <div className="relative flex h-52 items-center justify-center overflow-hidden rounded-xl bg-white sm:h-60">
            <img
              key={offer.gifts[selectedPhoto].image}
              src={offer.gifts[selectedPhoto].image}
              alt={`${offer.label}: ${offer.gifts[selectedPhoto].name}`}
              loading="lazy"
              className="h-full w-full object-contain p-3"
            />
            <button
              type="button"
              onClick={() => changePhoto(-1)}
              aria-label={`Previous ${offer.label} product image`}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-slate-900/80 px-3 py-2 text-xl font-bold text-white hover:bg-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >‹</button>
            <button
              type="button"
              onClick={() => changePhoto(1)}
              aria-label={`Next ${offer.label} product image`}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-slate-900/80 px-3 py-2 text-xl font-bold text-white hover:bg-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >›</button>
          </div>
          <p aria-live="off" className="mt-3 text-center text-sm font-extrabold text-slate-900">
            {offer.gifts[selectedPhoto].name}
          </p>
          <p className="mt-1 text-center text-xs text-slate-600">
            {offer.gifts[selectedPhoto].description}
          </p>
          <div className="mt-3 flex items-center justify-center gap-2" aria-label={`${offer.label} gallery images`}>
            {offer.gifts.map((gift, i) => (
              <button
                type="button"
                key={gift.name}
                onClick={() => setSelectedPhoto(i)}
                aria-label={`Show ${gift.name}`}
                aria-pressed={selectedPhoto === i}
                className={`h-3 w-3 rounded-full transition-colors ${selectedPhoto === i ? "bg-[#04cb12]" : "bg-slate-300 hover:bg-slate-400"}`}
              />
            ))}
          </div>
          <p className="mt-2 text-center text-[11px] text-slate-500">Automatically changes every 3 seconds · Pause by hovering</p>
        </div>
        <div className="mt-auto pt-6">
          <button type="button" onClick={() => goToOrder(offer)} className="w-full rounded-xl bg-[#04cb12] px-4 py-5 text-lg font-black tracking-wide text-white shadow-md transition hover:bg-[#00a90d] focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-green-500 sm:text-xl">
            Order {offer.label.replace(" PACKAGE", "")} Now →
          </button>
          <p className="mt-3 text-center text-sm font-black text-red-600">🔥 HURRY! ONLY 17 UNITS LEFT!</p>
          <p className="mt-1 text-center text-sm font-bold text-slate-900">🎁 ORDER BEFORE 11:59 PM & GET FREE GIFTS + FREE DELIVERY!</p>
        </div>
      </div>
    </article>
  );
}

export default function FreeGiftsSection() {
  return (
    <section id="free-gifts" className="bg-[#f5f8fc] px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-center text-base font-black uppercase tracking-[.16em] text-[#09853b]">Your order comes with more</p>
        <h2 className="mx-auto mt-3 max-w-4xl text-center text-[clamp(2.3rem,5.5vw,4.5rem)] font-black leading-tight text-slate-950">UNLOCK FREE GIFTS WITH EVERY PURCHASE 🎁</h2>
        <p className="mx-auto mt-5 max-w-3xl text-center text-lg leading-relaxed text-slate-700 sm:text-xl">Don’t just bring home a cleaning tool. Choose the bundle that fits your home — and enjoy extra cleaning essentials included with your order. More convenience, more ways to clean, and more reasons to get started today.</p>
        <div className="mt-10 grid items-stretch gap-7 lg:grid-cols-3">
          {packages.map(offer => <OfferCard key={offer.id} offer={offer} />)}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-slate-600">Hurry and order yours now to avoid loosing this one-time opportunity!</p>
      </div>
    </section>
  );
}