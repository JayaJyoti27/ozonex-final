import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Sections";
import { TornEdge } from "@/components/TornEdge";
import heroImage from "@/assets/b2e-hero.jpg";

export const Route = createFileRoute("/b2e")({
  head: () => ({
    meta: [
      { title: "OZONEX B2E — Smarter Travel for Enterprises" },
      {
        name: "description",
        content:
          "Ozonex B2E connects corporate bookings, approvals, duty of care and spend into one system so policy and budget finally work together.",
      },
      { property: "og:title", content: "OZONEX B2E — Smarter Travel for Enterprises" },
      {
        property: "og:description",
        content:
          "Bookings that stay in policy, approvals that route themselves, and real-time spend visibility for finance teams.",
      },
    ],
  }),
  component: B2EPage,
});

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>(".reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  return ref;
}

const pillars = [
  {
    title: "Employees",
    body: "Book without needing to memorise the policy first — the system only shows what's already allowed.",
  },
  {
    title: "Managers & Approvers",
    body: "Approvals route automatically, and every request comes with the context needed to decide quickly.",
  },
  {
    title: "HR & Administration",
    body: "See duty-of-care information across departments and locations from one place, instead of piecing it together after the fact.",
  },
  {
    title: "Finance",
    body: "Get a live view of what's being spent, in a format that's already structured for the general ledger.",
  },
];

const before = [
  "Employees occasionally book outside policy without realising it",
  "Finance spends hours each month chasing receipts",
  "Approvals happen over email or WhatsApp, with no clear record",
  "Spend is only visible once the trip is over",
  "Policy violations surface weeks later, during reconciliation",
];

const after = [
  "Bookings stay within policy automatically",
  "Expenses are captured as they happen",
  "Approval requests route themselves, with a clear trail",
  "Spend is visible in real time, not after the fact",
  "Anything outside policy simply doesn't show up as an option",
];

const audience = [
  {
    title: "Enterprises & MNCs",
    body: "Multi-entity policies, consolidated reporting, and integration with the systems you already run.",
  },
  {
    title: "HR & Finance Teams",
    body: "Duty-of-care visibility, automated approvals, and expense data that's ready for the books.",
  },
  {
    title: "Growing Businesses",
    body: "The same level of travel control larger companies rely on, sized for where you are today.",
  },
];

function Glyphs() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-6xl text-white/10 md:left-14 md:text-8xl">
        ✦
      </span>
      <span className="absolute right-6 top-1/2 -translate-y-1/2 text-6xl text-white/10 md:right-14 md:text-8xl">
        ✦
      </span>
    </div>
  );
}

function B2EPage() {
  const ref = useReveal();

  return (
    <div ref={ref} className="bg-cream">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink">
        <img
          src={heroImage}
          alt=""
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(28,20,16,0.70)" }} />
        <div className="grid-overlay absolute inset-0" />
        <Glyphs />
        <Nav />
        <div className="relative mx-auto max-w-4xl px-6 pb-32 pt-40 text-center md:pb-40 md:pt-52">
          <p className="eyebrow reveal text-gold">Intelligent Travel for Modern Enterprises</p>
          <h1 className="font-display reveal mt-6 text-4xl text-white md:text-6xl">
            OZONEX B2E — Smarter Travel for Enterprises
          </h1>
          <p className="reveal mx-auto mt-7 max-w-2xl text-base leading-relaxed text-white/75">
            Corporate travel touches more teams than most people realise — employees booking trips,
            managers approving them, HR keeping an eye on wellbeing, finance tracking every rupee.
            Ozonex B2E connects all of it into one system, so a company's travel policy, budget, and
            approval process actually work together instead of living in separate spreadsheets.
          </p>
          <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href="/register" className="pill">
              Book a Demo
            </a>
          </div>
        </div>
        <TornEdge />
      </section>

      {/* Value pillars */}
      <section className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display reveal max-w-3xl text-3xl text-ink md:text-5xl">
            Built Around the People Who Use It
          </h2>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="reveal rounded-sm border border-sand bg-white/60 p-7"
              >
                <h3 className="font-display text-xl text-ink">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-warm">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="bg-cream px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display reveal max-w-3xl text-3xl text-ink md:text-4xl">
            What Changes Once You're on Ozonex B2E
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <div className="reveal rounded-sm border border-sand p-7">
              <div className="eyebrow text-muted-warm">Before</div>
              <ul className="mt-5 space-y-4">
                {before.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-warm">
                    <span aria-hidden="true" className="text-muted-warm">
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal rounded-sm border border-sand bg-white/70 p-7">
              <div className="eyebrow text-brand">After</div>
              <ul className="mt-5 space-y-4">
                {after.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink">
                    <span aria-hidden="true" className="text-brand">
                      ✦
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="bg-cream px-6 pb-24">
        <div className="mx-auto max-w-3xl border-t border-sand pt-16 text-center">
          <h2 className="font-display reveal text-3xl text-ink md:text-4xl">
            Stop Managing Travel. Start Controlling It.
          </h2>
          <p className="reveal mt-6 text-base leading-relaxed text-muted-warm">
            Most companies don't actually have a travel problem — they have a visibility problem.
            When bookings, approvals, and spend all live in one place, finance stops guessing,
            management stops chasing updates, and employees stop wondering what they're allowed to
            book.
          </p>
        </div>
      </section>

      {/* Savings callout */}
      <section id="demo" className="bg-cream px-6 pb-24">
        <div className="mx-auto max-w-5xl rounded-sm border border-sand bg-white/70 p-10 text-center md:p-14">
          <h2 className="font-display reveal text-3xl text-ink md:text-4xl">
            Curious What Your Company Could Save?
          </h2>
          <p className="reveal mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-warm">
            Share your employee count and rough annual travel volume, and we'll walk you through the
            potential savings, compliance improvements, and hours your finance team could get back.
          </p>
          <div className="reveal mt-8">
            <a href="#demo" className="pill">
              Book a Demo
            </a>
          </div>
        </div>
      </section>

      {/* Who It's Built For */}
      <section className="bg-cream px-6 pb-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display reveal max-w-3xl text-3xl text-ink md:text-4xl">
            Who It's Built For
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {audience.map((card) => (
              <div
                key={card.title}
                className="reveal rounded-sm border border-sand bg-white/60 p-7"
              >
                <h3 className="font-display text-xl text-ink">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-warm">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative isolate overflow-hidden bg-ink px-6 py-28 md:py-36">
        <img
          src={heroImage}
          alt=""
          loading="lazy"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(28,20,16,0.72)" }} />
        <div className="grid-overlay absolute inset-0" />
        <Glyphs />
        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="font-display reveal text-3xl text-white md:text-5xl">
            Stop Managing Travel. Start Controlling It.
          </h2>
          <p className="reveal mt-6 text-base leading-relaxed text-white/75">
            Most companies don't actually have a travel problem — they have a visibility problem.
            When bookings, approvals, and spend all live in one place, finance stops guessing,
            management stops chasing updates, and employees stop wondering what they're allowed to
            book.
          </p>
          <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href="/register" className="pill">
              Talk to us
            </a>
          </div>
        </div>
        <TornEdge fill="var(--ink)" />
      </section>

      <Footer />
    </div>
  );
}
