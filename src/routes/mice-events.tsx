import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "@/components/Nav";
import { ScrollLineV } from "@/components/ScrollLineV";
import { Footer } from "@/components/Sections";
import { TornEdge } from "@/components/TornEdge";

import heroImg from "@/assets/mice-hero-stage.jpg";
import scaleImg from "@/assets/mice-scale-aerial.jpg";
import corpImg from "@/assets/mice-corporate.jpg";
import confImg from "@/assets/mice-conferences.jpg";
import incImg from "@/assets/mice-incentive.jpg";
import grpImg from "@/assets/mice-group.jpg";
import s1 from "@/assets/mice-step1.jpg";
import s2 from "@/assets/mice-step2.jpg";
import s3 from "@/assets/mice-step3.jpg";
import s4 from "@/assets/mice-step4.jpg";
import s5 from "@/assets/mice-step5.jpg";
import t1 from "@/assets/mice-tile1.jpg";
import t2 from "@/assets/mice-tile2.jpg";
import t3 from "@/assets/mice-tile3.jpg";
import t4 from "@/assets/mice-tile4.jpg";
import t5 from "@/assets/mice-tile5.jpg";
import t6 from "@/assets/mice-tile6.jpg";
import whyImg from "@/assets/mice-why.jpg";
import ctaImg from "@/assets/mice-cta.jpg";

gsap.registerPlugin(ScrollTrigger);

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Ozonex MICE & Events",
  provider: { "@type": "Organization", name: "Ozonex" },
  description:
    "Corporate MICE travel management — conferences, incentive travel, group bookings, and event logistics on one platform.",
  areaServed: ["IN", "AE", "Global"],
  url: "https://ozonex.com/mice-events",
};

export const Route = createFileRoute("/mice-events")({
  head: () => ({
    meta: [
      { title: "MICE & Corporate Event Travel Management | Ozonex" },
      {
        name: "description",
        content:
          "Ozonex manages end-to-end MICE travel logistics — corporate events, conferences, incentive travel, and group movement. One platform from delegate onboarding to post-event reconciliation.",
      },
      { property: "og:title", content: "MICE & Corporate Event Travel Management | Ozonex" },
      {
        property: "og:description",
        content:
          "End-to-end MICE travel logistics on a single platform — conferences, incentive travel, group bookings, event ops.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/mice-events" },
    ],
    links: [{ rel: "canonical", href: "https://ozonex.com/mice-events" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(schema) }],
  }),
  component: MicePage,
});

/* ---------------- helpers ---------------- */

function Words({
  text,
  className,
  style,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const inners = ref.current.querySelectorAll(".word-inner");
    gsap.fromTo(
      inners,
      { yPercent: 110 },
      {
        yPercent: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      },
    );
  }, []);
  return (
    <h2 ref={ref} className={className} style={style}>
      {text.split(/(\s+)/).map((w, i) =>
        /\s+/.test(w) ? (
          <span key={i}>{w}</span>
        ) : (
          <span key={i} className="word-wrap">
            <span className="word-inner">{w}</span>
          </span>
        ),
      )}
    </h2>
  );
}

function CountUp({
  to,
  suffix = "",
  className,
  style,
}: {
  to: number;
  suffix?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const obj = { v: 0 };
    const tw = gsap.to(obj, {
      v: to,
      duration: 1.6,
      ease: "power2.out",
      onUpdate: () => {
        if (ref.current) ref.current.textContent = Math.round(obj.v).toLocaleString() + suffix;
      },
      scrollTrigger: { trigger: ref.current, start: "top 85%" },
    });
    return () => {
      tw.kill();
    };
  }, [to, suffix]);
  return (
    <span ref={ref} className={className} style={style}>
      0{suffix}
    </span>
  );
}

/* ---------------- page ---------------- */

function MicePage() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div style={{ background: "var(--cream)" }}>
      <Nav />
      <ScrollLineV />
      <Hero />
      <ScaleStatement />
      <CorporateBlock />
      <ConferencesBlock />
      <IncentiveBlock />
      <GroupBlock />
      <ProcessSection />
      <CapabilitiesScroll />
      <EventTypesGrid />
      <WhyMice />
      <CTA />
      <Footer />
    </div>
  );
}

