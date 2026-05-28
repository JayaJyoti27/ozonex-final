import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "@/components/Nav";
import { ScrollLineV } from "@/components/ScrollLineV";
import { Footer } from "@/components/Sections";
import { TornEdge } from "@/components/TornEdge";

gsap.registerPlugin(ScrollTrigger);

export type CityData = {
  city: string;
  eyebrow: string;
  hero: {
    image: string;
    h1Lines: string[];
    sub: string;
  };
  stats: { num: string; label: string }[];
  why: {
    h2Lines: string[];
    body: string;
    keyStatNum: string;
    keyStatLabel: string;
    cards: { title: string; body: string }[];
  };
  industries: {
    h2Lines: string[];
    tiles: { title: string; body: string }[];
  };
  how: {
    h2Lines: string[];
    steps: { title: string; body: string; image: string }[];
  };
  testimonial: {
    quote: string;
    attribution: string;
  };
  cta: {
    image: string;
    h2Lines: string[];
    body: string;
  };
};

/* ─── responsive helpers injected once ─────────────────────────── */
const GLOBAL_STYLES = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── Hero ── */
  .city-hero-eyebrow { animation: fadeUp 0.8s 0.2s ease forwards; }
  .city-hero-sub     { animation: fadeUp 0.9s 0.7s ease forwards; }
  .city-hero-ctas    { animation: fadeUp 0.9s 0.85s ease forwards; }

  /* ── Why cards ── */
  .city-why-card:hover {
    background: rgba(255,255,255,0.05);
    border-color: rgba(29,78,216,0.25);
  }

  /* ── Industry tiles ── */
  .city-tile:hover {
    box-shadow: 0 12px 40px rgba(28,20,16,0.08);
    transform: translateY(-6px);
    position: relative;
    z-index: 1;
  }

  /* ── Button group: stack on very small screens ── */
  @media (max-width: 400px) {
    .city-hero-ctas { flex-direction: column; align-items: stretch; }
    .city-hero-ctas a { text-align: center; }
  }

  /* ── How-it-works: always stack image on top on mobile ── */
  @media (max-width: 1023px) {
    .how-step-img  { order: 0 !important; }
    .how-step-text { order: 1 !important; }
  }
