import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { num: 94, suffix: "%", label: "Repeat bookings", desc: "Our growth is fueled by the loyalty of enterprises who return to us journey after journey." },
  { num: 89, suffix: "%", label: "Net promoter score (NPS)", desc: "An industry-leading satisfaction rating that reflects our commitment to operational excellence." },
  { num: 5, suffix: "", supersuffix: "Years", label: "Average platform experience", desc: "We don't deploy juniors. Your travel operations are handled by seasoned product and ops experts." },
  { num: 25, suffix: "+", label: "Enterprise clients", desc: "A diverse, multinational portfolio capable of navigating global markets and complex travel policies." },
];

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      stats.forEach((s, i) => {
        const el = document.querySelector(`#stat-num-${i}`);
        if (!el) return;
        const obj = { v: 0 };
        gsap.to(obj, {
          v: s.num,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toString();
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative w-full py-32 px-12 overflow-hidden" style={{ background: "var(--cream)" }}>
      {/* Faint world map watermark */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(/images/world.svg)",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.06,
          filter: "grayscale(1)",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-12 gap-8 mb-24">
          <h2
            className="col-span-7 font-display"
            style={{ fontSize: "clamp(56px, 7vw, 96px)", lineHeight: 0.95, color: "var(--ink)" }}
          >
            3 Worldwide<br />Locations
          </h2>
          <p className="col-span-5 self-end max-w-[480px]" style={{ color: "var(--muted-warm)", fontSize: 16, lineHeight: 1.7 }}>
            Strategic hubs in India and the UAE — ensuring truly global coverage with seamless
            coordination and reliable support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t pt-16" style={{ borderColor: "rgba(28,20,16,0.12)" }}>
          {stats.map((s, i) => (
            <div key={i}>
              <div
                className="font-display flex items-baseline"
                style={{ fontSize: "clamp(72px, 9vw, 128px)", lineHeight: 1, color: "var(--ink)" }}
              >
                <span id={`stat-num-${i}`}>0</span>
                <span>{s.suffix}</span>
                {s.supersuffix && (
                  <span
                    className="ml-3 self-end mb-3"
                    style={{ fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted-warm)" }}
                  >
                    {s.supersuffix}
                  </span>
                )}
              </div>
              <div className="mt-4" style={{ fontSize: 16, color: "var(--ink)", fontWeight: 500 }}>
                {s.label}
              </div>
              <p className="mt-3" style={{ fontSize: 14, color: "var(--muted-warm)", lineHeight: 1.65 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
