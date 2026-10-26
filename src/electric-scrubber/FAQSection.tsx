import { useState } from "react";

/** Place an actual customer-submitted video at public/customer-review.mp4. */
const CUSTOMER_VIDEO = "/electric-scrubber/Electric-Scrubber.mp4";

const faqs = [
  {
    question: "What’s actually inside this?",
    answer: [
      "An electric motor designed to rotate the attached cleaning brush.",
      "Not vibration. Not shaking. Rotational motion that helps you scrub without relying entirely on hand movement.",
    ],
  },
  {
    question: "How does it work?",
    answer: [
      "The brush head spins rapidly and evenly.",
      "That consistent motion helps loosen soap scum, grime, and buildup while you guide the scrubber across the surface.",
    ],
  },
  {
    question: "Why is this different?",
    answer: [
      "Many ordinary cleaning brushes require constant hand scrubbing and pressure.",
      "This scrubber uses a rotating brush head and an extended handle to help you clean with less manual effort.",
    ],
  },
  {
    question: "Why haven’t you heard of it before?",
    answer: [
      "Because most people assume cleaning just has to hurt.",
      "And traditional brushes have dominated shelves for decades.",
      "Innovation in home tools moves slower than innovation in phones.",
      "But that doesn’t mean better doesn’t exist.",
    ],
  },
];

export default function FAQSection() {
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <section id="faq" className="w-full bg-white py-12 sm:py-20 text-black">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="mb-12">
          <div className="mx-auto aspect-video w-full max-w-4xl overflow-hidden rounded-md border-[5px] border-red-600 bg-neutral-100 shadow-lg">
            {!videoFailed ? (
              <video
                controls
                playsInline
                preload="metadata"
                className="h-full w-full object-contain"
                aria-label="Customer video showing the Electric Spin Scrubber"
                onError={() => setVideoFailed(true)}
              >
                <source src={CUSTOMER_VIDEO} type="video/mp4" />
                Your browser does not support video playback.
              </video>
            ) : (
              <div className="flex h-full items-center justify-center px-5 text-center text-sm text-neutral-600">
                Customer video will appear here once you add public/customer-review.mp4.
              </div>
            )}
          </div>
          <h3 className="mt-8 text-2xl font-normal leading-snug sm:text-4xl">
            <strong>WATCH THIS:</strong> Our Customer Sent Us This Video.
          </h3>
          <div className="mt-7 space-y-6 text-xl font-bold leading-relaxed sm:text-3xl">
            <p>But this only works if you stop relying on manual force.</p>
            <p>Because as long as you believe cleaning must be hard.... You’ll keep scrubbing the old way.</p>
            <p>And if you keep scrubbing the old way... Your body keeps paying.</p>
            <p>So if you want the easier outcome.... You need a tool built for power, not pressure.</p>
            <p>That’s exactly why we created the 9-In-1 Rechargeable Electric Spin Scrubber.</p>
          </div>
          <a
            href="#order-form"
            className="mt-10 block rounded-lg bg-[#08d10b] px-4 py-5 text-center text-xl font-extrabold tracking-[0.12em] text-white shadow-md transition hover:bg-green-600 sm:text-3xl"
          >
            Click Here To Order Now
          </a>
        </div>

        <h2 className="mb-10 text-center text-5xl font-black leading-[1.08] tracking-tight sm:text-7xl">
          Let’s Answer The Real Questions.
        </h2>

        <div className="space-y-10 sm:space-y-12">
          {faqs.map(({ question, answer }) => (
            <div key={question} className="text-xl leading-relaxed sm:text-3xl">
              <h3 className="mb-5 font-extrabold">{question}</h3>
              <div className="space-y-5 font-normal">
                {answer.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
