import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorksSection from "../components/HowItWorksSection";
import TestimonialsSection from "../components/TestimonialsSection";
import FaqSection from "../components/FaqSection";
import InsightSection from "@/components/InsightsSection";
import CallToActionSection from "@/components/CallToActionSection";
import BenefitSection from "@/components/BenefitSection";
import PricingSection from "@/components/PricingSection";
import NotForYouSection from "@/components/NotForYouSection";
import Footer from "@/components/Footer";
import { Metadata } from "next";

// This ensures the page is statically generated at build time
export const dynamic = 'force-static';

// SEO Metadata
export const metadata: Metadata = {
  title: "Stocai - Your AI-Powered Introspection & Clarity Partner",
  description: "Stocai helps you uncover your own answers through guided introspection and mindful decision-making, providing clarity and personal growth.",
  openGraph: {
    title: "Stocai - Your AI-Powered Introspection & Clarity Partner",
    description: "Stocai helps you uncover your own answers through guided introspection and mindful decision-making, providing clarity and personal growth.",
    url: "https://mystocai.com",
    siteName: "Stocai",
    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Stocai - Your Introspection and Clarity Partner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stocai - Your AI-Powered Introspection & Clarity Partner",
    description: "Stocai helps you uncover your own answers through guided introspection and mindful decision-making, providing clarity and personal growth.",
    images: ["/twitter-image.jpg"],
    creator: "@stocai",
  },
  alternates: {
    canonical: "https://mystocai.com",
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
    "name": "Stocai",
    "url": "https://mystocai.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://mystocai.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Stocai",
    "url": "https://mystocai.com",
    "logo": "https://mystocai.com/logo.png",
    "sameAs": [
      "https://twitter.com/stocai",
      "https://www.linkedin.com/company/stocai",
      "https://www.facebook.com/stocai"
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://mystocai.com"
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
    <div className="min-h-screen bg-white">
      <JsonLd />
      <Header />
      
      <main className="container mx-auto">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <InsightSection />
        <CallToActionSection />
        <BenefitSection />
        <TestimonialsSection />
        <PricingSection />
        <NotForYouSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
