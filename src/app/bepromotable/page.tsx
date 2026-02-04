import React from "react";
import { Metadata } from "next";
import Footer from "@/components/FooterSection";
import BMPPromotableComponents from "@/components/BMPPromotableComponents";

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
    <div className="min-h-screen bg-white">
      <JsonLd />
      <main>
        <BMPPromotableComponents />
      </main>
      <Footer />
    </div>
    </>
  );
}
