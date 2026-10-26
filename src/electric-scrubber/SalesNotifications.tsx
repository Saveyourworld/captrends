import { useEffect, useState } from "react";

type Order = { name: string; state: string; pieces: 1 | 2 | 3 };

// DEMONSTRATION DATA ONLY. Replace with confirmed orders before publishing
// notifications as real purchases.
const sampleOrders: Order[] = [
  { name: "James", state: "Lagos", pieces: 1 },
  { name: "Adanna", state: "Enugu", pieces: 2 },
  { name: "Obi Uche", state: "Anambra", pieces: 3 },
  { name: "Musa", state: "Kano", pieces: 1 },
  { name: "Raphael", state: "Rivers", pieces: 2 },
  { name: "Maguchi", state: "Kaduna", pieces: 3 },
  { name: "Abuchi", state: "Imo", pieces: 2 },
  { name: "Margaret", state: "Oyo", pieces: 1 },
  { name: "Uchenna", state: "Abia", pieces: 3 },
  { name: "Tanko", state: "Sokoto", pieces: 2 },
  { name: "Abigail", state: "Ogun", pieces: 1 },
  { name: "Janet", state: "Plateau", pieces: 3 },
  { name: "Musa", state: "Zamfara", pieces: 2 },
  { name: "Abubakar", state: "Katsina", pieces: 3 },
  { name: "Loveth", state: "Akwa Ibom", pieces: 1 },
  { name: "Okun", state: "Edo", pieces: 2 },
  { name: "Hamzat", state: "Kwara", pieces: 3 },
  { name: "Ibel", state: "Benue", pieces: 1 },
  { name: "Obed", state: "Nasarawa", pieces: 2 },
  { name: "Eli", state: "Bauchi", pieces: 1 },
  { name: "Margaret", state: "Delta", pieces: 3 },
  { name: "Grace", state: "Ondo", pieces: 2 },
  { name: "Nzonu", state: "Ebonyi", pieces: 1 },
  { name: "Pele", state: "Cross River", pieces: 3 },
];

const FIRST_DELAY_MS = 2500;
const DISPLAY_MS = 3900;
const GAP_MS = 2300;

export default function SalesNotifications() {
  const [index, setIndex] = useState<number | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    let hideTimer: ReturnType<typeof setTimeout> | undefined;
    let nextTimer: ReturnType<typeof setTimeout> | undefined;
    let count = 0;
    const show = () => {
      setIndex(count % sampleOrders.length);
      count += 1;
      hideTimer = setTimeout(() => {
        setIndex(null);
        nextTimer = setTimeout(show, GAP_MS);
      }, DISPLAY_MS);
    };
    nextTimer = setTimeout(show, FIRST_DELAY_MS);
    return () => {
      if (hideTimer) clearTimeout(hideTimer);
      if (nextTimer) clearTimeout(nextTimer);
    };
  }, [dismissed]);

  const order = index === null ? null : sampleOrders[index];
  if (dismissed) return null;

  return (
    <div aria-live="polite" aria-atomic="true" className="pointer-events-none fixed bottom-4 left-3 z-[9999] w-[min(330px,calc(100vw-24px))] sm:bottom-5 sm:left-5">
      {order && (
        <div className="pointer-events-auto relative rounded-xl border border-green-200 bg-white p-3 pr-9 shadow-xl" role="status">
          <button type="button" aria-label="Dismiss notifications" onClick={() => setDismissed(true)} className="absolute right-2 top-1 text-xl leading-none text-gray-500 hover:text-black">×</button>
          <div className="flex items-start gap-2">
            <span className="text-xl" aria-hidden="true">🎉</span>
            <div className="min-w-0">
              <p className="text-sm font-bold leading-5 text-gray-900">{order.name} from {order.state}</p>
              <p className="text-xs leading-5 text-gray-700">Just ordered {order.pieces} {order.pieces === 1 ? "piece" : "pieces"} of Electric Spin Scrubber™ 🥳</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-green-700">Verified order</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}