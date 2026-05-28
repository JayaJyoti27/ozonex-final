import { createFileRoute } from "@tanstack/react-router";
import { CityPage, type CityData } from "@/components/CityPage";
import hero from "@/assets/city-chennai-hero.jpg";
import s1 from "@/assets/city-chennai-s1.jpg";
import s2 from "@/assets/city-chennai-s2.jpg";
import s3 from "@/assets/city-chennai-s3.jpg";
import cta from "@/assets/city-chennai-cta.jpg";

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",

  name: "Corporate Travel Management Chennai",

  provider: {
    "@type": "Organization",
    name: "Ozonex",
  },

  areaServed: {
    "@type": "City",
    name: "Chennai",
  },

  description:
    "Enterprise corporate travel management software serving businesses in Chennai and Tamil Nadu.",

  url: "https://ozonex.com/corporate-travel-management-chennai",
};

const data: CityData = {
  city: "Chennai",

  eyebrow: "Corporate Travel Management · Chennai",

  hero: {
    image: hero,

    h1Lines: ["Chennai moves fast.", "Your travel platform", "should keep up."],

    sub: "Ozonex gives Chennai enterprises a single platform to book, approve, track, and reconcile every corporate journey.",
  },

  stats: [
    {
      num: "4,200+",
      label: "Active corporate travellers managed annually",
    },

    {
      num: "38 min",
      label: "Average trip approval time",
    },

    {
      num: "₹ 2.1 Cr",
      label: "Average annual travel spend managed",
    },

    {
      num: "92%",
      label: "Policy compliance rate",
    },
  ],

  why: {
    h2Lines: ["Built for the", "complexity", "Chennai runs on."],

    body: "Chennai is home to some of India's most travel-intensive industries. Ozonex handles approvals, compliance, and travel visibility in one platform.",

    keyStatNum: "68%",

    keyStatLabel:
      "of enterprise travel spend happens outside declared policy without a platform like Ozonex",

    cards: [
      {
        title: "Multi-Location Approvals",

        body: "Automatically route approvals to the right manager regardless of geography.",
      },

      {
        title: "Manufacturing Sector Complexity",

        body: "Manage recurring routes, preferred vendors, and per-diem policies automatically.",
      },

      {
        title: "Port & Logistics Coordination",

        body: "Accelerated workflows for urgent operational travel bookings.",
      },
    ],
  },

  industries: {
    h2Lines: ["Every sector that", "keeps Chennai moving."],

    tiles: [
      {
        title: "AUTOMOTIVE & MANUFACTURING",

        body: "Manage high-frequency plant visits, vendor trips, and executive travel.",
      },

      {
        title: "IT & TECHNOLOGY SERVICES",

        body: "International bookings, visa tracking, and automated per-diem management.",
      },

      {
        title: "BANKING & FINANCIAL SERVICES",

        body: "Strict policy compliance and audit-ready expense reporting.",
      },

      {
        title: "HEALTHCARE & PHARMA",

        body: "Field-force travel with live tracking and rapid rebooking support.",
      },

      {
        title: "LOGISTICS & SUPPLY CHAIN",

        body: "Same-day bookings and live traveller visibility across operations.",
      },

      {
        title: "ENGINEERING & INFRASTRUCTURE",

        body: "Project-site travel with automated project-code tracking.",
      },
    ],
  },

  how: {
    h2Lines: ["Up and running in", "Chennai in 3 weeks."],

    steps: [
      {
        title: "Onboard your organisation",

        body: "Connect HRIS, configure policies, and map approval structures quickly.",

        image: s1,
      },

      {
        title: "Your team books with guardrails",

        body: "Every booking is filtered automatically through live policy controls.",

        image: s2,
      },

      {
        title: "Finance closes fast",

        body: "Automated expense capture and audit-ready reporting for finance teams.",

        image: s3,
      },
    ],
  },

  testimonial: {
    quote: "Our policy compliance rate went from 61% to 94% in the first quarter.",

    attribution: "VP Operations, Automotive Components Manufacturer, Chennai",
  },

  cta: {
    image: cta,

    h2Lines: ["Ready to bring", "order to Chennai's", "corporate travel?"],

    body: "Book a live walkthrough built around your Chennai operation and travel workflows.",
  },
};