/* ---------------- 1. HERO ---------------- */
function Hero() {
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (eyebrowRef.current) {
      gsap.fromTo(
        eyebrowRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
        },
      );
    }

    if (subRef.current) {
      gsap.fromTo(
        subRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay: 0.7,
          stagger: 0.12,
          ease: "power2.out",
        },
      );
    }
  }, []);

  const pills = [
    "CORPORATE EVENTS",
    "CONFERENCES & EXHIBITIONS",
    "INCENTIVE TRAVEL",
    "GROUP TRAVEL MANAGEMENT",
  ];

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        minHeight: "100vh",
        background: "#1C1410",
      }}
    >
      {/* Background Image */}
      <img
        src={heroImg}
        alt="Corporate conference main stage"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(rgba(28,20,16,0.55) 0%, rgba(28,20,16,0.82) 100%)",
          zIndex: 1,
        }}
      />

      {/* Decorative Stars */}
      <div
        className="absolute left-4 md:left-10 lg:left-12 top-1/2 -translate-y-1/2 text-white/30"
        style={{
          zIndex: 2,
          fontSize: "clamp(18px, 2vw, 28px)",
        }}
      >
        ✦
      </div>

      <div
        className="absolute right-4 md:right-10 lg:right-12 top-1/2 -translate-y-1/2 text-white/30"
        style={{
          zIndex: 2,
          fontSize: "clamp(18px, 2vw, 28px)",
        }}
      >
        ✦
      </div>

      {/* Main Content */}
      <div
        className="relative w-full text-center"
        style={{
          zIndex: 3,
          maxWidth: "1440px",
          padding: "0 clamp(20px, 5vw, 80px)",
        }}
      >
        {/* Eyebrow */}
        <div
          ref={eyebrowRef}
          style={{
            color: "#3B82F6",
            opacity: 0.95,
            letterSpacing: "0.22em",
            marginBottom: "20px",
            fontSize: "12px",
            textTransform: "uppercase",
          }}
        >
          MICE & EVENTS
        </div>

        {/* Heading */}
        <Words
          text="RUN YOUR NEXT EVENT WITHOUT THE CHAOS."
          className="font-display text-white"
          style={{
            fontSize: "clamp(38px, 9vw, 100px)",
            lineHeight: 0.9,
            fontWeight: 300,
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        />

        {/* Sub Content */}
        <div ref={subRef}>
          {/* Paragraph */}
          <p
            className="mx-auto"
            style={{
              fontSize: "clamp(14px, 2vw, 17px)",
              color: "rgba(255,255,255,0.72)",
              maxWidth: "760px",
              lineHeight: 1.85,
              marginTop: "28px",
            }}
          >
            From 50-person offsites to 5,000-delegate global conferences,
            Ozonex manages every logistical layer — travel, accommodation,
            ground movement, and event operations — in one coordinated
            platform.
          </p>

          {/* Pills */}
          <div
            className="flex flex-wrap justify-center"
            style={{
              gap: "12px",
              marginTop: "42px",
            }}
          >
            {pills.map((p) => (
              <span
                key={p}
                className="transition-all duration-300"
                style={{
                  border: "1px solid rgba(255,255,255,0.18)",
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "999px",
                  padding: "10px 18px",
                  color: "#fff",
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  textAlign: "center",
                  width: "fit-content",
                  maxWidth: "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#3B82F6";
                  e.currentTarget.style.background =
                    "rgba(37,99,235,0.14)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(255,255,255,0.18)";
                  e.currentTarget.style.background =
                    "rgba(255,255,255,0.06)";
                }}
              >
                {p}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div style={{ marginTop: "38px" }}>
            <a
              href="#cta"
              className="inline-block transition-colors duration-300"
              style={{
                color: "#3B82F6",
                fontSize: "12px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#3B82F6";
              }}
            >
              PLAN YOUR NEXT EVENT →
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Torn Edge */}
      <TornEdge fill="#F5F0EA" position="bottom" />
    </section>
  );
}



/* ---------------- 2. SCALE STATEMENT ---------------- */


function ScaleStatement() {
  const headRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headRef.current) {
      gsap.fromTo(
        headRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headRef.current,
            start: "top 78%",
          },
        },
      );
    }

    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current.children,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 78%",
          },
        },
      );
    }
  }, []);

  const stats = [
    { n: "5,000+", l: "DELEGATES MANAGED SIMULTANEOUSLY" },
    { n: "48 hrs", l: "AVERAGE EVENT SETUP TIME ON PLATFORM" },
    { n: "Zero", l: "MANUAL ITINERARY DISTRIBUTION" },
    { n: "1 screen", l: "COMPLETE EVENT OVERSIGHT FOR OPS TEAM" },
  ];

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "#1C1410",
        minHeight: "90vh",
      }}
    >
      {/* Top Torn Edge */}
      <TornEdge fill="#1C1410" position="top" />

      {/* Background Image */}
      <img
        src={scaleImg}
        alt="Outdoor corporate event aerial"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(28,20,16,0.92) 35%, rgba(28,20,16,0.45) 100%)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        className="relative grid grid-cols-1 lg:grid-cols-12 items-end"
        style={{
          zIndex: 2,
          gap: "clamp(40px, 6vw, 80px)",
          minHeight: "90vh",
          padding:
            "clamp(80px, 10vw, 140px) clamp(20px, 5vw, 80px)",
        }}
      >
        {/* Left Content */}
        <div ref={headRef} className="lg:col-span-7">
          <h2
            className="font-display text-white"
            style={{
              fontSize: "clamp(40px, 8vw, 96px)",
              lineHeight: 0.9,
              fontWeight: 300,
              maxWidth: "900px",
            }}
          >
            EVENTS THAT
            <br />
            MOVE PEOPLE.
            <br />
            AND BUSINESSES.
          </h2>

          <p
            style={{
              color: "rgba(255,255,255,0.68)",
              maxWidth: "560px",
              lineHeight: 1.9,
              marginTop: "30px",
              fontSize: "clamp(14px, 2vw, 16px)",
            }}
          >
            The best corporate events are not just logistical
            achievements. They are moments that shift culture,
            reward performance, and demonstrate what an organisation
            truly values. Ozonex makes the logistics invisible —
            so the experience is all that anyone remembers.
          </p>
        </div>

        {/* Right Stats */}
        <div
          ref={statsRef}
          className="lg:col-span-5 flex flex-col"
          style={{
            gap: "clamp(28px, 4vw, 48px)",
            alignItems: "flex-start",
          }}
        >
          {stats.map((s) => (
            <div
              key={s.l}
              className="w-full lg:text-right"
            >
              <div
                className="font-display text-white"
                style={{
                  fontSize: "clamp(38px, 7vw, 72px)",
                  lineHeight: 1,
                  fontWeight: 300,
                }}
              >
                {s.n}
              </div>

              <div
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "clamp(11px, 1vw, 13px)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginTop: "10px",
                  lineHeight: 1.6,
                  maxWidth: "320px",
                  marginLeft: "auto",
                }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Torn Edge */}
      <TornEdge fill="#F5F0EA" position="bottom" />
    </section>
  );
}



/* ---------------- 3. FOUR EVENT VERTICALS ---------------- */

