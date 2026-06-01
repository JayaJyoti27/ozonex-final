import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "@/components/Nav";
import { ScrollLineV } from "@/components/ScrollLineV";
import { Footer } from "@/components/Sections";
import { TornEdge } from "@/components/TornEdge";

gsap.registerPlugin(ScrollTrigger);

const CONTACT_EMAIL = "tresaj@ozonegroupglobal.com";

const offices = [
  {
    city: "Trivandrum",
    flag: "🇮🇳",
    detail: "Head Office — Surya Hills, near Technopark, Kazhakkoottam PO, Kerala 695582",
    phone: "+91 471 3500 598",
  },
  {
    city: "Chennai",
    flag: "🇮🇳",
    detail: "New No. 12, First Floor, Thambiah Road, West Mambalam, Chennai 600033",
    phone: "+91 44 3130 2651",
  },
  {
    city: "Cochin",
    flag: "🇮🇳",
    detail: "Praveen Chandran Building, Pipeline JN, Palarivattam, Ernakulam, Kerala 682024",
    phone: "+91 9605766200",
  },
  {
    city: "Delhi",
    flag: "🇮🇳",
    detail: "2-A/3, S/F Front Side, Kundan Mansion, Asaf Ali Road, Turkman Gate, New Delhi 110002",
    phone: "+91 92092 86872",
  },
  {
    city: "Dubai",
    flag: "🇦🇪",
    detail:
      "Shop No. 51, Al Durrah Tower, Trade Center First, Sheikh Zayed Rd, Opp Museum of the Future",
    phone: "+971 56 455 7700",
  },
  { city: "Kuwait", flag: "🇰🇼", detail: "Kuwait City, Kuwait", phone: "" },
];

const teamSizes = ["1–50 travellers", "51–200 travellers", "201–500 travellers", "500+ travellers"];
const services = [
  "Corporate Travel Management",
  "Flight Booking",
  "Hotel Booking",
  "Visa Assistance",
  "MICE",
  "Other",
];

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  teamSize: string;
  service: string;
  message: string;
};

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Get a Custom Quote | Ozonex" },
      {
        name: "description",
        content:
          "Ozonex pricing is tailored to your organisation. Tell us about your travel programme and we'll build a plan that fits your team size, policy complexity, and budget.",
      },
      { property: "og:title", content: "Get a Custom Quote | Ozonex" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://ozonex.com/pricing" }],
  }),
  component: PricingPage,
});

function PricingPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    company: "",
    email: "",
    phone: "",
    teamSize: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

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
      gsap.fromTo(
        ".form-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".form-card", start: "top 80%" },
        },
      );
      gsap.fromTo(
        ".info-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".info-section", start: "top 80%" },
        },
      );
      gsap.fromTo(
        ".office-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".offices-section", start: "top 80%" },
        },
      );
    });

    // Scroll to #enquire if hash is present
    if (window.location.hash === "#enquire") {
      setTimeout(() => {
        const el = document.getElementById("enquire");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 600);
    }

    return () => {
      ctx.revert();
      lenis.destroy();
      ScrollTrigger.getAll().forEach((s) => s.kill());
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");

    const body = [
      `Name: ${form.name}`,
      `Company: ${form.company}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Team Size: ${form.teamSize}`,
      `Service: ${form.service}`,
      `Message: ${form.message}`,
    ].join("\n");

    const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=Ozonex Enquiry from ${encodeURIComponent(form.name)} — ${encodeURIComponent(form.company)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    setStatus("sent");
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(212,201,190,0.25)",
    borderRadius: 8,
    padding: "14px 18px",
    fontSize: 15,
    color: "var(--ink)",
    fontFamily: "Poppins, sans-serif",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 11,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--muted-warm)",
    marginBottom: 8,
    display: "block",
  };

  return (
    <main className="relative">
      <Nav />
      <ScrollLineV />

      {/* HERO */}
      <section
        className="relative w-full min-h-[70vh] overflow-hidden grid-overlay flex flex-col items-center justify-center text-center px-6 py-40"
        style={{ background: "var(--ink)" }}
      >
        <span
          className="absolute left-12 top-1/2 -translate-y-1/2 text-2xl select-none z-10"
          style={{ color: "#fff", opacity: 0.25 }}
        >
          ✦
        </span>
        <span
          className="absolute right-12 top-1/2 -translate-y-1/2 text-2xl select-none z-10"
          style={{ color: "#fff", opacity: 0.25 }}
        >
          ✦
        </span>

        <div className="hero-eyebrow eyebrow" style={{ color: "rgba(255,255,255,0.5)" }}>
          Pricing & Enquiries
        </div>

        <h1
          className="font-display mt-8 text-white"
          style={{ fontSize: "clamp(48px,7vw,88px)", lineHeight: 0.95 }}
        >
          {[
            ["Pricing", "built"],
            ["around", "you."],
          ].map((line, i) => (
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
          className="hero-fade mt-10 mx-auto"
          style={{ maxWidth: 520, fontSize: 17, color: "rgba(255,255,255,0.65)", lineHeight: 1.8 }}
        >
          No off-the-shelf tiers. Every Ozonex plan is tailored to your organisation's size, travel
          policy complexity, and operational requirements. Tell us about your programme and we'll
          get back within one business day.
        </p>

        <div
          className="hero-fade mt-8 flex flex-wrap justify-center gap-6"
          style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em" }}
        >
          {["IATA Accredited", "Est. 2014", "6 Offices"].map((t) => (
            <span key={t} className="flex items-center gap-2">
              <span style={{ color: "var(--gold)" }}>✦</span> {t}
            </span>
          ))}
        </div>

        <TornEdge fill="var(--cream)" position="bottom" />
      </section>

      {/* FORM + SIDE INFO — id="enquire" for anchor links */}
      <section
        id="enquire"
        className="relative w-full"
        style={{ background: "var(--cream)", padding: "100px 24px 120px", scrollMarginTop: "80px" }}
      >
        <div className="max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 items-start">
          {/* FORM */}
          <div
            className="form-card"
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: "56px 48px",
              boxShadow: "0 4px 40px rgba(28,20,16,0.08)",
            }}
          >
            <div className="eyebrow" style={{ color: "var(--gold)" }}>
              Send us an enquiry
            </div>
            <h2
              className="font-display mt-4"
              style={{ fontSize: "clamp(28px,3vw,40px)", color: "var(--ink)", lineHeight: 1.1 }}
            >
              Let's talk about
              <br />
              your travel programme
            </h2>
            <p
              className="mt-4"
              style={{ fontSize: 14, color: "var(--muted-warm)", lineHeight: 1.7 }}
            >
              Fill in the form and a member of our enterprise team will reach out within one
              business day.
            </p>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label style={labelStyle}>Full Name *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jane Smith"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Company Name</label>
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Acme Corp"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Work Email *</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jane@company.com"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Phone Number</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Approximate Team Size</label>
                <select
                  name="teamSize"
                  value={form.teamSize}
                  onChange={handleChange}
                  style={inputStyle}
                >
                  <option value="">Select range</option>
                  {teamSizes.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Service Interested In</label>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  style={inputStyle}
                >
                  <option value="">Select service</option>
                  {services.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label style={labelStyle}>Tell us about your requirements *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Describe your current travel challenges, average monthly trips, destinations, or anything else you'd like us to know..."
                  rows={5}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <button
                onClick={handleSubmit}
                disabled={status === "sending" || status === "sent"}
                style={{
                  background: status === "sent" ? "#16a34a" : "var(--ink)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 999,
                  padding: "16px 40px",
                  fontSize: 14,
                  fontFamily: "Poppins, sans-serif",
                  letterSpacing: "0.05em",
                  cursor: status === "sent" ? "default" : "pointer",
                  transition: "background 0.2s",
                }}
              >
                {status === "idle" && "Send Enquiry →"}
                {status === "sending" && "Opening mail client…"}
                {status === "sent" && "✓ Enquiry sent"}
                {status === "error" && "Try again"}
              </button>
              <p
                style={{ fontSize: 12, color: "var(--muted-warm)", lineHeight: 1.6, maxWidth: 280 }}
              >
                By submitting, you agree to our{" "}
                <a href="/privacy" style={{ color: "var(--ink)", textDecoration: "underline" }}>
                  Privacy Policy
                </a>
                . We'll never share your data.
              </p>
            </div>
          </div>

          {/* SIDE INFO */}
          <div className="info-section flex flex-col gap-8">
            <div
              className="info-card"
              style={{ background: "var(--ink)", borderRadius: 16, padding: "36px 32px" }}
            >
              <div className="eyebrow" style={{ color: "rgba(255,255,255,0.45)" }}>
                Direct contact
              </div>
              <h3 className="font-display text-white mt-3" style={{ fontSize: 24 }}>
                Prefer to talk?
              </h3>
              <div className="mt-6 flex flex-col gap-5">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-start gap-3"
                  style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, textDecoration: "none" }}
                >
                  <span style={{ color: "var(--gold)", marginTop: 2 }}>✉</span>
                  <span>{CONTACT_EMAIL}</span>
                </a>
                <a
                  href="https://wa.me/918139831118?text=Hi%2C%20I%20want%20to%20know%20more%20about%20the%20OzoneX%20Platform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3"
                  style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, textDecoration: "none" }}
                >
                  <span style={{ color: "var(--gold)", marginTop: 2 }}>💬</span>
                  <span>WhatsApp: +91 81398 31118</span>
                </a>
                <a
                  href="tel:+914713500598"
                  className="flex items-start gap-3"
                  style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, textDecoration: "none" }}
                >
                  <span style={{ color: "var(--gold)", marginTop: 2 }}>✆</span>
                  <span>+91 471 3500 598 (HQ)</span>
                </a>
              </div>
            </div>

            <div
              className="info-card"
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: "36px 32px",
                boxShadow: "0 2px 20px rgba(28,20,16,0.06)",
              }}
            >
              <div className="eyebrow" style={{ color: "var(--gold)" }}>
                What happens next
              </div>
              <div className="mt-6 flex flex-col gap-5">
                {[
                  ["01", "We review your requirements within 1 business day."],
                  ["02", "An enterprise consultant calls to understand your programme."],
                  ["03", "You receive a tailored proposal with transparent pricing."],
                ].map(([n, t]) => (
                  <div key={n} className="flex gap-4">
                    <span
                      className="font-display"
                      style={{
                        fontSize: 28,
                        color: "var(--ink)",
                        opacity: 0.15,
                        lineHeight: 1,
                        minWidth: 36,
                      }}
                    >
                      {n}
                    </span>
                    <p style={{ fontSize: 14, color: "var(--muted-warm)", lineHeight: 1.7 }}>{t}</p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="info-card"
              style={{
                borderRadius: 16,
                padding: "28px 32px",
                border: "1px solid rgba(212,201,190,0.5)",
              }}
            >
              <div className="flex flex-wrap gap-4">
                {["IATA Accredited", "Est. 2014", "9 Markets", "24/7 Support"].map((b) => (
                  <span
                    key={b}
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.08em",
                      color: "var(--muted-warm)",
                      background: "rgba(28,20,16,0.04)",
                      borderRadius: 999,
                      padding: "6px 14px",
                    }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OFFICES */}
      <section
        className="offices-section relative w-full overflow-hidden"
        style={{ background: "var(--ink)", padding: "120px 24px" }}
      >
        <TornEdge fill="var(--ink)" position="top" />

        <div className="text-center max-w-[1320px] mx-auto">
          <div className="eyebrow" style={{ color: "rgba(255,255,255,0.4)" }}>
            Our offices
          </div>
          <h2
            className="font-display mt-6 text-white"
            style={{ fontSize: "clamp(36px,4vw,56px)", lineHeight: 1.05 }}
          >
            We're where
            <br />
            your business travels
          </h2>
        </div>

        <div className="max-w-[1320px] mx-auto mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offices.map((o) => (
            <div
              key={o.city}
              className="office-card"
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 16,
                padding: "32px 28px",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span style={{ fontSize: 24 }}>{o.flag}</span>
                <span className="font-display text-white" style={{ fontSize: 20 }}>
                  {o.city}
                </span>
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.7,
                  marginBottom: 12,
                }}
              >
                {o.detail}
              </p>
              {o.phone && (
                <a
                  href={`tel:${o.phone.replace(/\s/g, "")}`}
                  style={{ fontSize: 13, color: "var(--gold)", textDecoration: "none" }}
                >
                  {o.phone}
                </a>
              )}
            </div>
          ))}
        </div>

        <TornEdge fill="var(--cream)" position="bottom" />
      </section>

      <Footer />
    </main>
  );
}
