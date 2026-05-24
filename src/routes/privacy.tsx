import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "@/components/Nav";
import { ScrollLineV } from "@/components/ScrollLineV";
import { Footer } from "@/components/Sections";
import { TornEdge } from "@/components/TornEdge";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    title: "Information We Collect",
    body: "When you contact us or use our services, we may collect basic personal details such as your name, phone number, email address, and booking information. This data is collected only when you voluntarily provide it — for example, when submitting an enquiry form, requesting a demo, or engaging with our platform.",
  },
  {
    title: "How We Use Your Information",
    body: "Your information is used exclusively to respond to your enquiries, process bookings, deliver our travel management services, and improve the quality of the Ozonex platform. We do not use your data for unsolicited marketing, and we do not build advertising profiles from your usage.",
  },
  {
    title: "Data Sharing",
    body: "We do not sell, rent, or share your personal data with third parties for their own purposes. Data may be shared only where strictly necessary to complete your travel services — for example, with airlines, hotels, or visa authorities as part of a confirmed booking — or where required by applicable law.",
  },
  {
    title: "Data Security",
    body: "Your information is stored securely on protected servers. We take reasonable technical and organisational steps to protect it from unauthorised access, disclosure, alteration, or destruction. However, as with any online platform, we cannot guarantee absolute security and encourage you to use strong, unique passwords for any account access.",
  },
  {
    title: "Cookies & Analytics",
    body: "Our website may use cookies or similar technologies to understand how visitors use the site and to improve your experience. These do not collect personally identifiable information. You can disable cookies through your browser settings at any time, though this may affect some functionality.",
  },
  {
    title: "Your Rights",
    body: "You have the right to request access to the personal data we hold about you, to ask for corrections, or to request deletion where permitted by law. To exercise any of these rights, contact us at tresaj@ozonegroupglobal.com and we will respond within a reasonable timeframe.",
  },
  {
    title: "Changes to This Policy",
    body: "We may update this Privacy Policy from time to time to reflect changes in our practices or applicable regulations. The latest version will always be available on this page. We encourage you to review it periodically.",
  },
  {
    title: "Contact Us",
    body: "If you have any questions about this Privacy Policy or how your data is handled, please contact us at tresaj@ozonegroupglobal.com or write to us at our head office: T.C. No.98/3632(1), Surya Hills, near Technopark, Kazhakkoottam PO, Trivandrum, Kerala 695582, India.",
  },
];

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Ozonex" },
      {
        name: "description",
        content:
          "Ozonex Privacy Policy — how we collect, use, and protect your personal information.",
      },
      { property: "og:title", content: "Privacy Policy | Ozonex" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://ozonex.com/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-eyebrow", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" });
      gsap.fromTo(".hero-word", { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.07, delay: 0.35 });
      gsap.fromTo(".hero-fade", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.15, delay: 0.9 });
      gsap.fromTo(".policy-section", { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.1,
        scrollTrigger: { trigger: ".policy-body", start: "top 85%" },
      });
    });

    return () => { ctx.revert(); lenis.destroy(); ScrollTrigger.getAll().forEach((s) => s.kill()); };
  }, []);

  return (
    <main className="relative">
      <Nav />
      <ScrollLineV />

      {/* HERO */}
      <section className="relative w-full min-h-[55vh] overflow-hidden grid-overlay flex flex-col items-center justify-center text-center px-6 py-36" style={{ background: "var(--ink)" }}>
        <span className="absolute left-12 top-1/2 -translate-y-1/2 text-2xl select-none z-10" style={{ color: "#fff", opacity: 0.2 }}>✦</span>
        <span className="absolute right-12 top-1/2 -translate-y-1/2 text-2xl select-none z-10" style={{ color: "#fff", opacity: 0.2 }}>✦</span>

        <div className="hero-eyebrow eyebrow" style={{ color: "rgba(255,255,255,0.45)" }}>Legal</div>

        <h1 className="font-display mt-8 text-white" style={{ fontSize: "clamp(40px,6vw,72px)", lineHeight: 0.95 }}>
          {[["Privacy", "Policy"]].map((line, i) => (
            <span key={i} className="block">
              {line.map((w, j) => (
                <span key={j} className="hero-word inline-block mr-3">{w}</span>
              ))}
            </span>
          ))}
        </h1>

        <p className="hero-fade mt-8 mx-auto" style={{ maxWidth: 480, fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>
          Ozonex by Ozone Tourism and Travel — how we collect, use, and protect your personal information.
        </p>

        <p className="hero-fade mt-4" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em" }}>
          LAST UPDATED: JANUARY 2025
        </p>

        <TornEdge fill="var(--cream)" position="bottom" />
      </section>

      {/* POLICY BODY */}
      <section className="policy-body relative w-full" style={{ background: "var(--cream)", padding: "100px 24px 140px" }}>
        {/* Intro */}
        <div className="max-w-[820px] mx-auto mb-16">
          <div style={{ background: "var(--ink)", borderRadius: 16, padding: "36px 40px" }}>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.85, fontFamily: "Poppins, sans-serif" }}>
              We value your privacy and are committed to protecting your personal information. This policy explains what we collect, how we use it, and the choices you have. By using our website or services, you agree to the practices described below.
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="max-w-[820px] mx-auto flex flex-col gap-0">
          {sections.map((s, i) => (
            <div
              key={s.title}
              className="policy-section"
              style={{
                borderBottom: i < sections.length - 1 ? "1px solid rgba(212,201,190,0.5)" : "none",
                padding: "48px 0",
              }}
            >
              <div className="flex gap-6 items-start">
                <span className="font-display" style={{ fontSize: 36, color: "rgba(28,20,16,0.08)", lineHeight: 1, minWidth: 48, marginTop: 4 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="font-display" style={{ fontSize: "clamp(20px,2.5vw,26px)", color: "var(--ink)", marginBottom: 16 }}>{s.title}</h2>
                  <p style={{ fontSize: 15, color: "var(--muted-warm)", lineHeight: 1.85 }}>{s.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="max-w-[820px] mx-auto mt-16 text-center">
          <p style={{ fontSize: 13, color: "var(--muted-warm)", lineHeight: 1.7 }}>
            Questions? Email us at{" "}
            <a href="mailto:tresaj@ozonegroupglobal.com" style={{ color: "var(--ink)", textDecoration: "underline" }}>
              tresaj@ozonegroupglobal.com
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