function EditorialBlock({
  id,
  dark,
  photoLeft,
  photo,
  eyebrow,
  title,
  body,
  children,
}: {
  id: string;
  dark?: boolean;
  photoLeft: boolean;
  photo: string;
  eyebrow: string;
  title: React.ReactNode;
  body: string;
  children?: React.ReactNode;
}) {
  const photoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (photoRef.current) {
      gsap.fromTo(
        photoRef.current,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: photoRef.current,
            start: "top 78%",
          },
        },
      );
    }

    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.querySelectorAll("[data-stagger]"),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 78%",
          },
        },
      );
    }
  }, []);

  const bg = dark ? "#1C1410" : "#F5F0EA";
  const fg = dark ? "#fff" : "var(--ink)";
  const muted = dark
    ? "rgba(255,255,255,0.68)"
    : "#6B6258";

  return (
    <section
      id={id}
      className={`relative overflow-hidden ${
        dark ? "grid-overlay" : ""
      }`}
      style={{
        background: bg,
      }}
    >
      {dark && (
        <TornEdge fill="#1C1410" position="top" />
      )}

      <div
        className="grid grid-cols-1 lg:grid-cols-2"
        style={{
          minHeight: "80vh",
        }}
      >
        {/* Image */}
        <div
          ref={photoRef}
          className={`relative ${
            photoLeft ? "lg:order-1" : "lg:order-2"
          }`}
          style={{
            minHeight: "clamp(320px, 50vw, 700px)",
          }}
        >
          <img
            src={photo}
            alt={eyebrow}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div
          ref={contentRef}
          className={`flex flex-col justify-center ${
            photoLeft ? "lg:order-2" : "lg:order-1"
          }`}
          style={{
            padding:
              "clamp(60px, 8vw, 120px) clamp(20px, 5vw, 80px)",
          }}
        >
          {/* Eyebrow */}
          <div
            data-stagger
            style={{
              color: "#2563EB",
              letterSpacing: "0.18em",
              fontSize: "12px",
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </div>

          {/* Title */}
          <div
            data-stagger
            className="font-display"
            style={{
              color: fg,
              fontSize: "clamp(34px, 6vw, 64px)",
              lineHeight: 0.92,
              fontWeight: 300,
              marginTop: "22px",
            }}
          >
            {title}
          </div>

          {/* Body */}
          <p
            data-stagger
            style={{
              color: muted,
              fontSize: "clamp(14px, 2vw, 16px)",
              lineHeight: 1.9,
              maxWidth: "560px",
              marginTop: "28px",
            }}
          >
            {body}
          </p>

          {/* Children */}
          {children && (
            <div
              data-stagger
              style={{
                marginTop: "38px",
              }}
            >
              {children}
            </div>
          )}
        </div>
      </div>

      {dark && (
        <TornEdge fill="#F5F0EA" position="bottom" />
      )}
    </section>
  );
}

/* =========================================
   CORPORATE BLOCK
========================================= */

function CorporateBlock() {
  const rows = [
    [
      "Multi-venue coordination",
      "Simultaneous management of multiple sites",
    ],
    [
      "Delegate travel booking",
      "Policy-compliant group fares in one batch",
    ],
    [
      "Real-time attendance tracking",
      "Live headcount and logistics dashboard",
    ],
    [
      "Post-event spend reporting",
      "Full cost breakdown within 24 hours of close",
    ],
  ];

  return (
    <EditorialBlock
      id="corporate-events"
      photoLeft={true}
      photo={corpImg}
      eyebrow="CORPORATE EVENTS"
      title={
        <>
          WHERE STRATEGY
          <br />
          MEETS
          <br />
          CEREMONY.
        </>
      }
      body="Annual leadership summits. Sales kickoffs. Board retreats. Product launches. These are not routine meetings — they are strategic investments in alignment, culture, and momentum."
    >
      <div>
        {rows.map(([t, d]) => (
          <div
            key={t}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
            style={{
              padding: "18px 0",
              borderBottom:
                "1px solid rgba(37,99,235,0.18)",
              gap: "10px",
            }}
          >
            <span
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "var(--ink)",
              }}
            >
              {t}
            </span>

            <span
              style={{
                fontSize: "13px",
                color: "#6B6258",
                textAlign: "left",
              }}
            >
              {d}
            </span>
          </div>
        ))}
      </div>
    </EditorialBlock>
  );
}

/* =========================================
   CONFERENCES BLOCK
========================================= */

function ConferencesBlock() {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!boxRef.current) return;

    gsap.fromTo(
      boxRef.current.children,
      { x: 60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: boxRef.current,
          start: "top 78%",
        },
      },
    );
  }, []);

  const boxes = [
    [
      "BATCH GROUP BOOKING",
      "Upload a delegate list. Ozonex generates individual itineraries.",
    ],
    [
      "ARRIVAL COORDINATION",
      "Live dashboard showing confirmed arrivals and transfers.",
    ],
    [
      "ON-GROUND COMMUNICATION",
      "Automated itinerary delivery via SMS, email, and app.",
    ],
  ];

  return (
    <EditorialBlock
      id="conferences"
      dark
      photoLeft={false}
      photo={confImg}
      eyebrow="CONFERENCES & EXHIBITIONS"
      title={
        <>
          HUNDREDS OF
          <br />
          ARRIVALS. ONE
          <br />
          UNIFIED VIEW.
        </>
      }
      body="Managing delegate travel to a major conference means coordinating hundreds of individual itineraries and logistics layers."
    >
      <div
        ref={boxRef}
        className="flex flex-col"
        style={{
          gap: "18px",
        }}
      >
        {boxes.map(([t, b]) => (
          <div
            key={t}
            style={{
              border:
                "1px solid rgba(255,255,255,0.08)",
              background:
                "rgba(255,255,255,0.03)",
              padding:
                "clamp(20px, 4vw, 28px)",
            }}
          >
            <div
              className="font-display text-white"
              style={{
                fontSize: "clamp(20px, 3vw, 24px)",
                fontWeight: 400,
                lineHeight: 1.2,
              }}
            >
              {t}
            </div>

            <p
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: "13px",
                marginTop: "10px",
                lineHeight: 1.8,
              }}
            >
              {b}
            </p>
          </div>
        ))}
      </div>
    </EditorialBlock>
  );
}

