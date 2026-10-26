import { useEffect } from "react";

type Props = {
  emailStatus: "idle" | "email-sent" | "email-failed";
  whatsappURL: string;
  packageName: string;
  quantity: number;
  total: number;
  gifts: string;
  onReturn: () => void;
};

const money = (n: number) => `₦${n.toLocaleString("en-NG")}`;

export default function ThankYouPage({ emailStatus, whatsappURL, packageName, quantity, total, gifts, onReturn }: Props) {
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, []);

  return (
    <div className="fixed inset-0 z-[200] overflow-y-auto bg-[#f4f4f4] text-black" role="dialog" aria-modal="true" aria-labelledby="thank-you-heading">
      <header className="bg-black px-4 py-5 text-center text-white">
        <p className="text-sm font-extrabold tracking-[0.15em] text-[#29e344]">ELECTRIC SPIN SCRUBBER™</p>
        <p className="mt-1 text-sm font-semibold">Your cleaning upgrade starts here</p>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-5 sm:py-10">
        <div className="mb-6">
          <section className="rounded-3xl border-4 border-[#13db3c] bg-black p-6 text-white shadow-xl sm:p-8">
            <p className="text-sm font-black tracking-widest text-[#32ed4a]">ONE IMPORTANT FINAL STEP</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">CLICK HERE TO CONFIRM YOUR ORDER ON WHATSAPP</h2>
            <p className="mt-4 text-base leading-7 text-zinc-200">Every detail you entered, along with your selected package, gifts and total, has been prepared in a WhatsApp message. Tap the green button below, then press <strong>Send</strong> in WhatsApp so our team can confirm your order.</p>
            <a href={whatsappURL} target="_blank" rel="noopener noreferrer" className="mt-7 flex min-h-24 w-full items-center justify-center rounded-2xl border-2 border-white/30 bg-[#13e53e] px-5 py-6 text-center text-xl font-black leading-snug text-black shadow-[0_0_0_5px_rgba(19,229,62,.2)] transition hover:bg-[#42f365] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-2xl">CLICK HERE TO CONFIRM YOUR ORDER ON WHATSAPP →</a>
            <p className="mt-4 text-center text-sm text-zinc-300">No upfront payment for the standard pay-on-delivery order.</p>
          </section>
        </div>
        <section className="rounded-3xl bg-white px-5 py-10 text-center shadow-sm sm:px-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-5xl font-black text-green-700" aria-hidden="true">✓</div>
          <h1 id="thank-you-heading" className="mt-6 text-4xl font-black leading-tight sm:text-6xl">THANK YOU FOR <span className="text-green-600">YOUR ORDER!</span></h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg font-semibold leading-relaxed text-zinc-700 sm:text-2xl">You’ve taken a step toward easier cleaning, less scrubbing and more time for the things that matter.</p>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-600">We have received your order request in this checkout. Please complete the WhatsApp confirmation above so our team can verify your details and arrange delivery.</p>
          {emailStatus === "email-sent" ? <p className="mt-5 text-sm font-semibold text-green-700">Your order notification was sent by email.</p> : <p className="mt-5 text-sm font-semibold text-amber-700">We could not confirm the email notification. Please send your order details through WhatsApp.</p>}
        </section>

        <div className="mt-7">
          <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-black">YOUR ORDER SUMMARY</h2>
            <div className="mt-6 space-y-4 text-base">
              <div className="flex justify-between gap-4 border-b pb-3"><span>Product</span><strong className="text-right">9-in-1 Electric Cleaning Brush</strong></div>
              <div className="flex justify-between gap-4 border-b pb-3"><span>Selected package</span><strong>{packageName}</strong></div>
              <div className="flex justify-between gap-4 border-b pb-3"><span>Scrubbers</span><strong>{quantity}</strong></div>
              <div className="flex justify-between gap-4 border-b pb-3"><span>Included gifts</span><strong className="max-w-[60%] text-right">{gifts}</strong></div>
              <div className="flex justify-between gap-4 border-b pb-3"><span>Standard delivery</span><strong className="text-green-700">FREE</strong></div>
              <div className="flex justify-between gap-4"><span className="font-black">Pay on delivery</span><strong className="text-2xl text-green-700">{money(total)}</strong></div>
            </div>
          </section>

        </div>

        <section className="mt-7 rounded-3xl bg-white p-6 sm:p-8">
          <h2 className="text-center text-3xl font-black">WHAT HAPPENS NEXT?</h2>
          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {[{n:"01",title:"Confirm on WhatsApp",detail:"Send the prepared message with your selected package and delivery details."},{n:"02",title:"We contact you",detail:"Our customer care team reviews your request and confirms delivery arrangements."},{n:"03",title:"Receive your package",detail:"Your order is delivered under the agreed terms. Pay on delivery for eligible standard orders."}].map(s => <div key={s.n} className="rounded-2xl border border-zinc-200 p-5"><span className="text-3xl font-black text-green-600">{s.n}</span><h3 className="mt-3 text-xl font-black">{s.title}</h3><p className="mt-2 leading-7 text-zinc-600">{s.detail}</p></div>)}
          </div>
        </section>

        <section className="mt-7 rounded-3xl border-2 border-dashed border-zinc-300 bg-white p-7 text-center sm:p-10">
          <p className="text-sm font-black uppercase tracking-widest text-green-700">Coming in a future update</p>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">MORE WAYS TO MAKE HOME CARE EASIER</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-7 text-zinc-600">We're preparing a selection of helpful household products and exclusive bundle offers. When they're ready, you'll be able to explore complementary products and upgrade your order right here.</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-zinc-100 p-7"><p className="text-xl font-black">Recommended Add-ons</p><p className="mt-2 text-zinc-600">Future cross-sell products will appear here.</p></div>
            <div className="rounded-2xl bg-zinc-100 p-7"><p className="text-xl font-black">Exclusive Bundle Upgrades</p><p className="mt-2 text-zinc-600">Future upsell packages will appear here.</p></div>
          </div>
        </section>
        <div className="mt-9 text-center"><p className="text-lg font-bold">Need help with your order?</p><a className="mt-4 flex min-h-16 w-full items-center justify-center rounded-xl bg-[#0ed83a] px-6 py-5 text-center text-lg font-black text-black shadow-lg transition hover:bg-[#39f15c] sm:mx-auto sm:max-w-xl sm:text-xl" href="https://wa.me/2349064543927?text=Hello%2C%20I%20need%20help%20with%20my%20Electric%20Spin%20Scrubber%20order." target="_blank" rel="noopener noreferrer">CLICK HERE TO CHAT WITH CUSTOMER CARE →</a><div><button type="button" onClick={onReturn} className="mt-5 px-5 py-3 font-bold text-zinc-600 underline">Return to order form</button></div></div>
      </main>
    </div>
  );
}