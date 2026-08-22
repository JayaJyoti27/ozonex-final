import { createFileRoute } from "@tanstack/react-router";
import worldMap from "@/assets/world-map.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ozonex — Smartest Corporate Travel Management" },
      {
        name: "description",
        content:
          "Ozonex is the all-in-one corporate travel platform for bookings, approvals, expenses and policy — automated end to end.",
      },
      { property: "og:title", content: "Ozonex — Smartest Corporate Travel Management" },
      {
        property: "og:description",
        content:
          "Bookings, approvals, expenses and policy — automated. Teams travel more, spend less, finance closes faster.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// Hardcoded to match Lovable design exactly (local project doesn't define --bronze)
const BRONZE = "#6B4423";
const INK = "#1A1712";

function Index() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden bg-sand font-body text-ink lg:h-screen lg:overflow-hidden">
      <section className="mx-auto flex w-full max-w-[1400px] grow flex-col px-6 py-6 lg:min-h-0 lg:flex-row lg:items-center lg:px-10 lg:py-4">
        <div className="grid w-full items-center gap-8 lg:h-full lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative z-20 max-w-xl">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-1.5 text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-ink/60">
              Intelligent Travel
            </p>
            <h1 className="font-display text-3xl leading-[0.95] font-semibold tracking-tight text-ink sm:text-4xl md:text-5xl lg:text-[3.4rem]">
              Smartest
              <br />
              Corporate Travel
              <br />
              <span style={{ color: BRONZE }}>Management</span> Solution.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink/70 lg:text-base">
              Ozonex is the all-in-one corporate travel platform that handles bookings, approvals,
              expenses, and policy — automatically. So your team travels more, spends less, and
              finance closes faster.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                className="rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-colors"
                style={{ backgroundColor: INK }}
              >
                Book a demo
              </button>
              <button
                className="rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-colors"
                style={{ backgroundColor: BRONZE }}
              >
                Explore platform
              </button>
            </div>

            <dl className="mt-7 grid max-w-md grid-cols-3 gap-4 margin-top-4 border-ink/10 pt-5 sm:gap-6">
              {[
                ["3 min", "Avg. booking time"],
                ["98%", "Policy compliance"],
                ["22%", "Travel spend saved"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="font-display text-xl font-semibold text-ink sm:text-2xl">
                    {value}
                  </dt>
                  <dd className="mt-1 text-xs leading-snug text-ink/60">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mt-8 h-[420px] pt-2 sm:h-[500px] lg:mt-0 lg:h-full lg:pt-8">
            {/* Wavy image panel — full height of the hero section */}
            <svg width="0" height="0" className="absolute" aria-hidden="true">
              <defs>
                <clipPath id="waveEdge" clipPathUnits="objectBoundingBox">
                  <path d="M0.14,0 C0.06,0.25 0.16,0.5 0.10,0.75 C0.07,0.88 0.10,0.94 0.09,1 L1,1 L1,0 Z" />
                </clipPath>
              </defs>
            </svg>
            <div
              className="relative h-full overflow-hidden rounded-[2rem] lg:rounded-l-[3rem] lg:rounded-r-[2rem]"
              style={{ clipPath: "url(#waveEdge)" }}
            >
              <img
                src={worldMap}
                alt="World map with global flight routes"
                width={1000}
                height={800}
                className="relative h-full min-h-[280px] pt-6 lg:min-h-0 lg:pt-8"
              />
              {/* Soft blend into the beige page background */}
              <div
                className="pointer-events-none absolute inset-y-0 left-0 w-1/3"
                style={{
                  background:
                    "linear-gradient(to right, var(--sand) 0%, color-mix(in oklab, var(--sand) 55%, transparent) 45%, transparent 100%)",
                }}
              />
            </div>

            {/* Route arc overlapping the wavy edge */}
            <svg
              viewBox="0 0 600 400"
              className="pointer-events-none absolute top-1/2 left-[6%] z-10 w-[92%] max-w-none -translate-y-1/2"
              aria-hidden="true"
            >
              <path
                d="M40,320 C180,60 420,60 560,220"
                fill="none"
                stroke="var(--sand)"
                strokeWidth="3"
                strokeDasharray="10 12"
                strokeLinecap="round"
                opacity="0.85"
              />
              <circle cx="40" cy="320" r="12" fill={BRONZE} />
              <circle
                cx="40"
                cy="320"
                r="22"
                fill="none"
                stroke="var(--sand)"
                strokeWidth="2"
                opacity="0.6"
              />
              <circle cx="560" cy="220" r="12" fill="var(--ink)" />
              <circle
                cx="560"
                cy="220"
                r="22"
                fill="none"
                stroke="var(--sand)"
                strokeWidth="2"
                opacity="0.6"
              />
            </svg>

            {/* Floating simplified booking card */}
            <div className="absolute bottom-4 left-1/2 z-20 w-[88%] max-w-[19rem] -translate-x-1/2 rounded-3xl border border-ink/10 bg-sand/90 p-4 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)] backdrop-blur-md sm:bottom-8 sm:left-2 sm:w-[19rem] sm:translate-x-0 sm:p-5 lg:bottom-16 lg:left-6">
              <p className="text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-ink/50">
                Simplified booking
              </p>
              <div className="mt-3 flex items-center gap-3 text-sm font-semibold text-ink">
                <span>BLR</span>
                <span className="h-px grow bg-ink/20" />
                <span>SIN</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-ink/60">
                <span>Mon, 24 Aug · 1 traveller</span>
                <span
                  className="rounded-full px-3 py-1 text-[0.65rem] font-semibold text-white"
                  style={{ backgroundColor: INK }}
                >
                  In policy
                </span>
              </div>
              <button
                className="mt-4 w-full rounded-full py-2.5 text-xs font-semibold text-white transition-colors"
                style={{ backgroundColor: INK }}
              >
                Search flights
              </button>
            </div>

            {/* Floating approval chip */}
            <div className="absolute top-4 right-2 z-20 hidden rounded-2xl border border-ink/10 bg-sand/85 px-4 py-3 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.5)] backdrop-blur-md sm:block sm:right-4 lg:top-8">
              <p className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-ink/50">
                Approval
              </p>
              <p className="mt-1 text-sm font-semibold text-ink">Auto-approved in 12s</p>
            </div>

            {/* Floating expense chip */}
            <div
              className="absolute top-1/3 right-2 z-20 hidden -translate-y-1/2 rounded-2xl px-4 py-3 text-white shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)] backdrop-blur-md sm:block sm:right-4 lg:top-1/2 lg:-translate-y-[140%] lg:right-8"
              style={{ backgroundColor: `${INK}E6` }}
            >
              <p className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase opacity-60">
                Expenses
              </p>
              <p className="mt-1 text-sm font-semibold">Receipts auto-matched</p>
            </div>

            {/* Floating duty of care chip */}
            <div className="absolute bottom-20 right-6 z-20 hidden rounded-2xl border border-ink/10 bg-sand/85 px-4 py-3 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.5)] backdrop-blur-md lg:block">
              <p className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-ink/50">
                Duty of care
              </p>
              <p className="mt-1 text-sm font-semibold text-ink">24/7 traveller tracking</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
export { Index as Hero };
