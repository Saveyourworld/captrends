import { useEffect, useRef, useState } from "react";
import type { FormEvent, TransitionEvent } from "react";
import emailjs from "@emailjs/browser";
import ThankYouPage from "./ThankYouPage";

const PRODUCT_NAME = "9-in-1 Electric Cleaning Brush";
const PACKAGES = {
  regular: { label: "REGULAR", quantity: 1, price: 43000, original: 70000, gifts: "Free cleaning gloves" },
  silver: { label: "SILVER", quantity: 2, price: 84000, original: 140000, gifts: "Free cleaning gloves + washing brush" },
  gold: { label: "GOLD", quantity: 3, price: 127000, original: 210000, gifts: "Free cleaning gloves + washing brush + cotton towel" },
} as const;
type PackageId = keyof typeof PACKAGES;
function getInitialPackage(): PackageId {
  if (typeof window === "undefined") return "regular";
  const q = new URLSearchParams(window.location.search).get("package");
  if (q && q in PACKAGES) return q as PackageId;
  try { const saved = JSON.parse(sessionStorage.getItem("scrubber-selected-package") || "null"); if (saved?.packageId in PACKAGES) return saved.packageId; } catch { /* no saved selection */ }
  return "regular";
}
const WHATSAPP_NUMBER = "2349064543927";

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi",
  "Bayelsa", "Benue", "Borno", "Cross River", "Delta",
  "Ebonyi", "Edo", "Ekiti", "Enugu", "Federal Capital Territory",
  "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
  "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger",
  "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers",
  "Sokoto", "Taraba", "Yobe", "Zamfara",
];

const formatNaira = (amount: number) =>
  `₦${amount.toLocaleString("en-NG")}`;

type CheckoutStatus = "idle" | "email-sent" | "email-failed";

function CheckIcon() {
  return (
    <span
      aria-hidden="true"
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-black text-emerald-700"
    >
      ✓
    </span>
  );
}

function TrustCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-2xl">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-black">{title}</h4>
        <p className="mt-1 text-sm leading-6 text-slate-600">
          {description}
        </p>
      </div>
    </div>
  );
}


