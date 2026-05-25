import { useEffect, useRef } from "react";
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

  const cards = [
    { img: enterprises, label: "Enterprises & MNCs", desc: "Multi-entity policy, consolidated reporting, ERP integration." },
    { img: hr, label: "HR & Finance Teams", desc: "Duty of care, approval automation, GL-ready expense data." },
    { img: exec, label: "SMBs & Startups", desc: "Enterprise-grade travel control without the enterprise price tag." },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".who-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="who-section">
      <div className="max-w-[1320px] mx-auto">
        <div className="who-eyebrow">
          Who Ozonex is Built For
        </div>
        <h2 className="font-display who-heading">
          BUILT FOR EVERY<br />TEAM THAT TRAVELS.
        </h2>
        <div className="who-cards who-grid">
          {cards.map((c) => (
            <div key={c.label} className="who-card relative overflow-hidden group who-card-wrap">
              <img
                src={c.img}
                alt={c.label}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(28,20,16,0.88) 0%, rgba(28,20,16,0.2) 60%, transparent 100%)" }} />
              <div className="absolute bottom-0 left-0 right-0 who-card-content">
                <div className="who-card-label">{c.label}</div>
                <p className="who-card-desc">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="who-cta-row">
          <a href="/solutions" className="who-cta-link">
            Explore all solutions →
          </a>
        </div>
      </div>

      <style>{`
        /* ── WHO SECTION ── */
        .who-section {
          background: #F5F0EA;
          padding: 160px 80px;
        }
        .who-eyebrow {
          font-family: Poppins, sans-serif;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #2563EB;
          font-weight: 500;
          margin-bottom: 16px;
        }
        .who-heading {
          font-size: clamp(40px, 5vw, 64px);
          color: #1C1410;
          font-weight: 300;
          line-height: 0.92;
        }
        .who-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          margin-top: 80px;
        }
        .who-card-wrap {
          aspect-ratio: 3/4;
        }
        .who-card-content {
          padding: 32px;
        }
        .who-card-label {
          font-family: Poppins, sans-serif;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
          margin-bottom: 8px;
        }
        .who-card-desc {
          font-family: Poppins, sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.8);
          line-height: 1.6;
        }
        .who-cta-row {
          margin-top: 48px;
          text-align: center;
        }
        .who-cta-link {
          font-family: Poppins, sans-serif;
          font-size: 12px;
          color: #2563EB;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 500;
        }

        /* ── TABLET ── */
        @media (max-width: 1024px) {
          .who-section {
            padding: 120px 40px;
          }
          .who-grid {
            margin-top: 60px;
          }
        }

        
      `}</style>
    </section>
  );
}

/* ─── GLOBAL CTA ─── */
export function GlobalCTA() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      if (!isMobile) {
        gsap.to(".gcta-bg", {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      gsap.fromTo(
        ".gcta-word",
        { y: isMobile ? 20 : 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: isMobile ? 0.6 : 1,
          stagger: isMobile ? 0.04 : 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".gcta-sub",
        { y: isMobile ? 10 : 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay: isMobile ? 0.2 : 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="gcta-section relative overflow-hidden grid-overlay">
      <div
        className="gcta-bg absolute inset-0"
        style={{ backgroundImage: `url(${cta})`, backgroundSize: "cover", backgroundPosition: "center", willChange: "transform" }}
      />
      <div className="absolute inset-0" style={{ background: "rgba(28,20,16,0.72)" }} />
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto gcta-inner">
        <h2 className="font-display text-white gcta-heading">
          {[["SEE", "OZONEX"], ["IN", "ACTION."]].map((line, i) => (
            <span key={i} className="block">
              {line.map((w, j) => (
                <span key={j} className="gcta-word inline-block mr-4">{w}</span>
              ))}
            </span>
          ))}
        </h2>
        <p className="gcta-sub gcta-body">
          Tell us your team size and travel challenges. We'll show you exactly how Ozonex would work for your operation.
        </p>
        <a
          href="/pricing#enquire"
          className="gcta-sub gcta-btn inline-block"
          onMouseEnter={(e) => (e.currentTarget.style.background = "#3B82F6")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#2563EB")}
        >
          Book a Free Demo
        </a>
      </div>

      <style>{`
        /* ── GLOBAL CTA ── */
        .gcta-section {
          background: #1C1410;
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .gcta-inner {
          padding: 80px 0;
        }
        .gcta-heading {
          font-size: clamp(56px, 8vw, 88px);
          line-height: 0.9;
          font-weight: 300;
        }
        .gcta-body {
          font-family: Poppins, sans-serif;
          font-size: 17px;
          color: rgba(255,255,255,0.7);
          max-width: 520px;
          line-height: 1.75;
          margin: 32px auto 0;
        }
        .gcta-btn {
          background: #2563EB;
          color: #fff;
          border-radius: 50px;
          padding: 16px 52px;
          font-family: Poppins, sans-serif;
          font-size: 12px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 500;
          margin-top: 40px;
          transition: background 0.2s;
          text-decoration: none;
        }

       
      `}</style>
    </section>
  );
}

/* ─── FOOTER ─── */
export function Footer() {
  const officeLocations = ["Trivandrum", "Chennai", "Cochin", "Delhi", "Dubai", "Kuwait"];

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
    { label: "Bangalore", href: "/corporate-travel-management-bangalore" },
    { label: "Chennai", href: "/corporate-travel-management-chennai" },
    { label: "Delhi", href: "/corporate-travel-management-delhi" },
  ];

  return (
    <footer className="site-footer">
      <div className="max-w-[1320px] mx-auto">

        {/* Top grid */}
        <div className="footer-grid">

          {/* Brand */}
          <div className="footer-brand">
            <div className="font-display footer-logo">OZONEX</div>
            <p className="footer-tagline">
              Corporate travel management built for enterprises, HR teams, finance, and growing businesses.
            </p>
            <div className="footer-cert">IATA Certified · Est. 2014</div>
          </div>

          {/* Navigation */}
          <div className="footer-col">
            <div className="footer-col-heading">Navigation</div>
            <div className="footer-links">
              {footerLinks.map((l) => (
                <a key={l.href} href={l.href} className="footer-link">
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Cities */}
          <div className="footer-col">
            <div className="footer-col-heading">Cities</div>
            <div className="footer-links">
              {cityLinks.map((l) => (
                <a key={l.href} href={l.href} className="footer-link">
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Offices */}
          <div className="footer-col">
            <div className="footer-col-heading">Offices</div>
            <div className="footer-links">
              {officeLocations.map((city) => (
                <div key={city} className="footer-office">{city}</div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <div className="footer-col-heading">Contact</div>
            <div className="footer-links">
              <a href="mailto:tresaj@ozonegroupglobal.com" className="footer-link footer-email">
                tresaj@ozonegroupglobal.com
              </a>
              <a href="https://wa.me/918139831118" target="_blank" rel="noopener noreferrer" className="footer-link">
                WhatsApp: +91 81398 31118
              </a>
              <a href="/pricing#enquire" className="footer-enquire">
                Enquire Now →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            © {new Date().getFullYear()} Ozonex by Ozone Tourism and Travel. All rights reserved.
          </div>
          <div className="footer-bottom-links">
            <a href="/privacy" className="footer-bottom-link">Privacy Policy</a>
            <span className="footer-dot">·</span>
            <a href="/pricing#enquire" className="footer-bottom-link">Contact</a>
          </div>
        </div>
      </div>

      <style>{`
        /* ── FOOTER BASE ── */
        .site-footer {
          background: #1C1410;
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 100px 80px 40px;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr;
          gap: 60px;
          padding-bottom: 80px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .footer-logo {
          font-size: 28px;
          color: white;
          font-weight: 300;
          letter-spacing: 0.05em;
          margin-bottom: 16px;
        }
        .footer-tagline {
          font-family: Poppins, sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          line-height: 1.7;
          max-width: 240px;
          margin-bottom: 24px;
        }
        .footer-cert {
          font-family: Poppins, sans-serif;
          font-size: 11px;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .footer-col-heading {
          font-family: Poppins, sans-serif;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 24px;
          font-weight: 500;
        }
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .footer-link {
          font-family: Poppins, sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-link:hover { color: #fff; }
        .footer-email {
          word-break: break-all;
        }
        .footer-office {
          font-family: Poppins, sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.6);
        }
        .footer-enquire {
          font-family: Poppins, sans-serif;
          font-size: 12px;
          color: #2563EB;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 500;
          margin-top: 8px;
          text-decoration: none;
        }
        .footer-bottom {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          padding-top: 32px;
          gap: 16px;
        }
        .footer-copyright {
          font-family: Poppins, sans-serif;
          font-size: 12px;
          color: rgba(255,255,255,0.3);
        }
        .footer-bottom-links {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .footer-bottom-link {
          font-family: Poppins, sans-serif;
          font-size: 12px;
          color: rgba(255,255,255,0.35);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-bottom-link:hover { color: #fff; }
        .footer-dot {
          color: rgba(255,255,255,0.15);
          font-size: 12px;
        }

        /* ── TABLET (max 1024px) ── */
        @media (max-width: 1024px) {
          .site-footer {
            padding: 80px 40px 32px;
          }
          .footer-grid {
            grid-template-columns: 1fr 1fr 1fr;
            gap: 40px;
          }
          .footer-brand {
            grid-column: 1 / -1;
            display: grid;
            grid-template-columns: auto 1fr 1fr;
            gap: 40px;
            align-items: start;
          }
          .footer-tagline {
            max-width: 100%;
          }
        }

        /* ── MOBILE (max 768px) ── */
        @media (max-width: 768px) {
          .site-footer {
            padding: 60px 20px 28px;
          }
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 36px;
            padding-bottom: 48px;
          }
          .footer-brand {
            grid-column: 1 / -1;
            display: block;
          }
          .footer-tagline {
            max-width: 100%;
            font-size: 13px;
          }
          .footer-col:nth-child(4),
          .footer-col:nth-child(5) {
            grid-column: auto;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
            padding-top: 24px;
          }
          .footer-copyright {
            font-size: 11px;
          }
          .footer-bottom-links {
            gap: 16px;
          }
        }

        /* ── SMALL MOBILE (max 480px) ── */
        @media (max-width: 480px) {
          .site-footer {
            padding: 48px 16px 24px;
          }
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .footer-brand,
          .footer-col {
            grid-column: 1 / -1;
          }
          .footer-logo {
            font-size: 24px;
          }
          .footer-col:nth-child(4) .footer-links {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 10px 20px;
          }
          .footer-office {
            font-size: 12px;
          }
          .footer-col-heading {
            margin-bottom: 16px;
          }
          .footer-links {
            gap: 12px;
          }
          .footer-bottom {
            gap: 10px;
          }
        }
      `}</style>
    </footer>
  );
}
