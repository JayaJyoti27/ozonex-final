import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "@/components/Nav";
import { ScrollLineV } from "@/components/ScrollLineV";
import { Footer } from "@/components/Sections";
import { TornEdge } from "@/components/TornEdge";
import { RegistrationForm } from "@/components/RegistrationForm";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Register | Ozonex" },
      {
        name: "description",
        content:
          "Register as a Travel Agent (B2B) or Corporate client (B2E/CBT) with Ozonex. Submit your business details and documents to get started.",
      },
      { property: "og:title", content: "Register | Ozonex" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://ozonextravel.com/register" }],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-eyebrow",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" },
      );
      gsap.fromTo(
        ".hero-word",
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.07, delay: 0.35 },
      );
      gsap.fromTo(
        ".hero-fade",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.15, delay: 0.9 },
      );
    });

    return () => {
      ctx.revert();
      lenis.destroy();
      ScrollTrigger.getAll().forEach((s) => s.kill());
    };
  }, []);

  return (
    <main className="relative">
      <Nav />
      <ScrollLineV />

      {/* HERO */}
      <section
        className="relative w-full min-h-[45vh] overflow-hidden grid-overlay flex flex-col items-center justify-center text-center px-6 py-32"
        style={{ background: "var(--ink)" }}
      >
        <span
          className="absolute left-12 top-1/2 -translate-y-1/2 text-2xl select-none z-10"
          style={{ color: "#fff", opacity: 0.2 }}
        >
          ✦
        </span>
        <span
          className="absolute right-12 top-1/2 -translate-y-1/2 text-2xl select-none z-10"
          style={{ color: "#fff", opacity: 0.2 }}
        >
          ✦
        </span>

        <div className="hero-eyebrow eyebrow" style={{ color: "rgba(255,255,255,0.45)" }}>
          Get Started
        </div>

        <h1
          className="font-display mt-8 text-white"
          style={{ fontSize: "clamp(40px,6vw,72px)", lineHeight: 0.95 }}
        >
          {[["Register", "with"], ["Ozonex"]].map((line, i) => (
            <span key={i} className="block">
              {line.map((w, j) => (
                <span key={j} className="hero-word inline-block mr-3">
                  {w}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <p
          className="hero-fade mt-8 mx-auto"
          style={{ maxWidth: 520, fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}
        >
          Sign up as a Travel Agent or Corporate client. Tell us a bit about your business and
          upload your documents — our team will verify and get you onboarded.
        </p>

        <TornEdge fill="var(--cream)" position="bottom" />
      </section>

      {/* FORM */}
      <section
        className="relative w-full"
        style={{ background: "var(--cream)", padding: "80px 24px 140px" }}
      >
        <div
          style={{
            maxWidth: 640,
            margin: "0 auto",
            background: "#fff",
            borderRadius: 20,
            boxShadow: "0 12px 40px rgba(28,20,16,0.08)",
            border: "1px solid rgba(212,201,190,0.5)",
          }}
        >
          <RegistrationForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
