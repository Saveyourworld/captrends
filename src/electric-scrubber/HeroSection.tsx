import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const PRODUCT_NAME = "Electric Spin Scrubber™";
const PRODUCT_VIDEO = "/electric-scrubber/Scrubbing-Device.mp4";
const ORDER_TARGET = "#order-form";
const CUSTOMER_COUNT = 651; // Confirmed by store owner
const STOCK_LEFT = 17; // Confirmed by store owner; update when inventory changes

// These filenames must match the images inside your project's public/ folder.
const gallery = [
  { src: "/electric-scrubber/scrubbing device.jpeg", alt: "Electric spin scrubber and attachments" },
  { src: "/electric-scrubber/scr.jpeg", alt: "9-in-1 electric scrubber" },
  { src: "/electric-scrubber/scru.jpeg", alt: "Electric scrubber product view" },
  { src: "/electric-scrubber/scrub.webp", alt: "Electric spin scrubber and attachments" },
  { src: "/electric-scrubber/scrubber.jpeg", alt: "9-in-1 electric scrubber" },
  { src: "/electric-scrubber/scrub1.webp", alt: "Electric scrubber product view" },
  { src: "/electric-scrubber/scrub2.webp", alt: "Electric scrubber product view" },
];

const CYCLE_MS = 24 * 60 * 60 * 1000;
const CYCLE_STORAGE_KEY = "scrubber-24-hour-cycle-start";

function getCycleStart() {
  const now = Date.now();
  try {
    const stored = Number(window.localStorage.getItem(CYCLE_STORAGE_KEY));
    if (Number.isFinite(stored) && stored > 0 && stored <= now) return stored;
    window.localStorage.setItem(CYCLE_STORAGE_KEY, String(now));
  } catch { /* localStorage may be unavailable; timer still works */ }
  return now;
}

function getCountdown(start: number) {
  const elapsed = Math.max(0, Date.now() - start);
  const remaining = CYCLE_MS - (elapsed % CYCLE_MS);
  return {
    hours: Math.floor(remaining / 3_600_000),
    minutes: Math.floor((remaining % 3_600_000) / 60_000),
    seconds: Math.floor((remaining % 60_000) / 1000),
  };
}

function Countdown({ compact = false }: { compact?: boolean }) {
  const [start] = useState(getCycleStart);
  const [time, setTime] = useState(() => getCountdown(start));
  useEffect(() => {
    const interval = window.setInterval(() => setTime(getCountdown(start)), 1000);
    return () => window.clearInterval(interval);
  }, [start]);
  return (
    <div className={compact ? "flex items-center justify-center gap-1 sm:gap-1.5" : "flex justify-center gap-2.5 sm:gap-4"} role="timer" aria-label="Time remaining in the 24-hour countdown cycle">
      {([[time.hours, "Hours"], [time.minutes, "Minutes"], [time.seconds, "Seconds"]] as const).map(([value, label]) => (
        <div key={label} className={compact ? "flex min-w-[48px] flex-col items-center rounded bg-[#ff4b50] px-1 py-1 text-white sm:min-w-[58px]" : "flex min-w-[83px] flex-col items-center bg-[#ff4b50] px-3 py-3 text-white sm:min-w-[112px]"}>
          <span className={compact ? "text-[18px] font-bold leading-none sm:text-[22px]" : "text-[38px] font-semibold leading-none sm:text-[52px]"}>{String(value).padStart(2, "0")}</span>
          <span className={compact ? "mt-0.5 text-[9px] leading-none sm:text-[10px]" : "mt-1 text-[15px] leading-none sm:text-lg"}>{label}</span>
        </div>
      ))}
    </div>
  );
}

function OrderButton({ compact = false }: { compact?: boolean }) {
  return (
    <a href={ORDER_TARGET} className={`flex w-full items-center justify-center rounded-[9px] bg-[#00d416] px-4 text-center font-bold text-white transition hover:bg-[#00b914] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-green-700 ${compact ? "min-h-[49px] py-2 text-[15px] sm:text-[17px]" : "min-h-[76px] py-5 text-[19px] tracking-[0.09em] sm:text-[24px]"}`}>
      Click Here To Order Now
    </a>
  );
}

function OfferMessage() {
  return (
    <p className="text-center text-[19px] font-extrabold leading-[1.45] text-[#353535] sm:text-[25px]">
      ORDER BEFORE 11:59 PM  &amp;  <span className="underline underline-offset-2">Get Free Gift + Free Shipping</span>
    </p>
  );
}