`;

/* ─── WordsH1 ───────────────────────────────────────────────────── */
function WordsH1({
  lines,
  className,
  style,
}: {
  lines: string[];
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
        delay: 0.15,
      },
    );
  }, []);
  return (
    <h1 ref={ref} className={className} style={style}>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.split(/(\s+)/).map((w, i) =>
            /\s+/.test(w) ? (
              <span key={i}>{w}</span>
            ) : (
              <span
                key={i}
                style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
              >
                <span className="word-inner" style={{ display: "inline-block" }}>
                  {w}
                </span>
              </span>
            ),
          )}
        </span>
      ))}
    </h1>
  );
}

/* ─── Stat ──────────────────────────────────────────────────────── */
function Stat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const num = value.match(/[\d,.]+/);
    if (!num) return;
    const target = parseFloat(num[0].replace(/,/g, ""));
    const prefix = value.slice(0, value.indexOf(num[0]));
    const suffix = value.slice(value.indexOf(num[0]) + num[0].length);
    const el = ref.current.querySelector(".stat-num") as HTMLElement;
    const obj = { v: 0 };
    gsap.to(obj, {
      v: target,
      duration: 1.8,
      ease: "power2.out",
      scrollTrigger: { trigger: ref.current, start: "top 85%" },
      onUpdate: () => {
        const formatted =
          target >= 100 ? Math.round(obj.v).toLocaleString("en-IN") : obj.v.toFixed(1);
        el.textContent = prefix + formatted + suffix;
      },
    });
  }, [value]);

  return (
    <div ref={ref} className="reveal text-center px-4 py-4">
      <div
        className="font-display stat-num"
        style={{
          fontSize: "clamp(36px, 6vw, 64px)",
          color: "var(--ink)",
          fontWeight: 300,
          lineHeight: 1,
        }}
      >
        {value.replace(/[\d,.]+/, "0")}
      </div>
      <div
        className="mx-auto mt-3"
        style={{
          fontSize: "clamp(11px, 1.2vw, 13px)",
          color: "#6B6258",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          maxWidth: 200,
          lineHeight: 1.5,
        }}
      >
        {label}
      </div>
    </div>
  );
}

/* ─── CityPage ──────────────────────────────────────────────────── */
export function CityPage({ data }: { data: CityData }) {
  const pageRef = useRef<HTMLDivElement>(null);

  /* smooth scroll */
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    const raf = (t: number) => {
      lenis.raf(t);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  /* scroll animations */
  useEffect(() => {
    if (!pageRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 78%" },
          },
        );
      });
      gsap.utils.toArray<HTMLElement>(".reveal-stagger").forEach((wrap) => {
        const children = wrap.querySelectorAll(".reveal-child");
        gsap.fromTo(
          children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: wrap, start: "top 78%" },
          },
        );
      });
      gsap.to(".cta-parallax", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: ".cta-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} style={{ background: "var(--ink)" }}>
      <style>{GLOBAL_STYLES}</style>
      <Nav />
      <ScrollLineV />

      {/* ── SECTION 1: HERO ──────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden grid-overlay"
        style={{
          background: "#1C1410",
          minHeight: "100svh" /* safer than 100vh on mobile */,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${data.hero.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(rgba(28,20,16,0.72) 0%, rgba(28,20,16,0.85) 100%)",
          }}
        />

        {/* decorative marks — hidden on small screens */}
        <span
          className="absolute left-12 top-1/2 -translate-y-1/2 text-lg select-none hidden lg:block"
          style={{ color: "#3B82F6", opacity: 0.5 }}
        >
          ✦
        </span>
        <span
          className="absolute right-12 top-1/2 -translate-y-1/2 text-lg select-none hidden lg:block"
          style={{ color: "#3B82F6", opacity: 0.5 }}
        >
          ✦
        </span>

        <div
          className="relative z-10 w-full flex flex-col items-center justify-center text-center px-5 sm:px-8"
          style={{ maxWidth: 1200, margin: "0 auto", paddingTop: 96, paddingBottom: 96 }}
        >
          {/* eyebrow */}
          <div
            className="opacity-0 city-hero-eyebrow"
            style={{
              fontSize: "clamp(9px, 1.5vw, 11px)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#3B82F6",
              marginBottom: 24,
            }}
          >
            {data.eyebrow}
          </div>

          {/* headline */}
          <WordsH1
            lines={data.hero.h1Lines}
            className="font-display"
            style={{
              fontSize: "clamp(36px, 7vw, 84px)",
              color: "white",
              fontWeight: 300,
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
            }}
          />

          {/* sub */}
          <p
            className="opacity-0 city-hero-sub"
            style={{
              fontSize: "clamp(14px, 2vw, 17px)",
              color: "rgba(255,255,255,0.68)",
              maxWidth: 560,
              lineHeight: 1.75,
              marginTop: 28,
            }}
          >
            {data.hero.sub}
          </p>

          {/* CTAs */}
          <div
            className="city-hero-ctas flex flex-wrap items-center justify-center gap-3 opacity-0"
            style={{ marginTop: 40 }}
          >
            <a
              href="/pricing#enquire"
              style={{
                background: "#2563EB",
                color: "white",
                borderRadius: 50,
                padding: "13px 32px",
                fontSize: "clamp(10px, 1.2vw, 12px)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 500,
                transition: "all 0.25s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#3B82F6";
                e.currentTarget.style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#2563EB";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Book a Demo
            </a>
            <a
              href="/product"
              style={{
                background: "transparent",
                color: "white",
                border: "1px solid rgba(255,255,255,0.4)",
                borderRadius: 50,
                padding: "13px 32px",
                fontSize: "clamp(10px, 1.2vw, 12px)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 500,
                transition: "all 0.25s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
              }}
            >
              See How It Works
            </a>
          </div>
        </div>
        <TornEdge fill="#F5F0EA" position="bottom" />
      </section>

      {/* ── SECTION 2: STATS BAR ────────────────────────────────── */}
      <section
        className="relative w-full"
        style={{ background: "#F5F0EA", padding: "clamp(48px,8vw,80px) clamp(16px,4vw,24px)" }}
      >
        <div className="relative max-w-[1320px] mx-auto">
          <div
            className="grid grid-cols-2 md:grid-cols-4 reveal-stagger"
            style={{
              borderTop: "1px solid rgba(37,99,235,0.2)",
              borderBottom: "1px solid rgba(37,99,235,0.2)",
              padding: "clamp(28px,5vw,48px) 0",
            }}
          >
            {data.stats.map((s, i) => (
              <div
                key={i}
                className="reveal-child"
                style={{
                  /* on 2-col grid only even items (0,2) get left borders at md+ */
                  borderLeft: i > 0 ? "1px solid rgba(37,99,235,0.2)" : "none",
                  /* on mobile 2-col, add top border to bottom row */
                  borderTop: i >= 2 ? "1px solid rgba(37,99,235,0.2)" : "none",
                }}
              >
                <Stat value={s.num} label={s.label} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: WHY ──────────────────────────────────────── */}
      <section
        className="relative w-full grid-overlay"
        style={{
          background: "#1C1410",
          padding: "clamp(80px,10vw,140px) clamp(16px,4vw,24px)",
        }}
      >
        <TornEdge fill="#1C1410" position="top" />
        <div
          className="relative max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-2"
          style={{ gap: "clamp(40px,6vw,80px)" }}
        >
          {/* sticky left col — only sticky on desktop */}
          <div className="lg:sticky lg:top-32 self-start">
            <div
              className="reveal"
              style={{
                fontSize: 11,
                color: "#2563EB",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              Why {data.city} Enterprises Choose Ozonex
            </div>
            <h2
              className="font-display reveal"
              style={{
                fontSize: "clamp(32px,5vw,64px)",
                color: "white",
                fontWeight: 300,
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
              }}
            >
              {data.why.h2Lines.map((l, i) => (
                <span key={i} className="block">
                  {l}
                </span>
              ))}
            </h2>
            <p
              className="reveal"
              style={{
                fontSize: "clamp(14px,1.6vw,16px)",
                color: "rgba(255,255,255,0.65)",
                maxWidth: 440,
                lineHeight: 1.82,
                marginTop: 24,
              }}
            >
              {data.why.body}
            </p>
            <div
              className="reveal"
              style={{ marginTop: 40, borderLeft: "3px solid #2563EB", paddingLeft: 20 }}
            >
              <div
                className="font-display"
                style={{
                  fontSize: "clamp(36px,5vw,52px)",
                  color: "white",
                  fontWeight: 300,
                  lineHeight: 1,
                }}
              >
                {data.why.keyStatNum}
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.5)",
                  maxWidth: 300,
                  marginTop: 8,
                  lineHeight: 1.6,
                }}
              >
                {data.why.keyStatLabel}
              </p>
            </div>
          </div>

          {/* cards */}
          <div className="reveal-stagger flex flex-col" style={{ gap: 2 }}>
            {data.why.cards.map((c, i) => (
              <div
                key={i}
                className="reveal-child city-why-card"
                style={{
                  padding: "clamp(24px,4vw,40px) clamp(20px,4vw,44px)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.02)",
                  transition: "all 0.3s ease",
                }}
              >
                <div style={{ fontSize: 11, color: "#2563EB", letterSpacing: "0.15em" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3
                  className="font-display"
                  style={{
                    fontSize: "clamp(20px,3vw,28px)",
                    color: "white",
                    fontWeight: 300,
                    marginTop: 10,
                  }}
                >
                  {c.title}
                </h3>
                <p
                  style={{
                    fontSize: "clamp(13px,1.4vw,14px)",
                    color: "rgba(255,255,255,0.6)",
                    lineHeight: 1.75,
                    marginTop: 10,
                  }}
                >
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>
        <TornEdge fill="#F5F0EA" position="bottom" />
      </section>

      {/* ── SECTION 4: INDUSTRIES ───────────────────────────────── */}
      <section
        className="relative w-full"
        style={{
          background: "#F5F0EA",
          padding: "clamp(80px,10vw,140px) clamp(16px,4vw,24px)",
        }}
      >
        <div className="max-w-[1320px] mx-auto">
          <div className="text-center">
            <div
              className="reveal"
              style={{
                fontSize: 11,
                color: "#2563EB",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              Industries We Serve in {data.city}
            </div>
            <h2
              className="font-display reveal"
              style={{
                fontSize: "clamp(32px,5vw,60px)",
                color: "var(--ink)",
                fontWeight: 300,
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
              }}
            >
              {data.industries.h2Lines.map((l, i) => (
                <span key={i} className="block">
                  {l}
                </span>
              ))}
            </h2>
          </div>

          <div
            className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            style={{ marginTop: "clamp(48px,6vw,80px)", gap: 0 }}
          >
            {data.industries.tiles.map((t, i) => (
              <div
                key={i}
                className="reveal-child city-tile"
                style={{
                  padding: "clamp(24px,3.5vw,40px) clamp(20px,3.5vw,36px)",
                  border: "1px solid rgba(37,99,235,0.2)",
                  background: "white",
                  minHeight: "clamp(160px,20vw,220px)",
                  marginLeft: -1,
                  marginTop: -1,
                  transition: "all 0.35s ease",
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    letterSpacing: "0.15em",
                    color: "#2563EB",
                    fontWeight: 600,
                  }}
                >
                  {t.title}
                </div>
                <p
                  style={{
                    fontSize: "clamp(13px,1.4vw,14px)",
                    color: "#6B6258",
                    lineHeight: 1.75,
                    marginTop: 14,
                  }}
                >
                  {t.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: HOW IT WORKS ─────────────────────────────── */}
      <section
        className="relative w-full grid-overlay"
        style={{
          background: "#1C1410",
          padding: "clamp(80px,10vw,140px) clamp(16px,4vw,24px)",
        }}
      >
        <TornEdge fill="#1C1410" position="top" />
        <div className="max-w-[1320px] mx-auto">
          <div className="text-center" style={{ marginBottom: "clamp(56px,8vw,100px)" }}>
            <h2
              className="font-display reveal"
              style={{
                fontSize: "clamp(32px,5vw,60px)",
                color: "white",
                fontWeight: 300,
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
              }}
            >
              {data.how.h2Lines.map((l, i) => (
                <span key={i} className="block">
                  {l}
                </span>
              ))}
            </h2>
          </div>

          <div className="flex flex-col" style={{ gap: "clamp(64px,10vw,120px)" }}>
            {data.how.steps.map((step, i) => {
              const reversed = i % 2 === 1;
              return (
                <div
                  key={i}
                  className="grid grid-cols-1 lg:grid-cols-2 items-center reveal"
                  style={{ gap: "clamp(32px,5vw,80px)" }}
                >
                  <div className="how-step-img" style={{ order: reversed ? 2 : 1 }}>
                    <img
                      src={step.image}
                      alt={step.title}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "clamp(220px,35vw,460px)",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>
                  <div className="how-step-text" style={{ order: reversed ? 1 : 2 }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(29,78,216,0.4)",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 16,
                        fontFamily: "var(--font-display)",
                        marginBottom: 20,
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </div>
                    <h3
                      className="font-display"
                      style={{
                        fontSize: "clamp(28px,4vw,44px)",
                        color: "white",
                        fontWeight: 300,
                        lineHeight: 1.05,
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "clamp(13px,1.5vw,15px)",
                        color: "rgba(255,255,255,0.65)",
                        maxWidth: 440,
                        lineHeight: 1.82,
                        marginTop: 16,
                      }}
                    >
                      {step.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <TornEdge fill="#F5F0EA" position="bottom" />
      </section>

      {/* ── SECTION 6: TESTIMONIAL ──────────────────────────────── */}
      <section
        className="relative w-full"
        style={{
          background: "#F5F0EA",
          padding: "clamp(80px,10vw,140px) clamp(16px,5vw,24px)",
        }}
      >
        <div className="relative max-w-[860px] mx-auto text-center">
          <span
            className="font-display absolute"
            style={{
              fontSize: "clamp(64px,12vw,120px)",
              color: "#3B82F6",
              opacity: 0.2,
              top: -20,
              left: 0,
              lineHeight: 1,
              pointerEvents: "none",
            }}
          >
            "
          </span>
          <p
            className="font-display reveal"
            style={{
              fontSize: "clamp(18px,3vw,36px)",
              color: "var(--ink)",
              fontWeight: 300,
              lineHeight: 1.5,
              letterSpacing: "-0.01em",
            }}
          >
            {data.testimonial.quote}
          </p>
          <div
            className="mx-auto reveal"
            style={{
              width: 80,
              height: 1,
              background: "rgba(37,99,235,0.3)",
              margin: "32px auto",
            }}
          />
          <p
            className="reveal"
            style={{
              fontSize: "clamp(11px,1.4vw,14px)",
              color: "#6B6258",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {data.testimonial.attribution}
          </p>
        </div>
      </section>

      {/* ── SECTION 7: CTA ──────────────────────────────────────── */}
      <section
        className="cta-section relative w-full overflow-hidden grid-overlay"
        style={{
          background: "#1C1410",
          minHeight: "clamp(480px,80vh,100vh)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          className="cta-parallax absolute inset-0"
          style={{
            backgroundImage: `url(${data.cta.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            willChange: "transform",
          }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(28,20,16,0.76)" }} />
        <div
          className="relative z-10 w-full flex flex-col items-center justify-center text-center px-5 sm:px-8"
          style={{ maxWidth: 1100, margin: "0 auto", paddingTop: 80, paddingBottom: 80 }}
        >
          <h2
            className="font-display reveal"
            style={{
              fontSize: "clamp(36px,7vw,84px)",
              color: "white",
              fontWeight: 300,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
            }}
          >
            {data.cta.h2Lines.map((l, i) => (
              <span key={i} className="block">
                {l}
              </span>
            ))}
          </h2>
          <p
            className="reveal"
            style={{
              fontSize: "clamp(14px,2vw,17px)",
              color: "rgba(255,255,255,0.68)",
              maxWidth: 500,
              lineHeight: 1.75,
              marginTop: 24,
            }}
          >
            {data.cta.body}
          </p>
          <a
            href="/pricing#enquire"
            className="reveal"
            style={{
              marginTop: 36,
              background: "#2563EB",
              color: "white",
              borderRadius: 50,
              padding: "clamp(12px,1.5vw,16px) clamp(32px,4vw,48px)",
              fontSize: "clamp(10px,1.2vw,12px)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 500,
              transition: "all 0.25s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#3B82F6";
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#2563EB";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Book a Demo
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