const GALLERY: Record<PackageId, {src:string;label:string}[]> = {
 regular:[{src:"/electric-scrubber/free-gifts/scrubber.jpeg",label:"1 Electric Spin Scrubber"},{src:"/electric-scrubber/free-gifts/gloves.jpeg",label:"FREE Cleaning Gloves"}],
 silver:[{src:"/electric-scrubber/free-gifts/scrubber.jpeg",label:"2 Electric Spin Scrubbers"},{src:"/electric-scrubber/free-gifts/gloves.jpeg",label:"FREE Cleaning Gloves"},{src:"/electric-scrubber/free-gifts/washer.jpeg",label:"FREE Washing Brush"}],
 gold:[{src:"/electric-scrubber/free-gifts/scrubber.jpeg",label:"3 Electric Spin Scrubbers"},{src:"/electric-scrubber/free-gifts/gloves.jpeg",label:"FREE Cleaning Gloves"},{src:"/electric-scrubber/free-gifts/washer.jpeg",label:"FREE Washing Brush"},{src:"/electric-scrubber/free-gifts/towel.webp",label:"FREE Cotton Towel"}],
};
// Every image occupies the SAME fixed-size slide. The track moves horizontally;
// no slide changes the height of the gallery or the checkout form.
function PackageSlides({ photos, pauseAuto }: { photos: { src: string; label: string }[]; pauseAuto: boolean }) {
  const [slide, setSlide] = useState(0);
  const [animated, setAnimated] = useState(true);
  const [pausedByHover, setPausedByHover] = useState(false);
  const count = photos.length;
  const visible = slide === count ? 0 : slide;

  useEffect(() => {
    // Stop automatic movement permanently for this checkout interaction
    // as soon as the customer begins using the form.
    if (pauseAuto || pausedByHover || count < 2) return;
    const id = window.setInterval(() => {
      setAnimated(true);
      setSlide((previous) => previous + 1);
    }, 4000);
    return () => window.clearInterval(id);
  }, [pauseAuto, pausedByHover, count]);

  const onSlideComplete = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== 'transform') return;
    if (slide === count) {
      setAnimated(false);
      setSlide(0);
    }
  };

  return (
    <div
      className="mt-4 min-w-0 overflow-hidden [overflow-anchor:none]"
      onMouseEnter={() => setPausedByHover(true)}
      onMouseLeave={() => setPausedByHover(false)}
      onFocusCapture={() => setPausedByHover(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPausedByHover(false); }}
    >
      <div
        className="relative h-64 w-full min-w-0 overflow-hidden rounded-xl bg-white sm:h-72 lg:h-72 [contain:layout_paint]"
        aria-label="Package product and gift images"
      >
        <div
          className="absolute inset-0 flex"
          style={{
            transform: `translate3d(-${slide * 100}%, 0, 0)`,
            transition: animated ? 'transform 700ms ease-in-out' : 'none',
            willChange: 'transform',
          }}
          onTransitionEnd={onSlideComplete}
        >
          {[...photos, photos[0]].map((photo, i) => (
            <div key={`${photo.src}-${i}`} className="relative h-full w-full min-w-0 shrink-0 grow-0 basis-full overflow-hidden">
              <img
                src={photo.src}
                alt={i === visible ? photo.label : ''}
                aria-hidden={i !== visible}
                width={440}
                height={330}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className="absolute inset-0 block h-full w-full object-contain object-center p-3"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 flex h-14 items-center justify-center overflow-hidden px-2 text-center text-base font-extrabold leading-tight text-black sm:text-lg" aria-live="off">
        {photos[visible].label}
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
        {Array.from({ length: 4 }, (_, i) => {
          const photo = photos[i];
          return photo ? (
            <button
              key={photo.src}
              type="button"
              aria-label={`View ${photo.label}`}
              aria-pressed={i === visible}
              onClick={() => { setAnimated(true); setSlide(i); }}
              className={`flex h-16 min-w-0 items-center justify-center overflow-hidden rounded-lg border-2 p-1 sm:h-20 ${i === visible ? 'border-green-600' : 'border-slate-200'}`}
            >
              <img src={photo.src} alt="" width={80} height={80} className="block h-full w-full object-contain" />
            </button>
          ) : <div key={`empty-${i}`} className="h-16 sm:h-20" aria-hidden="true" />;
        })}
      </div>
    </div>
  );
}

function PackageGallery({ packageId, pauseAuto }: { packageId: PackageId; pauseAuto: boolean }) {
  const selected = PACKAGES[packageId];
  return (
    <div className="mt-7 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm [overflow-anchor:none]">
      <h3 className="flex h-14 items-center justify-center overflow-hidden text-center text-lg font-black leading-tight text-slate-950 sm:text-xl">
        YOUR {selected.label} PACKAGE + FREE GIFTS
      </h3>
      <PackageSlides key={packageId} photos={GALLERY[packageId]} pauseAuto={pauseAuto} />
      <p className="mt-3 flex h-12 items-center justify-center overflow-hidden text-center text-sm font-semibold leading-tight text-green-800">
        {selected.quantity} scrubber{selected.quantity > 1 ? "s" : ""} + {selected.gifts}
      </p>
      <p className="mt-2 h-9 text-center text-xs text-slate-500">
        Photos slide automatically. Tap a thumbnail to view a specific item.
      </p>
    </div>
  );
}

function ClosingReviews(){
 const reviews=[
  {name:'Femi Alabi',location:'Lagos',image:'shegun-review.jpg',quote:'Delivery was fast and smooth right to my doorstep in Ikeja. Got my package with the free gift included. Tested it immediately on my bathroom grout and I am thoroughly impressed.'},
  {name:'Blessing Etim',location:'Uyo',image:'chioma-review.jpg',quote:"he speed settings are fantastic. You don’t need to apply heavy physical pressure; just guide the scrubber and watch it lift years of soap scum away instantly"},
  {name:'Chinyere Eze',location:'Onitsha',image:'patricia-review.jpg',quote:"Even my husband has started helping out with chores on weekends because 'operating the machine' is fun to him! It completely changed our cleaning routine"},
  {name:'Ahmed Ibrahim',location:'Kaduna',image:'musa-review.jpg',quote:'Solid build quality. It doesnt slow down or stall when you press it against stubborn stains. Worth every single Naira spent.'},
 ];
 return <div className="bg-[#ebebeb] px-4 py-16"><div className="mx-auto max-w-6xl"><h2 className="text-center text-4xl font-black text-[#10b9f5] sm:text-6xl">SEE OUR HAPPY CUSTOMERS REVIEWS</h2><div className="mt-10 grid gap-7 md:grid-cols-2">{reviews.map(r=><article key={r.name} className="overflow-hidden rounded-3xl bg-white shadow-lg"><div className="p-6"><div className="flex items-center gap-3"><span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-xl font-black text-white">{r.name[0]}</span><div><h3 className="text-lg font-black">{r.name}</h3><p className="text-sm text-slate-500">{r.location}</p></div></div><p className="mt-3 text-amber-500" aria-label="Customer review">★★★★★</p><p className="mt-4 text-lg leading-relaxed text-slate-800">“{r.quote}”</p></div><img src={'/final-review-images/'+r.image} alt="Electric Spin Scrubber customer product photo" className="h-64 w-full object-contain" loading="lazy"/></article>)}</div></div></div>;
}
function WarningBeforeForm(){return <div className="bg-white px-4 py-14 text-center text-black"><div className="mx-auto max-w-5xl"><h2 className="text-[clamp(3.3rem,9vw,7rem)] font-black leading-none text-red-600">PLEASE NOTE!!!</h2><p className="mx-auto mt-10 max-w-4xl text-xl font-extrabold leading-relaxed sm:text-3xl">Please be sure you are FULLY ready for the product and have the money to pay at the point of delivery because we have limited stock.</p><p className="mt-6 text-xl font-bold text-zinc-700 sm:text-3xl">ORDER Before 11:59pm &amp; <u>Get Free Gift + Free Shipping</u></p><h2 className="mt-14 text-[clamp(2.8rem,7vw,5rem)] font-black leading-tight text-red-600">PLACE YOUR ORDER BELOW...</h2><p className="mx-auto mt-9 max-w-4xl text-xl font-black leading-relaxed text-red-600 sm:text-3xl">Due to high demand from our advert, we are running low on this product. Please place your order while supplies last!</p></div></div>}
function AfterCheckout(){return <><div className="bg-[#ebebeb] px-4 py-14 text-black"><div className="mx-auto max-w-4xl space-y-7 text-xl font-semibold leading-relaxed sm:text-2xl"><p>But here’s the reality. Most people will read this. Nod. Think, “That makes sense.” And then do nothing. They’ll say, “I’ll get it later.”</p><p>And later turns into another sore Saturday. Another rushed panic before visitors. Another reminder from their lower back.</p><p>If you’re still reading... You’re not most people. You see the logic.</p><p>If power replaces pressure... Cleaning takes less physical effort. If cleaning feels easier... You get more energy for what matters.</p><p>That’s the chain. That’s why this exists. And that’s why you’re here.</p><p>Clean smarter. Protect your back. Reclaim your weekends. And finally make cleaning feel easier.</p><p>Click the button. Secure your 9-in-1 Electric Spin Scrubber now.</p><p>Upgrade the tool. Upgrade the outcome. Let the motor do what your body shouldn’t have to.</p></div><div className="mx-auto mt-10 max-w-4xl"><a href="#order-form" className="block rounded-xl bg-[#05c914] px-5 py-5 text-center text-xl font-black text-white sm:text-3xl">Click Here To Order Now</a><p className="mt-5 text-center text-lg font-bold">ORDER Before 11:59pm &amp; <u>Get Free Gift + Free Shipping</u></p></div></div><div className="bg-black px-4 py-14 text-center text-white"><div className="mx-auto max-w-4xl"><h2 className="text-5xl font-black text-red-600 sm:text-7xl">Need Help?</h2><p className="mt-8 text-xl font-black sm:text-2xl">CHAT WITH OUR CUSTOMER CARE TEAM</p><a className="mt-7 block rounded-xl bg-[#18e92e] px-5 py-5 text-xl font-black text-black sm:text-3xl" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello, I need help ordering the 9-in-1 Electric Spin Scrubber.')}`} target="_blank" rel="noopener noreferrer">Chat Us On WhatsApp</a><p className="mt-8 text-lg font-bold">Delivery estimates and order confirmation will be communicated by our customer care team.</p><a className="mt-9 block rounded-xl bg-[#05c914] px-5 py-5 text-xl font-black text-white sm:text-2xl" href="#order-form">Click Here To Order Now</a><p className="mt-6 text-lg font-bold">FREE DELIVERY + FREE GIFTS WITH YOUR SELECTED PACKAGE</p></div></div></>}

export default function OrderForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const [packageId, setPackageId] = useState<PackageId>(getInitialPackage);
  const selectedPackage = PACKAGES[packageId];
  const quantity = selectedPackage.quantity;
  const [country, setCountry] = useState("Nigeria");
  const [state, setState] = useState("");
  const [otherCountry, setOtherCountry] = useState("");
  const [region, setRegion] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkoutStatus, setCheckoutStatus] =
    useState<CheckoutStatus>("idle");
  const [whatsappURL, setWhatsappURL] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  // Freeze automatic gallery motion as soon as checkout begins.
  const [checkoutStarted, setCheckoutStarted] = useState(false);

  const productTotal = selectedPackage.price;
  const originalTotal = selectedPackage.original;
  const totalSaved = originalTotal - productTotal;
  const deliveryFee = 0;
  const grandTotal = productTotal + deliveryFee;

  const selectedCountry =
    country === "Other" ? otherCountry.trim() : country;

  const selectedRegion =
    country === "Nigeria" ? state : region.trim();

  // The package cards in FinalSalesSection dispatch this event and set the URL.
  // This also supports browser back/forward navigation.
  useEffect(() => {
    const update = (event?: Event) => {
      const detail = (event as CustomEvent<{packageId?: string}> | undefined)?.detail;
      const fromUrl = new URLSearchParams(window.location.search).get("package");
      const next = detail?.packageId || fromUrl;
      if (next && next in PACKAGES) setPackageId(next as PackageId);
    };
    window.addEventListener("scrubber:package-selected", update);
    window.addEventListener("popstate", update);
    update();
    return () => { window.removeEventListener("scrubber:package-selected", update); window.removeEventListener("popstate", update); };
  }, []);

  const choosePackage = (next: PackageId) => {
    setPackageId(next);
    try { sessionStorage.setItem("scrubber-selected-package", JSON.stringify({packageId: next, quantity: PACKAGES[next].quantity, price: PACKAGES[next].price})); } catch { /* storage optional */ }
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (loading || !formRef.current) return;

    const form = formRef.current;

    if (!form.reportValidity()) return;

    const formData = new FormData(form);

    const address = String(formData.get("customer_address") || "").trim();

    // Capture every customer-entered field, including fields added in future.
    // Exclude generated/hidden fields because they appear in the breakdown below.
    const fieldLabels: Record<string, string> = {
      customer_name: "Full name", customer_phone: "Phone / WhatsApp",
      customer_email: "Email", delivery_country: "Country",
      other_country: "Other country", customer_state: "State",
      customer_region: "Region", customer_address: "Full delivery address",
    };
    const extraDetails = Array.from(form.elements)
      .filter((element): element is HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement =>
        element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement)
      .filter((element) => element.name && element.type !== "hidden" && element.type !== "submit" && !element.disabled)
      .filter((element) => !(element instanceof HTMLInputElement && (element.type === "checkbox" || element.type === "radio") && !element.checked))
      .map((element) => {
        const value = String(formData.get(element.name) || "").trim();
        const label = fieldLabels[element.name] || element.name.replace(/_/g, " ");
        return value ? `${label}: ${value}` : null;
      })
      .filter((value): value is string => Boolean(value));

    const message = [
      "🛒 *NEW PRODUCT ORDER — PLEASE CONFIRM*",
      "",
      `📦 Product: ${PRODUCT_NAME}`,
      `🎟️ Package: ${selectedPackage.label}`,
      `🔢 Quantity: ${quantity}`,
      "",
      "*ALL DETAILS ENTERED IN THE FORM*",
      ...extraDetails,
      "",
      "*CONFIRMED DELIVERY DESTINATION*",
      `🌍 Country: ${selectedCountry}`,
      `📍 State/Region: ${selectedRegion}`,
      `🏠 Address: ${address}`,
      "",
      "*ORDER BREAKDOWN*",
      `💵 Original Total: ${formatNaira(originalTotal)}`,
      `🏷️ Package Offer: ${formatNaira(productTotal)}`,
      `💚 You Save: ${formatNaira(totalSaved)}`,
      `📦 Product Total: ${formatNaira(productTotal)}`,
      `🚚 Delivery: FREE`,
      `💰 TOTAL: ${formatNaira(grandTotal)}`,
      "",
      `🎁 Gifts: ${selectedPackage.gifts}`,
      "💳 Payment on Delivery",
      
      "",
      "Please confirm my order and delivery details.",
    ].join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    setWhatsappURL(url);
    setLoading(true);
    setCheckoutStatus("idle");

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    let emailSucceeded = false;

    if (serviceId && templateId && publicKey) {
      try {
        await emailjs.sendForm(
          serviceId,
          templateId,
          form,
          publicKey
        );

        emailSucceeded = true;
      } catch (error) {
        console.error("EmailJS notification failed:", error);
      }
    } else {
      console.warn("EmailJS environment variables are missing.");
    }

    setCheckoutStatus(emailSucceeded ? "email-sent" : "email-failed");
    setLoading(false);
    setShowConfirmation(true);
  };

  return (
    <>
      <ClosingReviews />
      <WarningBeforeForm />
    <section
      id="order-form"
      className="scroll-mt-28 bg-[#f0f0f0] px-4 py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-10 max-w-4xl text-center">
          <p className="mb-3 text-lg font-black uppercase tracking-wide text-red-600">YOUR CLEANING UPGRADE STARTS HERE</p>
          <h2 className="text-[clamp(2.3rem,6vw,5rem)] font-black leading-[1.07] text-black">PLACE YOUR ORDER <span className="text-red-600">NOW!</span></h2>
          <p className="mx-auto mt-5 max-w-3xl text-xl font-extrabold leading-relaxed text-zinc-800 sm:text-2xl">Choose your package. Enter your delivery details. <span className="text-green-700">Pay on Delivery — Free Shipping.</span></p>
          <p className="mt-4 text-lg font-bold text-zinc-700">Select REGULAR, SILVER or GOLD below. Your selected package and total will update automatically.</p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] lg:gap-12">
          {/* LEFT: Product and guarantees */}
          <div className="space-y-6">
            <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
              <div className="bg-black p-6 text-white">
                <p className="text-xs font-bold uppercase tracking-widest text-green-200">
                  Your Selected Product
                </p>

                <h3 className="mt-2 text-2xl font-black">
                  9-in-1 Electric Cleaning Brush
                </h3>

                <p className="mt-2 text-sm text-slate-200">
                  Multi-purpose electric cleaning solution
                </p>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap items-end gap-3">
                  <span className="text-3xl font-black text-black">
                    {formatNaira(productTotal)}
                  </span>
                  <span className="pb-1 text-base text-slate-400 line-through">
                    {formatNaira(originalTotal)}
                  </span>
                </div>

                <p className="mt-2 text-sm font-bold text-emerald-700">
                  Save {formatNaira(totalSaved)} with the {selectedPackage.label} package
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    "9-in-1 electric cleaning brush",
                    "Interchangeable cleaning attachments",
                    "Free gifts according to your selected package",
                    "Free delivery",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckIcon />
                      <span className="text-sm font-medium text-slate-700">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <PackageGallery packageId={packageId} pauseAuto={checkoutStarted} />
                <p className="mt-3 text-center text-sm font-bold text-green-800">{selectedPackage.quantity} scrubber{selectedPackage.quantity > 1 ? "s" : ""} + {selectedPackage.gifts} included in your {selectedPackage.label} package.</p>
              </div>
            </div>

            <div className="space-y-3">
              <TrustCard
                icon="💳"
                title="Pay on Delivery"
                description="No upfront payment. Your payment is collected when your order is delivered."
              />

              <TrustCard
                icon="🚚"
                title="Free Delivery"
                description="Delivery is included in your order price, with no additional shipping fee."
              />

              <TrustCard
                icon="🛡️"
                title="Customer Support"
                description="Contact our team if you have questions about your order or our return terms."
              />

              <TrustCard
                icon="📦"
                title="Inspect Your Package"
                description="Check your package at delivery according to our delivery and inspection policy."
              />
            </div>

            <div className="rounded-2xl border border-sky-100 bg-green-50 p-5">
              <p className="font-bold text-black">
                How your order works
              </p>

              <ol className="mt-3 list-inside list-decimal space-y-2 text-sm leading-6 text-slate-700">
                <li>Enter your contact and delivery information.</li>
                <li>Select Regular, Silver or Gold.</li>
                <li>Review your total and submit your details.</li>
                <li>Send the prepared order message on WhatsApp.</li>
                <li>Our team confirms delivery arrangements with you.</li>
              </ol>
            </div>
          </div>

          {/* RIGHT: Checkout form */}
          <div className="min-w-0 self-start rounded-3xl border border-zinc-200 bg-white p-5 shadow-xl [overflow-anchor:none] sm:p-8">
            <form ref={formRef} onSubmit={handleSubmit} onFocusCapture={() => setCheckoutStarted(true)} onPointerDownCapture={() => setCheckoutStarted(true)}>
              <div className="mb-7">
                <h3 className="text-2xl font-black text-black">
                  Complete Your Order
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Fields marked * are required.
                </p>
              </div>

              {/* Contact information */}
              <div className="mb-8">
                <h4 className="mb-4 border-b border-slate-100 pb-3 text-base font-black text-black">
                  01 — Contact Information
                </h4>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="customer_name"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Full Name *
                    </label>
                    <input
                      id="customer_name"
                      name="customer_name"
                      type="text"
                      autoComplete="name"
                      placeholder="Enter your full name"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="customer_phone"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      id="customer_phone"
                      name="customer_phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="Include country code if outside Nigeria"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="customer_email"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Email Address (Optional)
                    </label>
                    <input
                      id="customer_email"
                      name="customer_email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery information */}
              <div className="mb-8">
                <h4 className="mb-4 border-b border-slate-100 pb-3 text-base font-black text-black">
                  02 — Delivery Information
                </h4>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="delivery_country"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Country *
                    </label>

                    <select
                      id="delivery_country"
                      name="delivery_country"
                      value={country}
                      onChange={(event) => {
                        setCountry(event.target.value);
                        setState("");
                        setRegion("");
                        setOtherCountry("");
                      }}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                    >
                      <option value="Nigeria">Nigeria</option>
                      <option value="Ghana">Ghana</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="South Africa">South Africa</option>
                      <option value="Other">Other Country</option>
                    </select>
                  </div>

                  {country === "Other" && (
                    <div>
                      <label
                        htmlFor="other_country"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Enter Your Country *
                      </label>
                      <input
                        id="other_country"
                        name="other_country"
                        type="text"
                        value={otherCountry}
                        onChange={(event) =>
                          setOtherCountry(event.target.value)
                        }
                        required
                        placeholder="Your country"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                      />
                    </div>
                  )}

                  {country === "Nigeria" ? (
                    <div>
                      <label
                        htmlFor="customer_state"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        State *
                      </label>

                      <select
                        id="customer_state"
                        name="customer_state"
                        value={state}
                        onChange={(event) => setState(event.target.value)}
                        required
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                      >
                        <option value="">Select your state</option>
                        {NIGERIAN_STATES.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label
                        htmlFor="customer_region"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        State / Province / Region *
                      </label>

                      <input
                        id="customer_region"
                        name="customer_region"
                        type="text"
                        value={region}
                        onChange={(event) => setRegion(event.target.value)}
                        required
                        placeholder="Enter your state or region"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                      />
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="customer_address"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Full Delivery Address *
                    </label>
                    <textarea
                      id="customer_address"
                      name="customer_address"
                      rows={3}
                      autoComplete="street-address"
                      placeholder="House number, street, area, city/town and postal code if applicable"
                      required
                      className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                    />
                  </div>

                </div>
              </div>

              {/* Package selection: exact bundle prices, not unit price × quantity */}
              <div className="mb-8">
                <h4 className="mb-4 border-b border-slate-100 pb-3 text-base font-black text-black">03 — Choose Your Package *</h4>
                <div className="grid gap-3 sm:grid-cols-3">
                  {(Object.keys(PACKAGES) as PackageId[]).map((id) => {
                    const p = PACKAGES[id];
                    return <button key={id} type="button" onClick={() => choosePackage(id)} aria-pressed={packageId === id}
                      className={`rounded-2xl border-2 p-3 text-left transition ${packageId === id ? "border-green-600 bg-green-50 shadow-md" : "border-zinc-200 bg-white hover:border-green-300"}`}>
                      <span className="block text-sm font-black text-black">{p.label}</span>
                      <span className="mt-1 block text-xs text-slate-500">{p.quantity} {p.quantity === 1 ? "Scrubber" : "Scrubbers"}</span>
                      <span className="mt-2 block text-xs text-slate-400 line-through">{formatNaira(p.original)}</span>
                      <span className="block text-lg font-black text-green-700">{formatNaira(p.price)}</span>
                    </button>;
                  })}
                </div>
                <p className="mt-3 text-sm font-semibold text-emerald-800">🎁 {selectedPackage.gifts} · FREE DELIVERY · PAY ON DELIVERY</p>
              </div>

              {/* Hidden fields for EmailJS */}
              <input type="hidden" name="selected_package" value={selectedPackage.label} />
              <input type="hidden" name="package_gifts" value={selectedPackage.gifts} />
              <input type="hidden" name="original_total" value={originalTotal.toLocaleString("en-NG")} />
              <input type="hidden" name="selected_country" value={selectedCountry} />
              <input type="hidden" name="selected_region" value={selectedRegion} />
              <input
                type="hidden"
                name="product_name"
                value={PRODUCT_NAME}
              />
              <input
                type="hidden"
                name="order_items"
                value={`${quantity} × ${PRODUCT_NAME}`}
              />
              <input
                type="hidden"
                name="quantity"
                value={quantity}
              />
              <input
                type="hidden"
                name="order_total"
                value={grandTotal.toLocaleString("en-NG")}
              />
              <input
                type="hidden"
                name="total_saved"
                value={totalSaved.toLocaleString("en-NG")}
              />
              <input
                type="hidden"
                name="customer_note"
                value={`${selectedCountry}, ${selectedRegion}`}
              />
              <input
                type="hidden"
                name="payment_method"
                value="Pay on Delivery"
              />
              <input
                type="hidden"
                name="delivery_fee"
                value="FREE"
              />

              {/* Final summary */}
              <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h4 className="mb-5 text-lg font-black text-black">
                  04 — Review Your Order
                </h4>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between gap-4 text-slate-600">
                    <span>Original price — {selectedPackage.label}</span>
                    <span className="text-slate-400 line-through">
                      {formatNaira(originalTotal)}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 text-slate-600">
                    <span>Package offer — {selectedPackage.label}</span>
                    <span className="font-bold text-black">
                      {formatNaira(productTotal)}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-600">Your savings</span>
                    <span className="font-bold text-emerald-700">
                      {formatNaira(totalSaved)}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-600">Delivery fee</span>
                    <span className="font-bold text-emerald-700">
                      FREE
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-600">Free gift</span>
                    <span className="font-bold text-emerald-700">
                      {selectedPackage.gifts}
                    </span>
                  </div>

                  <div className="mt-4 border-t border-slate-200 pt-5">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-red-600">
                          Total to Pay on Delivery
                        </p>
                        <p className="mt-1 text-3xl font-black text-black">
                          {formatNaira(grandTotal)}
                        </p>
                      </div>

                      <span className="rounded-full bg-emerald-100 px-3 py-2 text-xs font-bold text-emerald-800">
                        No Upfront Payment
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guarantee reassurance */}
              <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🛡️</span>
                  <div>
                    <p className="font-black text-emerald-900">
                      Your Purchase Is Protected
                    </p>
                    <p className="mt-1 text-sm leading-6 text-emerald-800">
                      Enjoy our money-back guarantee, free delivery,
                      and payment on delivery. No advance transfer
                      is required.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#101A35] px-5 py-5 text-base font-black text-white shadow-lg transition hover:bg-sky-800 focus:outline-none focus:ring-4 focus:ring-sky-200 disabled:cursor-not-allowed disabled:opacity-60 sm:text-lg"
              >
                {loading ? (
                  "Preparing Your Order..."
                ) : (
                  <>
                    Confirm Order — {formatNaira(grandTotal)}
                    <span aria-hidden="true">→</span>
                  </>
                )}
              </button>

              <p className="mt-4 text-center text-xs leading-6 text-slate-500">
                After submitting, you will be asked to send your
                prepared order message through WhatsApp so our team
                can confirm your delivery.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp support — raised above the mobile order bar */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello, I have a question about the 9-in-1 Electric Cleaning Brush.")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with customer support on WhatsApp"
        title="Chat with us on WhatsApp"
        className="fixed bottom-24 right-4 z-[80] flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-[#25D366] text-2xl font-black text-white shadow-xl transition hover:scale-105 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-green-600 sm:bottom-6 sm:right-6"
      >
        <span aria-hidden="true">✆</span>
      </a>

      {/* Post-submission Thank You page — replaces the old confirmation popup */}
      {showConfirmation && (
        <ThankYouPage
          emailStatus={checkoutStatus}
          whatsappURL={whatsappURL}
          packageName={selectedPackage.label}
          quantity={quantity}
          total={grandTotal}
          gifts={selectedPackage.gifts}
          onReturn={() => setShowConfirmation(false)}
        />
      )}
    </section>
    <section className="bg-white px-4 py-12 text-center" aria-label="Express delivery enquiries">
      <div className="mx-auto max-w-4xl rounded-3xl border-4 border-green-500 bg-black px-5 py-9 text-white sm:px-10">
        <h2 className="text-3xl font-black leading-tight sm:text-5xl">TRAVELLING SOON? OR CAN'T WASTE ANOTHER SECOND CLEANING THE WRONG WAY? NEED IT <span className="text-[#25e744]">EXPRESS?</span></h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg font-semibold leading-relaxed sm:text-2xl">Have an urgent trip or need your Electric Spin Scrubber delivered by a particular date? Speak directly with our customer care representative about express delivery.</p>
        <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello! I need EXPRESS delivery for the 9-in-1 Electric Spin Scrubber. I am travelling soon / need the order urgently. My preferred delivery date is: [PLEASE ENTER DATE]. My delivery city/state is: [PLEASE ENTER LOCATION]. Selected package: ${selectedPackage.label} (${formatNaira(selectedPackage.price)}). Please confirm availability, delivery timing, and the additional express delivery charge.`)}`} target="_blank" rel="noopener noreferrer" className="mt-7 block rounded-xl bg-[#06d525] px-4 py-5 text-lg font-black text-black shadow-lg transition hover:bg-[#24f144] sm:text-2xl">CHAT WITH A REPRESENTATIVE ON WHATSAPP — EXPRESS ORDER</a>
        <p className="mt-5 text-base font-bold text-zinc-200">Express delivery is subject to availability. The representative will confirm the delivery date, delivery cost and any additional express fee before you proceed.</p>
      </div>
    </section>
    <AfterCheckout />
    </>
  );
}