export const Route = createFileRoute("/corporate-travel-management-chennai")({
  head: () => ({
    meta: [
      {
        title: "Corporate Travel Management in Chennai | Ozonex",
      },

      {
        name: "description",

        content:
          "Ozonex delivers enterprise corporate travel management for Chennai-based companies.",
      },

      {
        property: "og:title",

        content: "Corporate Travel Management in Chennai | Ozonex",
      },

      {
        property: "og:description",

        content: "Enterprise corporate travel management software for Chennai businesses.",
      },

      {
        property: "og:type",

        content: "website",
      },
    ],

    links: [
      {
        rel: "canonical",

        href: "https://ozonex.com/corporate-travel-management-chennai",
      },
    ],

    scripts: [
      {
        type: "application/ld+json",

        children: JSON.stringify(schema),
      },
    ],
  }),

  component: () => (
    <>
      <style>{`
        /* =========================
           ROOT
        ========================= */

        :root {
          --container-padding: 24px;
        }

        @media (max-width: 768px) {
          :root {
            --container-padding: 20px;
          }
        }

        @media (max-width: 480px) {
          :root {
            --container-padding: 16px;
          }
        }

        /* =========================
           GLOBAL FIXES
        ========================= */

        html,
        body {
          overflow-x: hidden;
        }

        * {
          max-width: 100%;
          box-sizing: border-box;
        }

        img {
          width: 100%;
          max-width: 100%;
          height: auto;
          display: block;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p {
          word-break: break-word;
        }

        /* =========================
           SECTIONS
        ========================= */

        section {
          overflow-x: hidden;
          padding-top: clamp(72px, 8vw, 140px) !important;
          padding-bottom: clamp(72px, 8vw, 140px) !important;
        }

        @media (max-width: 480px) {
          section {
            padding-top: 56px !important;
            padding-bottom: 56px !important;
          }
        }

        /* =========================
           HERO
        ========================= */

        .city-hero,
        .hero-section {
          padding-left: var(--container-padding) !important;
          padding-right: var(--container-padding) !important;
        }

        .city-hero h1,
        .hero-section h1 {
          font-size: clamp(36px, 8vw, 88px) !important;
          line-height: 0.95 !important;
        }

        .city-hero p,
        .hero-section p {
          max-width: 760px !important;
          font-size: clamp(14px, 2vw, 17px) !important;
          line-height: 1.8 !important;
        }

        /* =========================
           STATS
        ========================= */

        .stats-grid,
        .city-stats-grid {
          display: grid !important;
          grid-template-columns: repeat(4, 1fr) !important;
          gap: 24px !important;
        }

        @media (max-width: 1024px) {
          .stats-grid,
          .city-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 480px) {
          .stats-grid,
          .city-stats-grid {
            grid-template-columns: 1fr !important;
            gap: 18px !important;
          }
        }

        /* =========================
           GRID LAYOUTS
        ========================= */

        .two-col-grid,
        .city-two-col-grid {
          display: grid !important;
          grid-template-columns: 1fr 1fr !important;
          gap: 56px !important;
        }

        @media (max-width: 992px) {
          .two-col-grid,
          .city-two-col-grid {
            grid-template-columns: 1fr !important;
            gap: 34px !important;
          }
        }

        /* =========================
           CARDS
        ========================= */

        .card-grid,
        .industry-grid,
        .services-grid,
        .city-card-grid {
          display: grid !important;
          grid-template-columns: repeat(3, 1fr) !important;
          gap: 24px !important;
        }

        @media (max-width: 1024px) {
          .card-grid,
          .industry-grid,
          .services-grid,
          .city-card-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 768px) {
          .card-grid,
          .industry-grid,
          .services-grid,
          .city-card-grid {
            grid-template-columns: 1fr !important;
            gap: 18px !important;
          }
        }

        .card,
        .industry-tile,
        .city-card {
          padding: 28px 24px !important;
          border-radius: 18px !important;
        }

        @media (max-width: 480px) {
          .card,
          .industry-tile,
          .city-card {
            padding: 22px 18px !important;
          }
        }

        /* =========================
           TYPOGRAPHY
        ========================= */

        h2,
        .section-heading {
          font-size: clamp(30px, 6vw, 58px) !important;
          line-height: 1 !important;
        }

        h3 {
          font-size: clamp(20px, 4vw, 30px) !important;
          line-height: 1.2 !important;
        }

        p,
        .body-copy,
        .section-copy {
          font-size: clamp(13px, 2vw, 16px) !important;
          line-height: 1.8 !important;
        }

        /* =========================
           CTA
        ========================= */

        .city-cta,
        .cta-section {
          padding-left: var(--container-padding) !important;
          padding-right: var(--container-padding) !important;
        }

        .cta-buttons {
          display: flex !important;
          flex-wrap: wrap !important;
          justify-content: center !important;
          gap: 16px !important;
        }

        @media (max-width: 768px) {
          .cta-buttons {
            flex-direction: column !important;
            align-items: center !important;
          }

          .cta-buttons a,
          .cta-buttons button {
            width: 100% !important;
            max-width: 320px !important;
          }
        }

        /* =========================
           IMAGES
        ========================= */

        .city-image,
        .step-image img {
          width: 100% !important;
          object-fit: cover !important;
          border-radius: 18px !important;
        }

        /* =========================
           MOBILE CENTER ALIGN
        ========================= */

        @media (max-width: 768px) {
          .mobile-center {
            text-align: center !important;
          }

          .mobile-center * {
            text-align: center !important;
          }
        }
      `}</style>

      <CityPage data={data} />
    </>
  ),
});
