import { createFileRoute } from "@tanstack/react-router";
import { CityPage, type CityData } from "@/components/CityPage";
import hero from "@/assets/city-delhi-hero.jpg";
import s1 from "@/assets/city-delhi-s1.jpg";
import s2 from "@/assets/city-delhi-s2.jpg";
import s3 from "@/assets/city-delhi-s3.jpg";
import cta from "@/assets/city-delhi-cta.jpg";

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Corporate Travel Management Delhi NCR",
  provider: { "@type": "Organization", name: "Ozonex" },
  areaServed: { "@type": "City", name: "Delhi" },
  description:
    "Corporate travel management software for Delhi, Noida, and Gurugram enterprises.",
  url: "https://ozonex.com/corporate-travel-management-delhi",
};

const data: CityData = {
  city: "Delhi NCR",
  eyebrow: "Corporate Travel Management · Delhi NCR",
  hero: {
    image: hero,
    h1Lines: ["The capital of Indian", "business needs a", "capital-grade platform."],
    sub: "Delhi, Noida, and Gurugram house India's largest corporate headquarters, government-linked enterprises, and multinational regional offices. Ozonex gives NCR's enterprises the control, compliance, and visibility their scale demands.",
  },
  stats: [
    { num: "14,000+", label: "Corporate travellers managed in Delhi NCR annually" },
    { num: "18 min", label: "Average trip approval time for Delhi NCR enterprise clients" },
    { num: "₹ 7.2 Cr", label: "Average annual travel spend managed per Delhi enterprise" },
    { num: "97%", label: "Policy compliance rate across Delhi NCR Ozonex clients" },
  ],
  why: {
    h2Lines: ["Where India's", "largest enterprises", "set the standard."],
    body: "Delhi NCR is where India's corporate governance expectations are highest. PSUs, MNC regional headquarters, and India's largest conglomerates are headquartered here — and they demand audit-ready records, multi-level approvals, and board-level reporting. Ozonex was built for exactly this level of scrutiny.",
    keyStatNum: "₹ 340 Cr",
    keyStatLabel:
      "total corporate travel spend managed across Delhi NCR enterprises on Ozonex last financial year",
    cards: [
      {
        title: "Multi-Entity HQ Complexity",
        body: "Delhi NCR enterprises often run multiple subsidiaries, joint ventures, and group companies — each with their own travel policy, approval chain, and cost centre. Ozonex manages all entities from one admin console with full consolidated Group reporting.",
      },
      {
        title: "Government & Regulatory Compliance",
        body: "PSUs and government-linked enterprises in Delhi have strict travel entitlement rules and audit requirements. Ozonex enforces entitlements automatically and generates audit-ready records for every trip — no manual documentation required.",
      },
      {
        title: "Executive & C-Suite Travel",
        body: "Delhi NCR's density of corporate headquarters means a high volume of C-suite travel with specific requirements — preferred airlines, business class entitlements, and last-minute changes. Ozonex handles executive travel with dedicated priority booking workflows.",
      },
    ],
  },
  industries: {
    h2Lines: ["Every sector that", "anchors NCR business."],
    tiles: [
      { title: "CONGLOMERATES & HOLDING COMPANIES", body: "India's largest diversified groups have their holding companies in Delhi NCR. Ozonex manages multi-entity travel with Group consolidated reporting and subsidiary-level policy isolation." },
      { title: "BANKING, FINANCIAL SERVICES & INSURANCE", body: "Delhi NCR's BFSI sector runs nationwide branch visit travel, regulatory meeting coordination, and RBI/SEBI compliance documentation. Ozonex automates all of it." },
      { title: "GOVERNMENT & PUBLIC SECTOR", body: "PSUs and government-linked enterprises require grade-based travel entitlements, TA/DA automation, and audit-ready records. Ozonex handles every compliance requirement." },
      { title: "REAL ESTATE & INFRASTRUCTURE", body: "NCR's largest real estate developers and EPC contractors coordinate project-site travel across Noida, Gurugram, Faridabad, and beyond. Ozonex maps every trip to a project code automatically." },
      { title: "MEDIA, PUBLISHING & BROADCAST", body: "Delhi is India's media capital. Production teams, journalists, and broadcast crews require rapid, flexible booking with live itinerary changes. Ozonex supports it all." },
      { title: "FMCG & CONSUMER GOODS", body: "India's largest FMCG companies run massive field-force travel programmes from Delhi NCR. Ozonex manages recurring routes, per-diem automation, and territory-level reporting." },
    ],
  },
  how: {
    h2Lines: ["Enterprise-ready in", "Delhi NCR in 3 weeks."],
    steps: [
      {
        title: "Configure your entity structure",
        body: "Set up multiple entities, subsidiaries, and cost centres in one implementation. Our team maps your org structure, approval hierarchy, and travel policy into Ozonex before go-live.",
        image: s1,
      },
      {
        title: "Every booking meets your standards",
        body: "From TA/DA rules to business class entitlements for senior leadership — Ozonex enforces your exact policy structure automatically, for every grade and entity.",
        image: s2,
      },
      {
        title: "Board-ready reports, automatically",
        body: "Finance and the board get real-time travel spend data — by entity, department, and project code. Exportable in one click to your ERP or board reporting format.",
        image: s3,
      },
    ],
  },
  testimonial: {
    quote:
      "We run travel for 11 group companies from one admin console on Ozonex. Each entity has its own policy, its own approval chain, and its own reporting view. The Group CFO gets a consolidated dashboard. It took 4 weeks to implement and 3 months to pay for itself.",
    attribution: "Group Head of Finance, Diversified Conglomerate, New Delhi",
  },
  cta: {
    image: cta,
    h2Lines: ["Delhi NCR's enterprise", "standard. Built into", "every booking."],
    body: "Book a 30-minute walkthrough with our enterprise team. We will show you how Ozonex handles your entity structure, approval hierarchy, and compliance requirements — live.",
  },
};

export const Route = createFileRoute("/corporate-travel-management-delhi")({
  head: () => ({
    meta: [
      { title: "Corporate Travel Management in Delhi NCR | Ozonex" },
      {
        name: "description",
        content:
          "Ozonex delivers enterprise travel management for Delhi, Noida, and Gurugram's largest corporates. Centralised bookings, policy enforcement, and CFO-ready expense reporting for NCR enterprises.",
      },
      { property: "og:title", content: "Corporate Travel Management in Delhi NCR | Ozonex" },
      {
        property: "og:description",
        content:
          "Enterprise corporate travel management for Delhi, Noida, and Gurugram corporates.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://ozonex.com/corporate-travel-management-delhi" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(schema) }],
  }),
  component: () => <CityPage data={data} />,
});
