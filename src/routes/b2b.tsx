import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Sections";
import { TornEdge } from "@/components/TornEdge";
import heroImage from "@/assets/b2b-hero.jpg";

export const Route = createFileRoute("/b2b")({
  head: () => ({
    meta: [
      { title: "OZONEX B2B — Empowering Travel Partners" },
      {
        name: "description",
        content:
          "Ozonex B2B brings flights, hotels, buses, cabs, visa support and insurance into one dashboard for travel agencies ready to grow.",
      },
      { property: "og:title", content: "OZONEX B2B — Empowering Travel Partners" },
      {
        property: "og:description",
        content:
          "One login, every product. Instant ticketing, clear commissions and dedicated partner support for travel agencies.",
      },
    ],
  }),
  component: B2BPage,
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
    title: "More Possibilities",
    body: "Flights, hotels, buses, cabs, visa support, and travel insurance are all available from one dashboard. No separate logins, no switching between supplier sites mid-booking.",
  },
  {
    title: "Better Service",
    body: "Confirmations come through instantly, changes can be made without back-and-forth, and there's a support team on hand whenever a customer needs an answer fast.",
  },
  {
    title: "Stronger Growth",
    body: "Fair net fares and commission structures that are easy to understand mean agencies know exactly what they're earning on every sale — and can plan their growth around it.",
  },
];

const before = [
  "Logging into several supplier portals just to check one itinerary",
  "Comparing fares by hand across different websites",
  "Waiting on confirmations, then following up again",
  "Guessing at commission payouts",
  "Chasing suppliers for post-booking fixes",
];

const after = [
  "One login, every product",
  "Fares compared side by side in a single search",
  "Bookings and tickets confirmed instantly",
  "Commission and transaction reports laid out clearly",
  "A dedicated support team handling post-booking issues directly",
];

const included = [
  "Search across flights, hotels, and ground transport in one go",
  "Instant booking and ticketing",
  "Self-service rescheduling and cancellations",
  "Several secure payment options, tied to a single wallet",
  "Reports that break down bookings, transactions, and commissions",
  "Regional partner support that actually knows the market",
];

const audience = [
  {
    title: "Independent Travel Agents",
    body: "Get the booking tools a large agency would use, without the overhead that usually comes with them.",
  },
  {
    title: "Travel Agencies & Consolidators",
    body: "Handle multiple customers, bookings, and payouts from a single dashboard instead of several.",
  },
  {
    title: "Corporate Travel Resellers",
    body: "Offer your corporate clients the same reliability Ozonex delivers to enterprises directly.",
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

function B2BPage() {
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
          <p className="eyebrow reveal text-gold">
            A B2B Travel Platform Built for Agencies Ready to Grow
          </p>
          <h1 className="font-display reveal mt-6 text-4xl text-white md:text-6xl">
            OZONEX B2B — Empowering Travel Partners
          </h1>
          <p className="reveal mx-auto mt-7 max-w-2xl text-base leading-relaxed text-white/75">
            Running a travel agency means juggling a lot — supplier logins, fare comparisons,
            customer follow-ups, and the paperwork that comes after every booking. Ozonex B2B brings
            all of that into one place. From searching for the right fare to closing out a
            customer's post-trip request, agencies get a single system that keeps things moving.
          </p>
          <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href="/register" className="pill">
              Become a Partner
            </a>
          </div>
        </div>
        <TornEdge />
      </section>

      {/* Value pillars */}
      <section className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display reveal max-w-3xl text-3xl text-ink md:text-5xl">
            More Possibilities. Better Service. Stronger Growth.
          </h2>
          <p className="reveal mt-5 max-w-2xl text-base leading-relaxed text-muted-warm">
            When agencies aren't stuck stitching together five different tools, they can actually
            focus on their customers — and on growing the business.
          </p>
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
            What Changes Once You're on Ozonex B2B
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

      {/* What's Included */}
      <section id="included" className="bg-cream px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display reveal max-w-3xl text-3xl text-ink md:text-4xl">
            What's Included on the Platform
          </h2>
          <div className="mt-12 grid gap-x-10 gap-y-6 md:grid-cols-2">
            {included.map((item) => (
              <div
                key={item}
                className="reveal flex gap-3 border-b border-sand pb-5 text-sm leading-relaxed text-muted-warm"
              >
                <span aria-hidden="true" className="text-brand">
                  ✦
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's Built For */}
      <section id="audience" className="bg-cream px-6 pb-28">
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
      <section id="partner" className="relative isolate overflow-hidden bg-ink px-6 py-28 md:py-36">
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
            More Possibilities. Better Service. Stronger Growth.
          </h2>
          <p className="reveal mt-6 text-base leading-relaxed text-white/75">
            When agencies aren't stuck stitching together five different tools, they can actually
            focus on their customers — and on growing the business.
          </p>
          <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href="/register" className="pill">
              Let`s Connect
            </a>
          </div>
        </div>
        <TornEdge fill="var(--ink)" />
      </section>

      <Footer />
    </div>
  );
}