function Gallery() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const interval = window.setInterval(() => {
      setActive((previous) => (previous + 1) % gallery.length);
    }, 4500);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-w-0 lg:relative lg:h-full">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#f5f5f5] lg:absolute lg:inset-0 lg:aspect-auto lg:h-full" aria-label="Automatically rotating product photographs">
        {gallery.map((item, index) => (
          <img
            key={item.src}
            src={item.src}
            alt={item.alt}
            loading={index === 0 ? "eager" : "lazy"}
            className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ease-in-out ${active === index ? "opacity-100" : "opacity-0"}`}
            aria-hidden={active !== index}
          />
        ))}
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [videoError, setVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [barHeight, setBarHeight] = useState(132);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const measure = () => setBarHeight(bar.getBoundingClientRect().height);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(bar);
    return () => observer.disconnect();
  }, [mounted]);

  const handlePlayClick = () => {
    const video = videoRef.current;
    if (!video) return;
    void video.play().catch(() => {});
  };

  return (
    <>
      {/* Portal prevents parent layout/overflow rules from trapping the top bar.
          The measured spacer keeps the page content below the fixed bar. */}
      <div aria-hidden="true" style={{ height: barHeight }} />
      {mounted && createPortal(
      <div ref={barRef} className="fixed inset-x-0 top-0 z-[9999] w-full bg-black px-2 py-2 text-white shadow-lg sm:px-4">
        <div className="mx-auto grid max-w-[1280px] grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 gap-y-2 lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:gap-x-5">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <img src="/electric-scrubber/scrubber.jpeg" alt="Electric Spin Scrubber" className="h-10 w-10 shrink-0 rounded-full bg-neutral-900 object-contain sm:h-12 sm:w-12" />
            <p className="min-w-0 text-[11px] font-medium leading-tight sm:text-[13px] xl:text-[15px]">
              Protect Yourself, Family, Lifestyle &amp; Health. 300% Guaranteed. Get <span className="font-bold underline">{PRODUCT_NAME}</span> Now.
            </p>
          </div>
          <div className="col-span-2 flex flex-col items-center gap-1 lg:col-span-1 lg:col-start-2">
            <p className="text-center text-[10px] font-bold leading-tight text-[#facc15] sm:text-[11px]">24-HOUR OFFER · FREE GIFTS + FREE SHIPPING</p>
            <Countdown compact />
            <p className="text-center text-[10px] font-bold leading-tight text-[#fca5a5] sm:text-[11px]">HURRY! ONLY {STOCK_LEFT} ITEMS LEFT</p>
          </div>
          <div className="col-start-2 row-start-1 w-[118px] shrink-0 sm:w-[180px] lg:col-start-3 lg:row-start-1 lg:w-[220px]">
            <OrderButton compact />
          </div>
        </div>
      </div>

      , document.body)}

      {/* Ember Months promotional banner — above the hero, below the sticky bar. */}
      <div className="w-full bg-[#101a35] px-4 py-5 text-center text-white sm:py-7">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[22px] font-black uppercase tracking-wide text-[#facc15] sm:text-[32px]">
            🔥 EMBER MONTHS SPECIAL OFFER 🔥
          </p>
          <p className="mt-2 text-[16px] font-extrabold leading-snug sm:text-[23px]">
            ORDER BEFORE 11:59 PM &amp; GET FREE GIFTS + FREE SHIPPING!
          </p>
          <p className="mt-2 text-[14px] font-bold text-[#fca5a5] sm:text-[18px]">
            ⚡ LIMITED STOCK AVAILABLE — ONLY {STOCK_LEFT} ITEMS LEFT!
          </p>
        </div>
      </div>

      <section className="w-full bg-white font-sans text-black">
        <div className="mx-auto max-w-[1200px] px-5 pb-10 pt-6 sm:px-8 lg:pt-10">
          {/* On mobile the gallery comes FIRST; on desktop it sits beside the product title and copy. */}
          <div className="grid items-start gap-6 lg:items-stretch lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-8">
            <Gallery />
            <div className="min-w-0 lg:py-1">
              <h1 className="mb-6 text-center text-[44px] font-black leading-[1.13] tracking-[-0.025em] sm:text-[62px] lg:text-left lg:text-[65px]">
                Electric Spin Scrubber™
              </h1>
              <p className="mb-7 text-center text-[19px] sm:text-[23px] lg:text-left">
                Over {CUSTOMER_COUNT} Happy Customers <span className="whitespace-nowrap text-[#e9ae27]" aria-label="Five stars">★★★★★</span>
              </p>
              <h2 className="mb-7 text-center text-[26px] font-black leading-[1.34] sm:text-[36px] lg:text-left">
                Do Your Entire Cleaning in 30 Minutes Or Less — Without Bending, Kneeling, or Destroying Your Back.
              </h2>
              <div className="mb-7"><OfferMessage /></div>
              <div className="mb-8"><Countdown /></div>
              <div className="mb-8"><OrderButton /></div>
              <p className="text-center text-[22px] font-black text-red-600 sm:text-[29px]">
                HURRY! <span className="underline">{STOCK_LEFT} Items In Stock</span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-black px-5 py-12 text-white sm:px-8 sm:py-16">
          <div className="mx-auto max-w-[850px]">
            <h2 className="mx-auto mb-9 text-center text-[43px] font-black leading-[1.2] tracking-[-0.025em] sm:text-[65px]">
              See Electric Spin Scrubber™ In Action
            </h2>
            <div className="relative mx-auto w-full max-w-[800px] overflow-hidden bg-[#111]">
              <video
                ref={videoRef}
                src={PRODUCT_VIDEO}
                preload="metadata"
                playsInline
                controls
                muted
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                onError={() => setVideoError(true)}
                className="block h-auto w-full"
                aria-label="Electric Spin Scrubber demonstration video"
              >
                Your browser does not support video playback.
              </video>

              {/* Centered Play Button Overlay */}
              {!isPlaying && !videoError && (
                <button
                  type="button"
                  onClick={handlePlayClick}
                  className="absolute inset-0 m-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#ff4b50] text-white shadow-2xl transition hover:scale-110 focus-visible:outline focus-visible:outline-4 focus-visible:outline-white"
                  aria-label="Play demonstration video"
                >
                  <svg className="ml-1.5 h-10 w-10 fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              )}

              {videoError && <p className="p-5 text-center text-white">Video unavailable. Check public/Scrubbing-Device.mp4.</p>}
            </div>
            <div className="mb-9 mt-10"><OrderButton /></div>
            <div className="text-white [&_p]:text-white"><OfferMessage /></div>
          </div>
        </div>
      </section>
    </>
  );
}