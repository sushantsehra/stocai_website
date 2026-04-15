import React from "react";
import { Metadata } from "next";
import BMPLandingComponents from "@/components/BMPLandingComponents";
import env from "@/utils/env";

// This ensures the page is statically generated at build time
export const dynamic = 'force-static';

// SEO Metadata for Homepage
export const metadata: Metadata = {
  title: "Homepage - Stocai - Your AI-Powered Introspection & Clarity Partner",
  description: "Discover the new Stocai homepage with enhanced features for guided introspection and mindful decision-making.",
  openGraph: {
    title: "Homepage - Stocai - Your AI-Powered Introspection & Clarity Partner",
    description: "Discover the new Stocai homepage with enhanced features for guided introspection and mindful decision-making.",
    url: `${env.publicUrl}/promotable`,
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
    canonical: `${env.publicUrl}/promotable`,
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
    "url": `${env.publicUrl}/promotable`,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Stocai",
      "url": env.publicUrl
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
        "item": env.publicUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Homepage",
        "item": `${env.publicUrl}/promotable`
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
      
      <main className="container mx-auto">
        <BMPLandingComponents />
      </main>
      
    </div>
  );
}
