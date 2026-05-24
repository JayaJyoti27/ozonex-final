import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import enterprises from "@/assets/who-enterprises.jpg";
import hr from "@/assets/who-hr.jpg";
import exec from "@/assets/who-exec.jpg";
import cta from "@/assets/cta-skyline.jpg";

gsap.registerPlugin(ScrollTrigger);

/* ─── WHO SECTION ─── */
export function WhoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".who-card", { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".who-cards", start: "top 78%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const cards = [
    { img: enterprises, label: "Enterprises & MNCs", desc: "Multi-entity policy, consolidated reporting, ERP integration." },
    { img: hr, label: "HR & Finance Teams", desc: "Duty of care, approval automation, GL-ready expense data." },
    { img: exec, label: "SMBs & Startups", desc: "Enterprise-grade travel control without the enterprise price tag." },
  ];

  return (
    <section ref={sectionRef} style={{ background: "#F5F0EA", padding: "160px 80px" }}>
      <div className="max-w-[1320px] mx-auto">
        <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#2563EB", fontWeight: 500, marginBottom: 16 }}>
          Who Ozonex is Built For
        </div>
        <h2 className="font-display" style={{ fontSize: "clamp(40px,5vw,64px)", color: "#1C1410", fontWeight: 300, lineHeight: 0.92 }}>
          BUILT FOR EVERY<br />TEAM THAT TRAVELS.
        </h2>
        <div className="who-cards grid grid-cols-1 md:grid-cols-3" style={{ gap: 2, marginTop: 80 }}>
          {cards.map((c) => (
            <div key={c.label} className="who-card relative overflow-hidden group" style={{ aspectRatio: "3/4" }}>
              <img src={c.img} alt={c.label} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(28,20,16,0.85) 0%, transparent 60%)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>{c.label}</div>
                <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 48, textAlign: "center" }}>
          <a href="/solutions" style={{ fontFamily: "Poppins, sans-serif", fontSize: 12, color: "#2563EB", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500 }}>
            Explore all solutions →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── GLOBAL CTA ─── */
export function GlobalCTA() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".gcta-bg", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.fromTo(".gcta-word", { y: 80, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 60%" },
      });
      gsap.fromTo(".gcta-sub", { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, delay: 0.5, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 60%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden grid-overlay" style={{ background: "#1C1410", minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="gcta-bg absolute inset-0" style={{ backgroundImage: `url(${cta})`, backgroundSize: "cover", backgroundPosition: "center", willChange: "transform" }} />
      <div className="absolute inset-0" style={{ background: "rgba(28,20,16,0.72)" }} />
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h2 className="font-display text-white" style={{ fontSize: "clamp(56px,8vw,88px)", lineHeight: 0.9, fontWeight: 300 }}>
          {[["SEE", "OZONEX"], ["IN", "ACTION."]].map((line, i) => (
            <span key={i} className="block">
              {line.map((w, j) => (
                <span key={j} className="gcta-word inline-block mr-4">{w}</span>
              ))}
            </span>
          ))}
        </h2>
        <p className="gcta-sub mx-auto" style={{ fontFamily: "Poppins, sans-serif", fontSize: 17, color: "rgba(255,255,255,0.7)", maxWidth: 520, lineHeight: 1.75, marginTop: 32 }}>
          Tell us your team size and travel challenges. We'll show you exactly how Ozonex would work for your operation.
        </p>
        <a
          href="/pricing#enquire"
          className="gcta-sub inline-block"
          style={{
            background: "#2563EB",
            color: "#fff",
            borderRadius: 50,
            padding: "16px 52px",
            fontFamily: "Poppins, sans-serif",
            fontSize: 12,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontWeight: 500,
            marginTop: 40,
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#3B82F6")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#2563EB")}
        >
          Book a Free Demo
        </a>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
export function Footer() {
  const officesCol1 = [
    { city: "Trivandrum (HQ)", address: "Ozone Tourism and Travel, Trivandrum, Kerala", phone: "+91 471 000 0000" },
    { city: "Chennai", address: "Ozone Tourism and Travel, Chennai, Tamil Nadu", phone: "+91 44 000 0000" },
    { city: "Cochin", address: "Ozone Tourism and Travel, Cochin, Kerala", phone: "+91 484 000 0000" },
  ];
  const officesCol2 = [
    { city: "Delhi", address: "Ozone Tourism and Travel, New Delhi", phone: "+91 11 000 0000" },
    { city: "Dubai", address: "Ozone Tourism and Travel, Dubai, UAE", phone: "+971 4 000 0000" },
    { city: "Kuwait", address: "Ozone Tourism and Travel, Kuwait City, Kuwait", phone: "+965 000 0000" },
  ];

  const footerLinks = [
    { label: "Home", href: "/" },
    { label: "Product", href: "/product" },
    { label: "Solutions", href: "/solutions" },
    { label: "MICE & Events", href: "/mice-events" },
    { label: "Pricing", href: "/pricing" },
    { label: "About Us", href: "/about" },
    { label: "Privacy Policy", href: "/privacy" },
  ];

  const cityLinks = [
    { label: "Bangalore", href: "/cities/bangalore" },
    { label: "Chennai", href: "/cities/chennai" },
    { label: "Delhi", href: "/cities/delhi" },
  ];

  const socials = [
    { label: "Facebook", href: "https://www.facebook.com/OzoneGroupGlobal" },
    { label: "Instagram", href: "https://www.instagram.com/ozonegroupglobal" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/ozone-group-global" },
    { label: "YouTube", href: "https://www.youtube.com/@ozonegroupglobal" },
  ];

  return (
    <footer style={{ background: "#1C1410", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "100px 80px 40px" }}>
      <div className="max-w-[1320px] mx-auto">

        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-5" style={{ gap: 60, paddingBottom: 80, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="font-display text-white" style={{ fontSize: 28, fontWeight: 300, letterSpacing: "0.05em", marginBottom: 16 }}>OZONEX</div>
            <p style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: 240, marginBottom: 24 }}>
              Corporate travel management built for enterprises, HR teams, finance, and growing businesses.
            </p>
            <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
              IATA Certified · Est. 2014
            </div>
            <div className="flex flex-wrap" style={{ gap: 16, marginTop: 20 }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: "Poppins, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", textTransform: "uppercase", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 24, fontWeight: 500 }}>
              Navigation
            </div>
            <div className="flex flex-col" style={{ gap: 14 }}>
              {footerLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.6)", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* City Pages */}
          <div>
            <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 24, fontWeight: 500 }}>
              Cities
            </div>
            <div className="flex flex-col" style={{ gap: 14 }}>
              {cityLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.6)", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Offices col 1 */}
          <div>
            <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 24, fontWeight: 500 }}>
              Offices
            </div>
            <div className="flex flex-col" style={{ gap: 24 }}>
              {officesCol1.map((o) => (
                <div key={o.city}>
                  <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, color: "#fff", fontWeight: 500, marginBottom: 4 }}>{o.city}</div>
                  <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{o.address}</div>
                  <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{o.phone}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact + Offices col 2 */}
          <div>
            <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 24, fontWeight: 500 }}>
              Contact
            </div>
            <div className="flex flex-col" style={{ gap: 12, marginBottom: 32 }}>
              <a href="mailto:tresaj@ozonegroupglobal.com" style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.6)", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}>
                tresaj@ozonegroupglobal.com
              </a>
              <a href="https://wa.me/918139831118" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.6)", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}>
                WhatsApp: +91 81398 31118
              </a>
              <a href="/pricing#enquire" style={{ fontFamily: "Poppins, sans-serif", fontSize: 12, color: "#2563EB", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500, marginTop: 8 }}>
                Enquire Now →
              </a>
            </div>
            <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 16, fontWeight: 500 }}>
              More Offices
            </div>
            {officesCol2.map((o) => (
              <div key={o.city} style={{ marginBottom: 20 }}>
                <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, color: "#fff", fontWeight: 500, marginBottom: 4 }}>{o.city}</div>
                <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{o.address}</div>
                <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{o.phone}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-wrap items-center justify-between" style={{ paddingTop: 32, gap: 16 }}>
          <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
            © {new Date().getFullYear()} Ozonex by Ozone Tourism and Travel. All rights reserved.
          </div>
          <div className="flex items-center" style={{ gap: 24 }}>
            <a href="/privacy" style={{ fontFamily: "Poppins, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.35)", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}>
              Privacy Policy
            </a>
            <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 12 }}>·</span>
            <a href="/pricing#enquire" style={{ fontFamily: "Poppins, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.35)", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}>
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