/* =========================================
   INCENTIVE BLOCK
========================================= */

function IncentiveBlock() {
  const perks = [
    "Luxury retreat planning",
    "Reward-based travel programs",
    "VIP airport and concierge support",
    "Custom destination experiences",
  ];

  return (
    <EditorialBlock
      id="incentive-travel"
      photoLeft={true}
      photo={incImg}
      eyebrow="INCENTIVE TRAVEL"
      title={
        <>
          REWARD PEOPLE
          <br />
          WITH EXPERIENCES
          <br />
          THEY REMEMBER.
        </>
      }
      body="Incentive travel is more than a reward. It is a strategic tool for retention, performance, and culture building. Ozonex manages premium incentive experiences with complete logistical precision."
    >
      <div
        className="flex flex-col"
        style={{
          gap: "16px",
        }}
      >
        {perks.map((perk) => (
          <div
            key={perk}
            style={{
              borderLeft: "2px solid #2563EB",
              paddingLeft: "16px",
              color: "var(--ink)",
              fontSize: "15px",
              lineHeight: 1.8,
            }}
          >
            {perk}
          </div>
        ))}
      </div>
    </EditorialBlock>
  );
}

/* =========================================
   GROUP BLOCK
========================================= */

function GroupBlock() {
  const items = [
    [
      "Centralised movement",
      "Track entire group movement from one dashboard",
    ],
    [
      "Rooming list automation",
      "Auto-allocate accommodation at scale",
    ],
    [
      "Transport coordination",
      "Assign buses, cars, and airport transfers instantly",
    ],
    [
      "Live communication",
      "Broadcast updates to all delegates in real time",
    ],
  ];

  return (
    <EditorialBlock
      id="group-travel"
      dark
      photoLeft={false}
      photo={grpImg}
      eyebrow="GROUP TRAVEL MANAGEMENT"
      title={
        <>
          MOVE LARGE
          <br />
          GROUPS WITHOUT
          <br />
          LOSING CONTROL.
        </>
      }
      body="Large-scale corporate movement requires precision. Ozonex centralises travel, stay, transport, and communication layers into one operational workflow."
    >
      <div
        className="flex flex-col"
        style={{
          gap: "18px",
        }}
      >
        {items.map(([title, desc]) => (
          <div
            key={title}
            style={{
              paddingBottom: "18px",
              borderBottom:
                "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              className="text-white"
              style={{
                fontSize: "15px",
                fontWeight: 500,
              }}
            >
              {title}
            </div>

            <div
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "13px",
                lineHeight: 1.8,
                marginTop: "6px",
              }}
            >
              {desc}
            </div>
          </div>
        ))}
      </div>
    </EditorialBlock>
  );
}

/* ---------------- 4. PROCESS ---------------- */


