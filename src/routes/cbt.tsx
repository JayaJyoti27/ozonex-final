import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Sections";
import { TornEdge } from "@/components/TornEdge";
import heroImage from "@/assets/cbt-hero.jpg";

export const Route = createFileRoute("/cbt")({
  head: () => ({
    meta: [
      { title: "OZONEX CBT — Control Built into Every Booking" },
      {
        name: "description",
        content:
          "Ozonex CBT moves travel control into the booking itself, so policy is applied upfront, approvers decide with full context, and finance sees spend as it's committed.",
      },
      { property: "og:title", content: "OZONEX CBT — Control Built into Every Booking" },
      {
        property: "og:description",
        content:
          "Policy applied before booking, complete context at approval, and committed spend visible to finance in real time.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CBTPage,
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
    title: "Before Booking",
    body: "Employees only see fares, hotels, and travel options that already fit their policy and budget — no manual checking required on their end.",
  },
  {
    title: "During Approval",
    body: "Approvers get the full picture in one view: who's travelling, the itinerary, the reason for the trip, the cost, and whether it's within policy.",
  },
  {
    title: "After Booking",
    body: "Finance can track committed spend as it happens, with every booking already tagged and sorted for reconciliation.",
  },
];

const before = [
  "Policy violations are caught only after the trip",
  "Approvers work with limited context when deciding",
  "Budget overruns aren't noticed until it's too late",
  "Finance reconciles everything manually at month-end",
  "Compliance depends on someone remembering to check",
];

const after = [
  "Non-compliant options are filtered out before they're ever shown",
  "Approvers see the complete itinerary and cost details upfront",
  "Budgets are checked in real time, during the booking itself",
  "Bookings reach finance already structured and tagged",
  "Policy is applied automatically, not manually enforced",
];

const audience = [
  {
    title: "Finance & Controllership Teams",
    body: "Spend visibility and compliance from the moment a booking is made.",
  },
  {
    title: "Travel & Procurement Managers",
    body: "A policy that enforces itself, instead of one that only exists on paper.",
  },
  {
    title: "Approvers",
    body: "Faster, better-informed decisions on every request.",
  },
  {
    title: "Employees",
    body: "A booking process with no policy guesswork involved.",
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

function CBTPage() {
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
          <p className="eyebrow reveal text-gold">Corporate Booking Tool</p>
          <h1 className="font-display reveal mt-6 text-4xl text-white md:text-6xl">
            OZONEX CBT — Control Built into Every Booking
          </h1>
          <p className="reveal mx-auto mt-7 max-w-2xl text-base leading-relaxed text-white/75">
            Most companies find out about a policy violation after the trip is already booked — when
            there's nothing left to do but note it down. Ozonex CBT moves that control earlier, into
            the booking itself, so employees book with confidence, approvers decide with full
            information, and finance can see spend as it's committed, not after the fact.
          </p>
          <div className="reveal mt-10 flex items-center justify-center">
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
            Control From Request to Reconciliation
          </h2>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
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
            What Changes Once You're on Ozonex CBT
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

      {/* Who It's Built For */}
      <section className="bg-cream px-6 pb-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display reveal max-w-3xl text-3xl text-ink md:text-4xl">
            Who It's Built For
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
      <section id="demo" className="relative isolate overflow-hidden bg-ink px-6 py-28 md:py-36">
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
            Control Built into Every Booking
          </h2>
          <p className="reveal mt-6 text-base leading-relaxed text-white/75">
            Ozonex CBT moves control earlier, into the booking itself, so employees book with
            confidence, approvers decide with full information, and finance can see spend as it's
            committed, not after the fact.
          </p>
          <div className="reveal mt-10 flex items-center justify-center">
            <a href="/register" className="pill">
              Let`s Talk
            </a>
          </div>
        </div>
        <TornEdge fill="var(--ink)" />
      </section>

      <Footer />
    </div>
  );
}
