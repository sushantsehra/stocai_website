import React from "react";
// import Header from "../components/Header";
// import Footer from "@/components/Footer";
import { Metadata } from "next";
// import BePromotableHero from "@/components/BePromotableHero";
// import PromotionMyths from "@/components/PromotionMyths";
// import CareerProblemsCards from "@/components/CareerProblemsCards";
// import SevenWeekArc from "@/components/SevenWeekArc";
// import BeforeAfterCompare from "@/components/BeforeAfterCompare";
// import PromoSystemSection from "@/components/PromoSystemSection";
// import FaqAccordion from "@/components/FaqAccordion";
// import RoiCards from "@/components/RoiCards";
// import HeroWaitlist from "@/components/HeroWaitlist";
// import FounderBonus from "@/components/FounderBonus";
// import OutcomeContract from "@/components/OutcomeContract";
// import SuccessStories from "@/components/SuccessStories";
// import PromotableDiagram from "@/components/PromotableDiagram";
// import TrustableCompanies from "@/components/TrustableCompanies";
// import CourseCarousel from "@/components/CourseCarousel";
// import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/FooterSection";
import BMPLandingComponents from "@/components/BMPLandingComponents";
// import PromotionBanner from "@/components/PromotionBanner";
// import Header from "@/components/Header";

// This ensures the page is statically generated at build time
export const dynamic = 'force-static';

// SEO Metadata
export const metadata: Metadata = {
  title: "Better Corporate Life - Clarity and Confidence at Work",
  description: "Better Corporate Life helps professionals navigate corporate growth with clarity, confidence, and practical frameworks.",
  openGraph: {
    title: "Better Corporate Life - Clarity and Confidence at Work",
    description: "Better Corporate Life helps professionals navigate corporate growth with clarity, confidence, and practical frameworks.",
    url: "https://bettercorporatelife.com",
    siteName: "Better Corporate Life",
    images: [
      {
        url: "/og-bcl.png",
        width: 1200,
        height: 630,
        alt: "Better Corporate Life",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Better Corporate Life - Clarity and Confidence at Work",
    description: "Better Corporate Life helps professionals navigate corporate growth with clarity, confidence, and practical frameworks.",
    images: ["/twitter-bcl.png"],
  },
  alternates: {
    canonical: "https://bettercorporatelife.com",
  },
  // Explicitly ensure indexing
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
};

// JSON-LD Structured Data Component
function JsonLd() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Better Corporate Life",
    "url": "https://bettercorporatelife.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://bettercorporatelife.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Better Corporate Life",
    "url": "https://bettercorporatelife.com",
    "logo": "https://bettercorporatelife.com/bcl-logo.png"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://bettercorporatelife.com"
    }]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

export default function Home() {
  return (
    <>
      {/* <PromoBanner /> */}
      {/* <PromotionBanner /> */}
    <div className="min-h-screen bg-white">
      <JsonLd />
      {/* <Header /> */}
      {/* <Header /> */}
      {/* <Header /> */}
      
      {/* <main className="container mx-auto"> */}
      <main>
        <BMPLandingComponents />
      </main>
      {/* <Footer /> */}
      <Footer />
    </div>
    </>
  );
}