function ProcessSection() {
  const steps = [
    {
      n: 1,
      t: "Define the Event",
      b: "Your ops team submits the event brief through Ozonex — delegate count, destination, dates, accommodation tier, ground transport requirements, and budget ceiling.",
      img: s1,
      tags: [
        "Delegate Count",
        "Budget Ceiling",
        "Accommodation Tier",
      ],
    },
    {
      n: 2,
      t: "Invite and Capture",
      b: "Delegates receive personalised onboarding links and submit preferences, passport details, and requirements.",
      img: s2,
      tags: [
        "Preference Capture",
        "Passport Upload",
        "Dietary Requirements",
      ],
    },
    {
      n: 3,
      t: "Book. Assign. Confirm.",
      b: "Ozonex generates optimal group itineraries and confirms bookings automatically.",
      img: s3,
      tags: [
        "Batch Booking",
        "Policy-Compliant",
        "Auto-Confirmation",
      ],
    },
    {
      n: 4,
      t: "The Day Runs Itself",
      b: "Live operations dashboard shows every delegate’s status and transfer assignments in real time.",
      img: s4,
      tags: [
        "Live Flight Tracking",
        "Auto-Reschedule",
        "Ground Transfer Dashboard",
      ],
    },
    {
      n: 5,
      t: "Close the Books Fast",
      b: "Complete event spend reports are generated within 48 hours of close.",
      img: s5,
      tags: [
        "Per-Delegate Costs",
        "GL-Ready Export",
        "48-Hour Close",
      ],
    },
  ];

  return (
    <section
      style={{
        background: "var(--cream)",
        padding:
          "clamp(80px, 10vw, 160px) clamp(20px, 5vw, 80px)",
        overflow: "hidden",
      }}
    >
      {/* Heading */}
      <div
        className="text-center mx-auto"
        style={{
          maxWidth: "760px",
          marginBottom: "clamp(60px, 8vw, 120px)",
        }}
      >
        <div
          style={{
            color: "#2563EB",
            letterSpacing: "0.18em",
            fontSize: "12px",
            textTransform: "uppercase",
          }}
        >
          THE OZONEX EVENT PROCESS
        </div>

        <h2
          className="font-display"
          style={{
            color: "var(--ink)",
            fontSize: "clamp(34px, 7vw, 64px)",
            fontWeight: 300,
            lineHeight: 0.95,
            marginTop: "18px",
          }}
        >
          FROM BRIEF TO
          <br />
          DEBRIEF. EVERY
          <br />
          STEP MANAGED.
        </h2>

        <p
          style={{
            color: "#6B6258",
            fontSize: "clamp(14px, 2vw, 16px)",
            lineHeight: 1.9,
            maxWidth: "520px",
            marginTop: "24px",
            marginInline: "auto",
          }}
        >
          Every event moves through the same critical phases.
          Ozonex gives your ops team a structured workflow
          for each.
        </p>
      </div>

      {/* Steps */}
      <div
        className="mx-auto"
        style={{
          maxWidth: "1320px",
        }}
      >
        {steps.map((s, i) => (
          <div key={s.n}>
            <ProcessStep
              step={s}
              reverse={i % 2 === 1}
            />

            {i < steps.length - 1 && (
              <Squiggle flip={i % 2 === 1} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================================
   SQUIGGLE
========================================= */

function Squiggle({ flip }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      style={{
        width: "100%",
        height: "clamp(60px, 10vw, 120px)",
        opacity: 0.35,
        transform: flip ? "scaleX(-1)" : undefined,
      }}
    >
      <path
        d="M50,10 C200,90 350,-10 520,60 C680,120 820,0 980,70 C1080,110 1130,40 1180,80"
        fill="none"
        stroke="#3B82F6"
        strokeWidth="1.5"
        strokeDasharray="6 6"
      />
    </svg>
  );
}

/* =========================================
   PROCESS STEP
========================================= */

function ProcessStep({
  step,
  reverse,
}: {
  step: {
    n: number;
    t: string;
    b: string;
    img: string;
    tags: string[];
  };
  reverse: boolean;
}) {
  const photoRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: photoRef.current,
        start: "top 78%",
      },
    });

    if (numRef.current) {
      tl.fromTo(
        numRef.current,
        { scale: 0 },
        {
          scale: 1,
          duration: 0.7,
          ease: "back.out(1.7)",
        },
        0,
      );
    }

    if (photoRef.current) {
      tl.fromTo(
        photoRef.current,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.1,
          ease: "power2.out",
        },
        0,
      );
    }

    if (contentRef.current) {
      tl.fromTo(
        contentRef.current,
        {
          x: reverse ? 60 : -60,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        0.2,
      );
    }

    if (tagsRef.current) {
      tl.fromTo(
        tagsRef.current.children,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
        },
        0.4,
      );
    }
  }, [reverse]);

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-2 items-center"
      style={{
        gap: "clamp(30px, 6vw, 80px)",
        minHeight: "auto",
        marginBottom: "clamp(60px, 8vw, 120px)",
      }}
    >
      {/* Image */}
      <div
        ref={photoRef}
        className={
          reverse ? "lg:order-1" : "lg:order-2"
        }
        style={{
          minHeight: "clamp(280px, 45vw, 520px)",
        }}
      >
        <img
          src={step.img}
          alt={step.t}
          loading="lazy"
          className="w-full h-full object-cover"
          style={{
            minHeight: "clamp(280px, 45vw, 520px)",
          }}
        />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className={
          reverse ? "lg:order-2" : "lg:order-1"
        }
      >
        {/* Number */}
        <div
          ref={numRef}
          className="flex items-center justify-center font-display text-white"
          style={{
            width: "clamp(54px, 6vw, 64px)",
            height: "clamp(54px, 6vw, 64px)",
            borderRadius: "50%",
            background: "var(--ink)",
            fontSize: "clamp(22px, 3vw, 28px)",
          }}
        >
          {step.n}
        </div>

        {/* Title */}
        <h3
          className="font-display"
          style={{
            color: "var(--ink)",
            fontSize: "clamp(30px, 5vw, 44px)",
            fontWeight: 300,
            marginTop: "24px",
            lineHeight: 1,
          }}
        >
          {step.t}
        </h3>

        {/* Description */}
        <p
          style={{
            color: "#6B6258",
            fontSize: "clamp(14px, 2vw, 15px)",
            lineHeight: 1.9,
            maxWidth: "520px",
            marginTop: "20px",
          }}
        >
          {step.b}
        </p>

        {/* Tags */}
        <div
          ref={tagsRef}
          className="flex flex-wrap"
          style={{
            gap: "10px",
            marginTop: "28px",
          }}
        >
          {step.tags.map((tag) => (
            <span
              key={tag}
              style={{
                border: "1px solid #2563EB",
                color: "#2563EB",
                borderRadius: "999px",
                padding: "7px 16px",
                fontSize: "10px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                lineHeight: 1.4,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}



/* ---------------- 5. PINNED HORIZONTAL CAPABILITIES ---------------- */


function CapabilitiesScroll() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !wrapRef.current ||
      !trackRef.current ||
      window.innerWidth < 1024
    )
      return;

    const panels =
      trackRef.current.querySelectorAll(".cap-panel");

    const scrollAmt =
      (panels.length - 1) * window.innerWidth;

    const ctx = gsap.context(() => {
      const tween = gsap.to(trackRef.current, {
        x: -scrollAmt,
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + scrollAmt,
          invalidateOnRefresh: true,
        },
      });

      if (lineRef.current) {
        gsap.to(lineRef.current, {
          width: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: wrapRef.current,
            scrub: 1,
            start: "top top",
            end: () => "+=" + scrollAmt,
          },
        });
      }

      return () => {
        tween.kill();
      };
    });

    return () => ctx.revert();
  }, []);

  const panels = [
    {
      letter: "D",
      title: (
        <>
          Every delegate.
          <br />
          Every detail.
          <br />
          One dashboard.
        </>
      ),
      h: "DELEGATE MANAGEMENT",
      body:
        "The Ozonex delegate management module handles groups from 10 to 10,000.",
      caps: [
        "Bulk delegate upload via CSV or HRIS sync",
        "Individual delegate portals",
        "Real-time RSVP tracking",
      ],
    },
    {
      letter: "B",
      title: (
        <>
          The event budget.
          <br />
          Visible in real time.
          <br />
          Always.
        </>
      ),
      h: "BUDGET CONTROL",
      body:
        "Ozonex shows live budget burn throughout the planning and execution period.",
      caps: [
        "Live spend tracking",
        "Per-delegate cost tracking",
        "One-click GL export",
      ],
    },
    {
      letter: "V",
      title: (
        <>
          Hotels. Airlines.
          <br />
          Ground. Catering.
          <br />
          All in one brief.
        </>
      ),
      h: "VENDOR COORDINATION",
      body:
        "Ozonex coordinates your preferred event vendors through a unified layer.",
      caps: [
        "Room block management",
        "Group airline coordination",
        "Ground transport scheduling",
      ],
    },
  ];

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "#1C1410",
      }}
    >
      {/* Top Torn */}
      <TornEdge fill="#1C1410" position="top" />

      {/* Heading */}
      <div
        style={{
          padding:
            "clamp(80px, 10vw, 120px) clamp(20px, 5vw, 80px) clamp(40px, 6vw, 60px)",
        }}
      >
        <div
          style={{
            color: "#2563EB",
            letterSpacing: "0.18em",
            fontSize: "12px",
            textTransform: "uppercase",
          }}
        >
          PLATFORM CAPABILITIES FOR EVENTS
        </div>

        <h2
          className="font-display text-white"
          style={{
            fontSize: "clamp(34px, 7vw, 64px)",
            fontWeight: 300,
            lineHeight: 0.95,
            marginTop: "18px",
          }}
        >
          BUILT FOR
          <br />
          SCALE. TESTED
          <br />
          AT SCALE.
        </h2>
      </div>

      {/* DESKTOP HORIZONTAL */}
      <div
        ref={wrapRef}
        className="hidden lg:block"
        style={{
          overflow: "hidden",
          height: "100vh",
        }}
      >
        <div
          ref={trackRef}
          className="flex"
          style={{
            height: "100vh",
            width: `${panels.length * 100}vw`,
          }}
        >
          {panels.map((p) => (
            <div
              key={p.h}
              className="cap-panel relative"
              style={{
                width: "100vw",
                height: "100vh",
                padding:
                  "80px clamp(40px, 8vw, 100px)",
                background:
                  "rgba(255,255,255,0.02)",
              }}
            >
              {/* Background Letter */}
              <div
                className="font-display absolute"
                style={{
                  fontSize: "clamp(160px, 24vw, 300px)",
                  color: "#fff",
                  opacity: 0.03,
                  lineHeight: 1,
                  top: 40,
                  right: "clamp(20px, 6vw, 80px)",
                  pointerEvents: "none",
                }}
              >
                {p.letter}
              </div>

              {/* Content */}
              <div
                className="relative"
                style={{
                  maxWidth: "760px",
                }}
              >
                <div
                  style={{
                    color: "#2563EB",
                    letterSpacing: "0.18em",
                    fontSize: "12px",
                    textTransform: "uppercase",
                  }}
                >
                  {p.h}
                </div>

                <h3
                  className="font-display text-white"
                  style={{
                    fontSize: "clamp(38px, 5vw, 60px)",
                    fontWeight: 300,
                    lineHeight: 1,
                    marginTop: "18px",
                  }}
                >
                  {p.title}
                </h3>

                <p
                  style={{
                    color:
                      "rgba(255,255,255,0.65)",
                    fontSize:
                      "clamp(14px, 2vw, 16px)",
                    lineHeight: 1.9,
                    maxWidth: "620px",
                    marginTop: "28px",
                  }}
                >
                  {p.body}
                </p>

                <div
                  className="flex flex-col"
                  style={{
                    gap: "22px",
                    marginTop: "42px",
                  }}
                >
                  {p.caps.map((c) => (
                    <div
                      key={c}
                      style={{
                        borderLeft:
                          "2px solid #2563EB",
                        paddingLeft: "18px",
                        color: "#fff",
                        fontSize: "15px",
                        lineHeight: 1.7,
                      }}
                    >
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Line */}
        <div
          className="relative"
          style={{
            height: 2,
            background:
              "rgba(255,255,255,0.1)",
          }}
        >
          <div
            ref={lineRef}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: 2,
              width: 0,
              background: "var(--yellow-line)",
            }}
          />
        </div>
      </div>

      {/* MOBILE STACKED VERSION */}
      <div className="block lg:hidden">
        {panels.map((p) => (
          <div
            key={p.h}
            style={{
              padding:
                "60px 20px",
              borderTop:
                "1px solid rgba(255,255,255,0.06)",
              position: "relative",
            }}
          >
            {/* Background Letter */}
            <div
              className="font-display absolute"
              style={{
                fontSize: "120px",
                color: "#fff",
                opacity: 0.03,
                top: 20,
                right: 10,
                lineHeight: 1,
                pointerEvents: "none",
              }}
            >
              {p.letter}
            </div>

            <div
              style={{
                color: "#2563EB",
                letterSpacing: "0.18em",
                fontSize: "11px",
                textTransform: "uppercase",
                position: "relative",
                zIndex: 2,
              }}
            >
              {p.h}
            </div>

            <h3
              className="font-display text-white"
              style={{
                fontSize:
                  "clamp(30px, 8vw, 42px)",
                lineHeight: 1,
                fontWeight: 300,
                marginTop: "18px",
                position: "relative",
                zIndex: 2,
              }}
            >
              {p.title}
            </h3>

            <p
              style={{
                color:
                  "rgba(255,255,255,0.65)",
                fontSize: "14px",
                lineHeight: 1.9,
                marginTop: "24px",
                position: "relative",
                zIndex: 2,
              }}
            >
              {p.body}
            </p>

            <div
              className="flex flex-col"
              style={{
                gap: "18px",
                marginTop: "32px",
                position: "relative",
                zIndex: 2,
              }}
            >
              {p.caps.map((c) => (
                <div
                  key={c}
                  style={{
                    borderLeft:
                      "2px solid #2563EB",
                    paddingLeft: "16px",
                    color: "#fff",
                    fontSize: "14px",
                    lineHeight: 1.7,
                  }}
                >
                  {c}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}



/* ---------------- 6. EVENT TYPES GRID ---------------- */

function EventTypesGrid() {
  const tiles = [
    {
      img: t1,
      t: "Leadership Summit",
      d: "Full-day or multi-day leadership alignment events with executive travel and accommodation management.",
    },
    {
      img: t2,
      t: "Sales Kickoff",
      d: "Annual sales kickoffs with group travel from multiple cities, hotel room blocks, and gala dinner logistics.",
    },
    {
      img: t3,
      t: "Product Launch",
      d: "Product launch events with media and partner guest travel, press arrival coordination, and post-event wrap reporting.",
    },
    {
      img: t4,
      t: "Team Offsite",
      d: "Team building offsites with activity coordination, transport logistics, and accommodation for cross-functional groups.",
    },
    {
      img: t5,
      t: "Industry Exhibition",
      d: "Exhibition and trade show participation with booth team travel, freight logistics support, and multi-city scheduling.",
    },
    {
      img: t6,
      t: "Global Roadshow",
      d: "Multi-city roadshows with back-to-back city itineraries, executive travel optimisation, and live schedule management.",
    },
  ];

  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    gsap.fromTo(
      gridRef.current.children,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 78%",
        },
      },
    );
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "var(--cream)",
        padding:
          "clamp(80px, 10vw, 160px) 0",
      }}
    >
      {/* Top Torn */}
      <TornEdge fill="#F5F0EA" position="top" />

      {/* Heading */}
      <div
        className="text-center mx-auto"
        style={{
          maxWidth: "760px",
          paddingInline: "20px",
          marginBottom:
            "clamp(50px, 8vw, 100px)",
        }}
      >
        <h2
          className="font-display"
          style={{
            color: "var(--ink)",
            fontSize: "clamp(32px, 7vw, 56px)",
            fontWeight: 300,
            lineHeight: 0.95,
          }}
        >
          EVERY TYPE OF
          <br />
          CORPORATE EVENT.
        </h2>

        <p
          style={{
            color: "#6B6258",
            fontSize: "clamp(14px, 2vw, 16px)",
            lineHeight: 1.9,
            maxWidth: "520px",
            marginTop: "22px",
            marginInline: "auto",
          }}
        >
          From intimate leadership retreats to global
          multi-city roadshows — if it involves moving
          people for business, Ozonex manages it.
        </p>
      </div>

      {/* Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      >
        {tiles.map((tile) => (
          <Tile key={tile.t} tile={tile} />
        ))}
      </div>
    </section>
  );
}

/* =========================================
   TILE
========================================= */

function Tile({
  tile,
}: {
  tile: {
    img: string;
    t: string;
    d: string;
  };
}) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative overflow-hidden"
      style={{
        aspectRatio: "4/3",
        minHeight: "280px",
        cursor: "pointer",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Image */}
      <img
        src={tile.img}
        alt={tile.t}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform"
        style={{
          transform: hover
            ? "scale(1.06)"
            : "scale(1)",
          transitionDuration: "700ms",
          filter: "brightness(0.72)",
        }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 transition-opacity"
        style={{
          background:
            "linear-gradient(to top, rgba(28,20,16,0.92) 0%, rgba(28,20,16,0.55) 45%, rgba(28,20,16,0.35) 100%)",
          opacity: hover ? 1 : 0.88,
          transitionDuration: "400ms",
        }}
      />

      {/* Content */}
      <div
        className="absolute inset-0 flex flex-col justify-end"
        style={{
          zIndex: 2,
          padding:
            "clamp(20px, 4vw, 32px)",
          transform: hover
            ? "translateY(-8px)"
            : "translateY(0)",
          transitionDuration: "400ms",
        }}
      >
        {/* Title */}
        <div
          className="font-display text-white"
          style={{
            fontSize: "clamp(24px, 4vw, 32px)",
            fontWeight: 300,
            lineHeight: 1,
          }}
        >
          {tile.t}
        </div>

        {/* Description */}
        <p
          style={{
            color: "rgba(255,255,255,0.82)",
            fontSize: "clamp(13px, 2vw, 14px)",
            lineHeight: 1.8,
            maxWidth: "90%",
            marginTop: "14px",
            opacity: hover ? 1 : 0.9,
            transform:
              hover || window.innerWidth < 768
                ? "translateY(0)"
                : "translateY(10px)",
            transition:
              "all 400ms ease",
          }}
        >
          {tile.d}
        </p>
      </div>
    </div>
  );
}



/* ---------------- 7. WHY ---------------- */

/* =========================================
   WHY MICE
========================================= */

function WhyMice() {
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (photoRef.current) {
      gsap.fromTo(
        photoRef.current,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: photoRef.current,
            start: "top 78%",
          },
        },
      );
    }
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "#1C1410",
        padding:
          "clamp(80px, 10vw, 160px) clamp(20px, 5vw, 80px)",
      }}
    >
      {/* Top Torn */}
      <TornEdge fill="#1C1410" position="top" />

      <div
        className="grid grid-cols-1 lg:grid-cols-12 mx-auto"
        style={{
          gap: "clamp(40px, 6vw, 80px)",
          maxWidth: "1320px",
        }}
      >
        {/* LEFT */}
        <div className="lg:col-span-7">
          {/* Eyebrow */}
          <div
            style={{
              color: "#2563EB",
              letterSpacing: "0.18em",
              fontSize: "12px",
              textTransform: "uppercase",
            }}
          >
            WHY OZONEX FOR MICE
          </div>

          {/* Title */}
          <h2
            className="font-display text-white"
            style={{
              fontSize: "clamp(34px, 7vw, 72px)",
              fontWeight: 300,
              lineHeight: 0.92,
              marginTop: "18px",
            }}
          >
            MOST EVENTS
            <br />
            FAIL IN THE
            <br />
            LOGISTICS.
            <br />
            NOT THE CONTENT.
          </h2>

          {/* Body */}
          <p
            style={{
              color: "rgba(255,255,255,0.68)",
              maxWidth: "620px",
              lineHeight: 1.9,
              marginTop: "32px",
              fontSize: "clamp(14px, 2vw, 16px)",
            }}
          >
            Event planners are exceptional at designing
            experiences. What exhausts them is the operational
            machinery underneath — the booking spreadsheets,
            delegate email chains, hotel reallocations, and
            finance reconciliation.
          </p>

          {/* Quote */}
          <div
            style={{
              marginTop: "clamp(36px, 5vw, 52px)",
              borderLeft: "3px solid #3B82F6",
              paddingLeft: "clamp(18px, 4vw, 28px)",
            }}
          >
            <p
              className="font-display text-white"
              style={{
                fontSize: "clamp(22px, 4vw, 30px)",
                fontWeight: 300,
                lineHeight: 1.6,
                fontStyle: "italic",
              }}
            >
              "The ops team ran our 800-person annual
              conference from one screen. Every delegate
              arrived on time."
            </p>

            <div
              style={{
                color: "rgba(255,255,255,0.45)",
                fontSize: "12px",
                marginTop: "18px",
                letterSpacing: "0.04em",
              }}
            >
              Head of Events, Diversified Conglomerate,
              UAE
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-5">
          {/* Image */}
          <div
            ref={photoRef}
            style={{
              width: "100%",
              height: "clamp(320px, 50vw, 560px)",
            }}
          >
            <img
              src={whyImg}
              alt="Event ops team"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Stats */}
          <div
            className="flex flex-col"
            style={{
              marginTop: "32px",
            }}
          >
            {[
              [
                "800",
                "+",
                "MAX DELEGATES IN SINGLE EVENT",
              ],
              [
                "48",
                " hrs",
                "FULL RECONCILIATION AFTER CLOSE",
              ],
              [
                "1",
                "",
                "PLATFORM FOR EVERY EVENT FUNCTION",
              ],
            ].map(([n, suf, l]) => (
              <div
                key={l}
                style={{
                  borderTop:
                    "1px solid rgba(255,255,255,0.07)",
                  paddingTop: "22px",
                  paddingBottom: "22px",
                }}
              >
                <div
                  className="font-display text-white"
                  style={{
                    fontSize:
                      "clamp(34px, 6vw, 48px)",
                    fontWeight: 300,
                    lineHeight: 1,
                  }}
                >
                  <CountUp
                    to={Number(n)}
                    suffix={suf}
                    className="font-display text-white"
                  />
                </div>

                <div
                  style={{
                    color:
                      "rgba(255,255,255,0.45)",
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginTop: "8px",
                    lineHeight: 1.6,
                  }}
                >
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================
   CTA
========================================= */

function CTA() {
  const btnRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (btnRef.current) {
      gsap.fromTo(
        btnRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: btnRef.current,
            start: "top 85%",
          },
        },
      );
    }

    if (
      photoRef.current &&
      window.innerWidth > 768
    ) {
      gsap.to(photoRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: photoRef.current,
          scrub: true,
          start: "top bottom",
          end: "bottom top",
        },
      });
    }
  }, []);

  return (
    <section
      id="cta"
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        minHeight: "100vh",
        background: "#1C1410",
      }}
    >
      {/* Background Image */}
      <img
  ref={photoRef}
  src={ctaImg}
  alt="Empty stage before event"
  loading="lazy"
  className="absolute inset-0 w-full h-full md:h-[120%] object-cover"
  style={{
    zIndex: 0,
  }}
