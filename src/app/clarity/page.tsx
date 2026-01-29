import React from "react";
import HeaderStocai from "@/components/HeaderStocai";
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
import SectionViewTracker from "@/app/_components/SectionViewTracker";

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
      <HeaderStocai />
      
      <main className="container mx-auto">
        <SectionViewTracker />
        <section data-analytics-section="hero" data-analytics-section-label="Hero" data-analytics-section-order="1">
          <HeroSectionStocai />
        </section>
        <section data-analytics-section="built_by" data-analytics-section-label="Built By" data-analytics-section-order="2">
          <BuiltBy />
        </section>
        <section data-analytics-section="growth_testimonial" data-analytics-section-label="Growth Testimonial" data-analytics-section-order="3">
          <GrowthTestimonial />
        </section>
        <section data-analytics-section="declutter_mind" data-analytics-section-label="De-Clutter Mind" data-analytics-section-order="4">
          <DeClutterMindComponent />
        </section>
        <section data-analytics-section="video_player" data-analytics-section-label="Video Player" data-analytics-section-order="5">
          <VideoPlayer />
        </section>
        <section data-analytics-section="get_your_answers" data-analytics-section-label="Get Your Answers" data-analytics-section-order="6">
          <GetYourAnswers />
        </section>
        <section data-analytics-section="common_situations" data-analytics-section-label="Common Situations" data-analytics-section-order="7">
          <CommonSituationsSection />
        </section>
        <section data-analytics-section="icf_framework" data-analytics-section-label="ICF Framework" data-analytics-section-order="8">
          <ICFFrameworkSection />
        </section>
        <section data-analytics-section="see_the_difference" data-analytics-section-label="See The Difference" data-analytics-section-order="9">
          <SeeTheDifference />
        </section>
        <section data-analytics-section="testimonial_slider" data-analytics-section-label="Testimonial Slider" data-analytics-section-order="10">
          <TestimonialSlider />
        </section>
        <section data-analytics-section="faq" data-analytics-section-label="FAQ" data-analytics-section-order="11">
          <StocaiFAQ />
        </section>
        <section data-analytics-section="professional_hero" data-analytics-section-label="Professional Hero" data-analytics-section-order="12">
          <ProfessionalHeroSection />
        </section>
        {/* <OverthinkingToClarity /> */}
      </main>
      
      <FooterStocai />
    </div>
  );
}
