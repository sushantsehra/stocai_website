import React from "react";
import Header from "@/components/Header";
import HeroSectionStocai from "@/components/HeroSectionStocai";
import StocaiFAQ from "@/components/StocaiFAQ";
import VideoPlayer from "@/components/VideoPlayer";
import BuiltBy from "@/components/BuiltBy";
import GrowthTestimonial from "@/components/GrowthTestimonial";
import DeClutterMindComponent from "@/components/DeClutterMindComponent";
import GetYourAnswers from "@/components/GetYourAnswers";
import ICFFrameworkSection from "@/components/ICFFrameworkSection";
import CommonSituationsSection from "@/components/CommonSituationsSection";
import FooterStocai from "@/components/FooterStocai";
import SeeTheDifference from "@/components/SeeTheDifference";
// import OverthinkingToClarity from "@/components/OverthinkingToClarity";
import ProfessionalHeroSection from "@/components/ProfessionalHeroSection";
import TestimonialSlider from "@/components/TestimonialSlider";
import { Metadata } from "next";

// This ensures the page is statically generated at build time
export const dynamic = 'force-static';

// SEO Metadata for Homepage
export const metadata: Metadata = {
  title: "Homepage - Stocai - Your AI-Powered Introspection & Clarity Partner",
  description: "Discover the new Stocai homepage with enhanced features for guided introspection and mindful decision-making.",
  openGraph: {
    title: "Homepage - Stocai - Your AI-Powered Introspection & Clarity Partner",
    description: "Discover the new Stocai homepage with enhanced features for guided introspection and mindful decision-making.",
    url: "https://mystocai.com/homepage",
    siteName: "Stocai",
    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Stocai Homepage - Your Introspection and Clarity Partner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Homepage - Stocai - Your AI-Powered Introspection & Clarity Partner",
    description: "Discover the new Stocai homepage with enhanced features for guided introspection and mindful decision-making.",
    images: ["/twitter-image.jpg"],
    creator: "@stocai",
  },
  alternates: {
    canonical: "https://mystocai.com/homepage",
  },
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
    "@type": "WebPage",
    "name": "Stocai Homepage",
    "url": "https://mystocai.com/homepage",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Stocai",
      "url": "https://mystocai.com"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://mystocai.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Homepage",
        "item": "https://mystocai.com/homepage"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

export default function Homepage() {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd />
      <Header />
      
      <main className="container mx-auto">
        <HeroSectionStocai />
        <BuiltBy />
        <GrowthTestimonial />
        <VideoPlayer />
        <DeClutterMindComponent />
        <GetYourAnswers />
        <ICFFrameworkSection />
        <CommonSituationsSection />
        <SeeTheDifference />
        <TestimonialSlider />
        <StocaiFAQ />
        <ProfessionalHeroSection />
        {/* <OverthinkingToClarity /> */}
      </main>
      
      <FooterStocai />
    </div>
  );
}