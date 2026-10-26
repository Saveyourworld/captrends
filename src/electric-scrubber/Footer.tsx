
import Modal from "./Modal";

type ModalState = "privacy" | "terms" | null;

interface FooterProps {
  openModal: ModalState;
  setOpenModal: (state: ModalState) => void;
}

const WHATSAPP_NUMBER = "2349064543927";

export default function Footer({
  openModal,
  setOpenModal,
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-800 bg-black text-zinc-200">
      {/* One final, consistent action — no duplicate checkout form */}
      <div className="border-b border-white/15 bg-[#111111]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 text-center md:flex-row md:text-left">
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-[#ff3b3b]">YOUR CLEANER HOME STARTS HERE</p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">
              Ready To Make Cleaning Easier?
            </h2>
            <p className="mt-3 max-w-xl text-base font-medium leading-7 text-zinc-300">
              Choose your Regular, Silver or Gold package above. Pay on delivery and see your included gifts at checkout.
            </p>
          </div>
          <a href="#order-form" className="inline-flex w-full shrink-0 items-center justify-center rounded-xl bg-[#00d81b] px-8 py-5 text-center text-lg font-black text-black shadow-lg shadow-green-900/20 transition hover:bg-[#30ef47] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto">
            CLICK HERE TO ORDER NOW
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-8 pt-14">
        {/* Main footer columns */}
        <div className="grid gap-10 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <a
              href="#"
              className="inline-flex items-center gap-3"
              aria-label="Back to top"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00d81b] text-2xl">
                🧽
              </div>

              <div>
                <p className="text-2xl font-black tracking-tight text-white">
                  9-in-1 Electric Spin Scrubber™
                </p>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#ff4343]">
                  CLEAN SMARTER. LIVE EASIER.
                </p>
              </div>
            </a>

            <p className="mt-5 max-w-md text-sm leading-7 text-zinc-400">
              Clean tiles, bathrooms, floors and tricky corners with less bending and less scrubbing. Explore the packages above and let our team help with your order.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "✓ Pay on Delivery",
                "✓ Free Delivery on Eligible Orders",
                "✓ WhatsApp Customer Support",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-bold text-zinc-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-5 text-base font-black uppercase tracking-wide text-white">
              Quick Links
            </h3>

            <nav aria-label="Footer navigation" className="flex flex-col gap-4 text-sm">
              <a href="#" className="transition hover:text-[#ff4343]">
                Back to Top
              </a>

              <a
                href="#customer-reviews"
                className="transition hover:text-[#ff4343]"
              >
                Customer Reviews
              </a>

              <a
                href="#order-form"
                className="transition hover:text-[#ff4343]"
              >
                Place an Order
              </a>

              <button
                type="button"
                onClick={() => setOpenModal("privacy")}
                className="cursor-pointer text-left transition hover:text-[#ff4343]"
              >
                Privacy Policy
              </button>

              <button
                type="button"
                onClick={() => setOpenModal("terms")}
                className="cursor-pointer text-left transition hover:text-[#ff4343]"
              >
                Terms & Delivery Policy
              </button>
            </nav>
          </div>

          {/* Customer support */}
          <div>
            <h3 className="mb-5 text-base font-black uppercase tracking-wide text-white">
              Customer Support
            </h3>

            <p className="text-sm leading-7 text-zinc-400">
              Have questions about your order, delivery, or product?
              Contact our team on WhatsApp.
            </p>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                "Hello, I have a question about the 9-in-1 Electric Spin Scrubber and its Regular, Silver and Gold packages."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#00d81b] px-5 py-3 font-black text-black transition hover:bg-[#2ef044]"
            >
              <span aria-hidden="true">💬</span>
              Chat on WhatsApp
            </a>

            <p className="mt-4 text-xs leading-6 text-zinc-400">
              Travelling or need express delivery? Message us on WhatsApp to confirm the date, availability and any additional express charges.
            </p>
          </div>
        </div>

        {/* Trust strip */}
        <div className="grid gap-5 border-b border-white/10 py-8 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl" aria-hidden="true">💳</span>
            <div>
              <p className="text-sm font-bold text-white">
                Pay on Delivery
              </p>
              <p className="text-xs text-zinc-400">
                Subject to delivery confirmation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl" aria-hidden="true">🚚</span>
            <div>
              <p className="text-sm font-bold text-white">
                Free Delivery
              </p>
              <p className="text-xs text-zinc-400">
                For eligible delivery locations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl" aria-hidden="true">🛡️</span>
            <div>
              <p className="text-sm font-bold text-white">
                Returns & Refunds
              </p>
              <p className="text-xs text-zinc-400">
                Contact support for refund terms
              </p>
            </div>
          </div>
        </div>

        {/* Legal notice */}
        <div className="border-b border-white/10 py-8 text-xs leading-7 text-zinc-400">
          <p>
            <strong className="text-zinc-200">
              Product Information:
            </strong>{" "}
            Product appearance and included accessories are as
            described on this page. Cleaning results may vary
            depending on the surface, type of dirt, and method of use.
          </p>

          <p className="mt-3">
            <strong className="text-zinc-200">
              Payment and Delivery:
            </strong>{" "}
            Free delivery and payment on delivery apply to eligible
            locations confirmed by our team. For international orders,
            availability, shipping fees, and payment arrangements
            must be confirmed before an order is accepted.
          </p>

          <p className="mt-3">
            <strong className="text-zinc-200">
              Facebook Disclaimer:
            </strong>{" "}
            This independent store is not affiliated with, sponsored by,
            or endorsed by Facebook or Meta Platforms, Inc.
          </p>
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-4 pt-7 text-center text-xs text-zinc-500 sm:flex-row sm:text-left">
          <p>
            © {currentYear} 9-in-1 Electric Spin Scrubber™ Store.
            All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setOpenModal("privacy")}
              className="transition hover:text-white"
            >
              Privacy
            </button>

            <button
              type="button"
              onClick={() => setOpenModal("terms")}
              className="transition hover:text-white"
            >
              Terms
            </button>

            <a
              href="#"
              className="transition hover:text-white"
            >
              Back to Top ↑
            </a>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {openModal === "privacy" && (
        <Modal
          title="Privacy Policy"
          onClose={() => setOpenModal(null)}
        >
          <div className="space-y-5 text-left text-sm leading-7 text-slate-700">
            <section>
              <h4 className="font-black text-slate-900">
                1. Information We Collect
              </h4>
              <p>
                When you place an order, we collect information
                including your name, phone number, optional email
                address, delivery address, country, state or region,
                and order details.
              </p>
            </section>

            <section>
              <h4 className="font-black text-slate-900">
                2. How We Use Your Information
              </h4>
              <p>
                We use your information to process orders,
                communicate with you, confirm delivery details,
                arrange shipping, and provide customer support.
              </p>
            </section>

            <section>
              <h4 className="font-black text-slate-900">
                3. Order Notifications
              </h4>
              <p>
                Our checkout uses EmailJS to send order notifications
                and WhatsApp to prepare customer order messages.
                Details entered in the form may be sent to EmailJS;
                the WhatsApp message is sent only when you choose
                to send it in WhatsApp.
              </p>
            </section>

            <section>
              <h4 className="font-black text-slate-900">
                4. Sharing Information
              </h4>
              <p>
                Delivery details may be shared with logistics
                partners and service providers where necessary
                to fulfil your order.
              </p>
            </section>

            <section>
              <h4 className="font-black text-slate-900">
                5. Customer Enquiries
              </h4>
              <p>
                For privacy-related questions, contact our
                customer support team through the WhatsApp
                link on this website.
              </p>
            </section>
          </div>
        </Modal>
      )}

      {/* Terms & Delivery Modal */}
      {openModal === "terms" && (
        <Modal
          title="Terms, Delivery & Returns"
          onClose={() => setOpenModal(null)}
        >
          <div className="space-y-5 text-left text-sm leading-7 text-slate-700">
            <section>
              <h4 className="font-black text-slate-900">
                1. Product Orders
              </h4>
              <p>
                Orders are placed through the checkout form and
                confirmed through our customer support channels.
                Customers should provide accurate contact and
                delivery information.
              </p>
            </section>

            <section>
              <h4 className="font-black text-slate-900">
                2. Pay on Delivery
              </h4>
              <p>
                Payment on delivery is available for eligible delivery
                locations confirmed by our team. Please confirm
                payment options before placing an international order.
              </p>
            </section>

            <section>
              <h4 className="font-black text-slate-900">
                3. Free Delivery
              </h4>
              <p>
                Free delivery applies to eligible locations confirmed
                by our team. Delivery charges, where applicable,
                and estimated arrival dates will be communicated
                before an order is accepted.
              </p>
            </section>

            <section>
              <h4 className="font-black text-slate-900">
                4. Returns & Refunds
              </h4>
              <p>
                For refund requests, contact our support team with
                your order details. Eligibility, timelines, and
                return requirements should be confirmed with
                our team before purchase. Any advertised
                money-back guarantee is subject to those terms.
              </p>
            </section>

            <section>
              <h4 className="font-black text-slate-900">
                5. Package Inspection
              </h4>
              <p>
                Customers may inspect their delivered package
                in accordance with the delivery and inspection
                arrangements confirmed for their order.
              </p>
            </section>

            <section>
              <h4 className="font-black text-slate-900">
                6. Customer Support
              </h4>
              <p>
                For order updates, delivery questions, returns,
                or refund requests, contact us through the
                WhatsApp support link on this website.
              </p>
            </section>
          </div>
        </Modal>
      )}
    </footer>
  );
}
