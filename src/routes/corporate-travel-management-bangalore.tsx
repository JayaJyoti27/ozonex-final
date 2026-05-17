import { createFileRoute } from "@tanstack/react-router";
import { CityPage, type CityData } from "@/components/CityPage";
import hero from "@/assets/city-bangalore-hero.jpg";
import s1 from "@/assets/city-bangalore-s1.jpg";
import s2 from "@/assets/city-bangalore-s2.jpg";
import s3 from "@/assets/city-bangalore-s3.jpg";
import cta from "@/assets/city-bangalore-cta.jpg";

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Corporate Travel Management Bangalore",
  provider: { "@type": "Organization", name: "Ozonex" },
  areaServed: { "@type": "City", name: "Bangalore" },
  description:
    "Enterprise corporate travel management platform for Bangalore and Karnataka businesses.",
  url: "https://ozonex.com/corporate-travel-management-bangalore",
};

const data: CityData = {
  city: "Bangalore",
  eyebrow: "Corporate Travel Management · Bangalore",
  hero: {
    image: hero,
    h1Lines: ["India's tech capital", "deserves a smarter", "travel platform."],
    sub: "From Whitefield IT parks to Electronic City campuses, Ozonex gives Bangalore's enterprises complete control over corporate travel — booking, approvals, policy, and expenses on one platform.",
  },
  stats: [
    { num: "9,800+", label: "Corporate travellers managed in Bangalore annually" },
    { num: "22 min", label: "Average trip approval time for Bangalore tech enterprises" },
    { num: "₹ 4.6 Cr", label: "Average annual travel spend managed per Bangalore enterprise" },
    { num: "96%", label: "Policy compliance rate across Bangalore-based Ozonex clients" },
  ],
  why: {
    h2Lines: ["Where every startup", "eventually becomes", "an enterprise."],
    body: "Bangalore's corporate travel problem is a growth problem. A 200-person startup books on consumer apps. At 800 people, finance is drowning in receipts. At 2,000, compliance is a board-level concern. Ozonex is the platform that scales with you — from seed stage to enterprise, without changing your stack.",
    keyStatNum: "3x",
    keyStatLabel:
      "average growth in managed travel volume for Bangalore tech companies in their second year on Ozonex",
    cards: [
      {
        title: "Global Delivery Centre Complexity",
        body: "Bangalore's GDCs run constant international travel — client visits, offshore coordination, and executive roadshows. Ozonex manages visa tracking, international fare policies, and multi-currency expense reporting in one unified system.",
      },
      {
        title: "Startup to Enterprise Scaling",
        body: "When a Bangalore company crosses 500 employees, manual travel booking breaks down overnight. Ozonex onboards in 3 weeks and immediately enforces policy, automates approvals, and gives finance real-time visibility — no matter how fast the org grows.",
      },
      {
        title: "Distributed Team Coordination",
        body: "Bangalore enterprises often have engineering in Electronic City, sales in Koramangala, and leadership in Indiranagar. Ozonex coordinates travel across all office clusters with a single policy engine and consolidated reporting.",
      },
    ],
  },
  industries: {
    h2Lines: ["Every sector that", "powers Bangalore."],
    tiles: [
      { title: "INFORMATION TECHNOLOGY", body: "Whitefield and Electronic City IT majors run thousands of client-site trips annually. Ozonex manages project-coded travel with full audit trails for cost recovery billing." },
      { title: "STARTUPS & UNICORNS", body: "Bangalore's startup ecosystem needs travel management that grows with the company. Ozonex scales from 50 to 5,000 travellers without a platform change." },
      { title: "AEROSPACE & DEFENCE", body: "HAL and aerospace supply chain companies in Bangalore run security-sensitive travel with strict documentation requirements. Ozonex handles compliance end to end." },
      { title: "BIOTECH & LIFE SCIENCES", body: "Bangalore's biotech cluster runs high-frequency conference and research travel. Ozonex manages grant-coded travel spend and per-diem rules automatically." },
      { title: "E-COMMERCE & RETAIL TECH", body: "India's largest e-commerce companies run operations from Bangalore. Ozonex manages warehouse-to-HQ travel, vendor visits, and leadership roadshows on one platform." },
      { title: "CONSULTING & PROFESSIONAL SERVICES", body: "Big Four and boutique consulting firms in Bangalore require client-billable travel tracking and per-project cost allocation. Ozonex automates both." },
    ],
  },
  how: {
    h2Lines: ["Live in Bangalore", "in under 3 weeks."],
    steps: [
      {
        title: "Connect your tech stack",
        body: "Ozonex integrates with your existing HRIS, ERP, and SSO provider. For Bangalore tech companies on Workday, Darwinbox, or BambooHR — sync takes under 4 hours.",
        image: s1,
      },
      {
        title: "Every employee books in policy",
        body: "From day one, every booking is filtered by live policy. International bookings, visa flags, and budget thresholds are all checked automatically — before the employee confirms.",
        image: s2,
      },
      {
        title: "Finance gets data, not paperwork",
        body: "Every approved trip generates an automatic cost record. By the time your Bangalore finance team needs to close the month, Ozonex has already done the work.",
        image: s3,
      },
    ],
  },
  testimonial: {
    quote:
      "We scaled from 300 to 1,100 employees in 18 months. Our travel spend tripled. Without Ozonex, our finance team would have needed 3 additional headcount just to manage reconciliation. Instead, the platform absorbed the growth and finance stayed the same size.",
    attribution: "CFO, Series C Technology Company, Bangalore",
  },
  cta: {
    image: cta,
    h2Lines: ["Bangalore's fastest", "growing companies", "run on Ozonex."],
    body: "See how Ozonex would work for your Bangalore operation. 30 minutes. No commitment. A live walkthrough built around your org structure.",
  },
};

export const Route = createFileRoute("/corporate-travel-management-bangalore")({
  head: () => ({
    meta: [
      { title: "Corporate Travel Management in Bangalore | Ozonex" },
      {
        name: "description",
        content:
          "Ozonex powers corporate travel management for Bangalore's tech enterprises, startups, and global delivery centres. Automated approvals, policy compliance, and real-time spend visibility.",
      },
      { property: "og:title", content: "Corporate Travel Management in Bangalore | Ozonex" },
      {
        property: "og:description",
        content:
          "Enterprise travel management for Bangalore tech companies, startups, and GDCs.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://ozonex.com/corporate-travel-management-bangalore" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(schema) }],
  }),
  component: () => <CityPage data={data} />,
});