/>

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "rgba(28,20,16,0.74)",
          zIndex: 1,
        }}
      />

      {/* Stars */}
      <div
        className="absolute left-4 md:left-10 lg:left-12 top-1/2 -translate-y-1/2 text-white/30"
        style={{
          zIndex: 2,
          fontSize: "clamp(18px, 2vw, 28px)",
        }}
      >
        ✦
      </div>

      <div
        className="absolute right-4 md:right-10 lg:right-12 top-1/2 -translate-y-1/2 text-white/30"
        style={{
          zIndex: 2,
          fontSize: "clamp(18px, 2vw, 28px)",
        }}
      >
        ✦
      </div>

      {/* Content */}
      <div
        className="relative text-center"
        style={{
          zIndex: 3,
          maxWidth: "1000px",
          width: "100%",
          padding:
            "0 clamp(20px, 5vw, 80px)",
        }}
      >
        {/* Title */}
        <Words
          text="YOUR NEXT EVENT STARTS WITH ONE CONVERSATION."
          className="font-display text-white"
          style={{
            fontSize: "clamp(38px, 8vw, 88px)",
            lineHeight: 0.95,
            fontWeight: 300,
          }}
        />

        {/* Paragraph */}
        <p
          style={{
            color:
              "rgba(255,255,255,0.72)",
            fontSize:
              "clamp(14px, 2vw, 17px)",
            lineHeight: 1.85,
            maxWidth: "620px",
            marginInline: "auto",
            marginTop: "30px",
          }}
        >
          Tell us your event type, delegate count,
          and timeline. Our MICE team will show you
          exactly how Ozonex would run it.
        </p>

        {/* Buttons */}
        <div
          ref={btnRef}
          className="flex flex-col sm:flex-row justify-center"
          style={{
            gap: "16px",
            marginTop: "42px",
          }}
        >
          {/* Primary */}
          <button
            className="transition-all w-full sm:w-auto"
            style={{
              background: "#2563EB",
              color: "#fff",
              border: "none",
              borderRadius: "999px",
              padding:
                "16px clamp(28px, 5vw, 48px)",
              fontSize: "12px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 500,
              cursor: "pointer",
              
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "#3B82F6";
              e.currentTarget.style.transform =
                "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "#2563EB";
              e.currentTarget.style.transform =
                "scale(1)";
            }}
          >
            PLAN YOUR EVENT
          </button>

          {/* Secondary */}
          <button
            className="w-full sm:w-auto transition-all"
            style={{
              background: "transparent",
              color: "#fff",
              border:
                "1px solid rgba(255,255,255,0.4)",
              borderRadius: "999px",
              padding:
                "16px clamp(28px, 5vw, 48px)",
              fontSize: "12px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 500,
              cursor: "pointer",
             
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                "rgba(255,255,255,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "transparent";
            }}
          >
            GET A MICE BRIEF
          </button>
        </div>
      </div>
    </section>
  );
}


