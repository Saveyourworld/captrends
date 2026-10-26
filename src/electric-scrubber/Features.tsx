import type { ReactNode } from "react";

/**
 * Sales-focused Features section, based on the supplied reference screenshots.
 * Place AFTER CustomerReviews in App.tsx. Does not alter HeroSection or checkout.
 * Required images: public/feature-images/cleaning-comparison.jpg,
 * public/feature-images/adjustable-speeds.jpg,
 * public/feature-images/extension-handle.jpg
 */

const ORDER_TARGET = "#order-form";

function OrderCTA() {
  return (
    <div className="mx-auto my-10 w-full max-w-[720px] sm:my-12">
      <a
        href={ORDER_TARGET}
        className="flex min-h-[72px] w-full items-center justify-center rounded-[9px] bg-[#00d416] px-5 py-5 text-center text-[19px] font-extrabold tracking-[0.12em] text-white transition-colors hover:bg-[#00b914] focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-green-700 sm:text-[25px]"
      >
        Click Here To Order Now
      </a>
      <p className="mt-5 text-center text-[16px] font-extrabold leading-relaxed text-[#353535] sm:text-[21px]">
        ORDER Before 11:59pm &amp; <span className="underline underline-offset-2">Get Free Gift + Free Shipping</span>
      </p>
    </div>
  );
}

function SalesHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mx-auto mb-10 max-w-[1050px] text-center text-[clamp(2.25rem,5.2vw,4.4rem)] font-black leading-[1.18] tracking-[-0.025em] text-black sm:mb-12">
      {children}
    </h2>
  );
}

function SalesCopy({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-[980px] space-y-7 text-[clamp(1.2rem,2.5vw,1.9rem)] font-semibold leading-[1.5] text-black sm:space-y-9">
      {children}
    </div>
  );
}

function FeatureImage({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="mx-auto my-12 w-full max-w-[920px] sm:my-16">
      <img src={src} alt={alt} loading="lazy" decoding="async" className="block h-auto w-full object-contain" />
    </figure>
  );
}

export default function Features() {
  return (
    <section id="product-benefits" className="w-full bg-white px-5 pb-20 pt-14 font-sans text-black sm:px-8 sm:pt-20">
      <div className="mx-auto max-w-[1100px]">
        <SalesHeading>
          Stop Destroying Your Back Every Time You Clean — There’s A Smarter Way
        </SalesHeading>
        <SalesCopy>
          <p>Why are hotel bathrooms spotless in minutes... while yours takes hours and still feels unfinished?</p>
          <p>And what if the difference isn’t effort... but the tool?</p>
          <p>If you replace manual scrubbing with powered rotation...</p>
          <p>You can make your bathroom cleaning routine faster and easier.</p>
          <p>Without so much bending. Without so much kneeling. Without exhausting yourself just to tackle stubborn dirt.</p>
        </SalesCopy>

        <FeatureImage
          src="/electric-scrubber/feature-images/cleaning-comparison.jpg"
          alt="Visual comparison of cleaning with a long-handled electric scrubber and manual scrubbing"
        />
        <FeatureImage
          src="/electric-scrubber/feature-images/adjustable-speeds.jpg"
          alt="Reference illustration of electric scrubber cleaning modes and applications"
        />
        <FeatureImage
          src="/electric-scrubber/feature-images/extension-handle.jpg"
          alt="Illustration of the electric spin scrubber detachable and extendable handle"
        />
        <SalesHeading>Your Back Isn’t The Problem — Your Cleaning Tool Is</SalesHeading>
        <SalesCopy>
          <p>Right now, most people clean the same way their parents did.</p>
          <p>Short brushes. Tiny sponges. Elbow grease.</p>
          <p>Because they believe cleaning is supposed to be hard.</p>
          <p>But here’s what’s really happening.</p>
          <p>Manual cleaning depends on pressure.</p>
          <p>Pressure depends on your body.</p>
          <p>And your body absorbs the strain.</p>
          <p>So after years of bending over tiles...</p>
          <p>Kneeling on hard floors...</p>
          <p>Twisting into corners...</p>
          <p>Your back starts paying the price.</p>
          <p>That’s the real problem.</p>
          <p>Not dirt. Outdated tools.</p>
          <p>And because of that... Cleaning becomes exhausting.</p>
          <p>Something you delay. Something you dread.</p>
          <p>Until guests are coming. Until the stains look obvious.</p>
          <p>Until your body reminds you again. So if the tool is causing the strain...</p>
          <p>What happens when the tool changes?</p>
        </SalesCopy>
        <OrderCTA />
        <SalesHeading>10x Your Cleaning In Less Time With Electric SpinScrubber™</SalesHeading>
        <SalesCopy>
          <p>Here’s how the transformation works.</p>
          <p><strong>Step 1.</strong></p>
          <p>You attach the brush head.</p>
          <p><strong>Step 2.</strong></p>
          <p>You press one button.</p>
          <p><strong>Step 3.</strong></p>
          <p>The high-speed rotating motor helps break apart grime while you guide it lightly.</p>
          <p>Because grime responds better to motion than muscle.</p>
          <p>So instead of pushing down with your body weight...</p>
          <p>The motor does the hard work.</p>
          <p>Which means less strain.</p>
          <p>Which means faster results.</p>
          <p>Which means better outcomes with less effort.</p>
          <p>That’s the process.</p>
        </SalesCopy>
        <OrderCTA />

        <div className="mx-auto my-12 max-w-[900px] rounded-xl bg-[#f5f8fa] p-4 sm:p-8">
          <img
            src="/electric-scrubber/scrub.webp"
            alt="Electric Spin Scrubber product and cleaning attachments"
            loading="lazy"
            decoding="async"
            className="mx-auto block h-auto max-h-[620px] w-full object-contain"
          />
          <p className="mt-4 text-center text-sm font-medium text-slate-600">
            see how this electric spin scrubber can transform your life with it's dynamic technology.
          </p>
        </div>

        <SalesHeading>
          Spin-Scrubber™ Protect You, Your Privacy, Family, Lifestyle &amp; Your Time... Even When You're The Busiest Person!
        </SalesHeading>
        <SalesCopy>
          <p>If you can clean faster... You get your weekends back.</p>
          <p>If you can clean with less strain... You can make everyday cleaning more comfortable.</p>
          <p>If your bathroom looks professionally cleaned every week... You never panic when someone stops by.</p>
          <p>And that changes how you feel in your own home.</p>
          <p>You feel prepared. In control. Proud.</p>
          <p>Not behind. Not overwhelmed. Not sore.</p>
        </SalesCopy>
        <OrderCTA />
      </div>
    </section>
  );
}
