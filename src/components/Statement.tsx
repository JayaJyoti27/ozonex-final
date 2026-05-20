import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bg from "@/assets/statement-bg.jpg";

gsap.registerPlugin(ScrollTrigger);

export function Statement() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".st-h",
        { x: -80, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 70%" },
        }
      );
      gsap.fromTo(
        ".st-p",
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.15,
          scrollTrigger: { trigger: ref.current, start: "top 70%" },
        }
      );
      gsap.to(".st-bg", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full h-[100vh] overflow-hidden grid-overlay"
      style={{ background: "var(--ink)" }}
    >
      <div
        className="st-bg absolute inset-0"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          willChange: "transform",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(28,20,16,0.88) 45%, rgba(28,20,16,0.2) 100%)",
        }}
      />

      <div className="relative z-10 h-full w-full grid grid-cols-12 gap-8 px-12 py-20">
        <div className="col-span-7 flex items-end">
          <h2
            className="st-h font-display text-white"
            style={{ fontSize: "clamp(56px, 8vw, 108px)", lineHeight: 0.95 }}
          >
            Stop managing<br />travel. Start<br />controlling it.
          </h2>
        </div>
        <div className="col-span-5 flex items-end">
          <div className="max-w-[420px] space-y-5 text-white/80" style={{ fontSize: 15, lineHeight: 1.7 }}>
            <p className="st-p">Most companies don't have a travel problem. They have a visibility problem.</p>
            <p className="st-p">
              Ozonex puts every booking, every approval, and every rupee on one
              screen — so finance sees the truth in real time and employees
              never wonder what is in policy.
            </p>
            <p className="st-p">
              Less chasing. Less leakage. More money back in the budget.
            </p>
          </div>
        </div>
      </div>

      <svg
        className="absolute bottom-[-1px] left-0 w-full"
        height="80"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        style={{ display: "block" }}
      >
        <path
          d="M0,50 C150,15 300,65 450,30 C600,0 750,60 900,35 C1050,10 1200,55 1440,25 L1440,80 L0,80 Z"
          fill="var(--cream)"
        />
      </svg>
    </section>
  );
}
