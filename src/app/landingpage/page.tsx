// "use client";
// import React, { useState, useEffect } from "react";
// import ICFFrameworkSection from "@/components/ICFFrameworkSection";
// import CommonSituationsSectionForMarketing from "@/components/CommonSituationsSectionForMarketing";
// import TestinomialSliderForMarketing from "@/components/TestinomialSliderForMarketing";
// import AuthForm from "@/components/AuthForm";
// import LoginPopup from "@/components/LoginPopup";
// import { X } from "lucide-react";

// // Homepage Popup Modal Component (existing)
// function HomepagePopup({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }

//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isOpen]);

//   useEffect(() => {
//     const handleEscape = (event: KeyboardEvent) => {
//       if (event.key === 'Escape' && isOpen) {
//         onClose();
//       }
//     };

//     document.addEventListener('keydown', handleEscape);
//     return () => document.removeEventListener('keydown', handleEscape);
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       <div 
//         className="absolute inset-0 bg-gray-50 bg-opacity-50 backdrop-blur-sm"
//         onClick={onClose}
//       />
      
//       <div className="relative bg-white rounded-lg shadow-2xl max-w-6xl max-h-[90vh] w-full mx-4 overflow-hidden">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
//           aria-label="Close popup"
//         >
//           <X className="w-5 h-5 text-gray-600" />
//         </button>

//         <div className="overflow-y-auto max-h-[90vh] scrollbar-hide">
//           <div className="min-h-screen bg-white">
//             <main className="container mx-auto px-4 py-8">
//               <CommonSituationsSectionForMarketing />
//               <AuthForm />
//               <TestinomialSliderForMarketing />
//               <ICFFrameworkSection />
//             </main>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function LandingPageClient() {
//   const [showHomepagePopup, setShowHomepagePopup] = useState(false);
//   const [showLoginPopup, setShowLoginPopup] = useState(false);

//   // Function to handle homepage popup close - navigates to root directory
//   const handleCloseHomepagePopup = () => {
//     setShowHomepagePopup(false);
    
//     if (typeof window !== 'undefined') {
//       window.location.href = '/';
//     }
//   };

//   // Auto-show homepage popup when page loads
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowHomepagePopup(true);
//     }, 500);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100">

//       {/* Homepage Popup (existing) */}
//       <HomepagePopup 
//         isOpen={showHomepagePopup} 
//         onClose={handleCloseHomepagePopup}
//       />

//       {/* Login Popup (new) */}
//       <LoginPopup 
//         isOpen={showLoginPopup} 
//         onClose={() => setShowLoginPopup(false)}
//       />
//     </div>
//   );
// }

// second changes

// "use client";
// import React, { useState, useEffect } from "react";
// import ICFFrameworkSection from "@/components/ICFFrameworkSection";
// import CommonSituationsSectionForMarketing from "@/components/CommonSituationsSectionForMarketing";
// import TestinomialSliderForMarketing from "@/components/TestinomialSliderForMarketing";
// import AuthForm from "@/components/AuthForm";
// import { X } from "lucide-react";

// // Homepage Popup Modal Component
// function HomepagePopup({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }

//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isOpen]);

//   // Handle ESC key to close popup and navigate to root
//   useEffect(() => {
//     const handleEscape = (event: KeyboardEvent) => {
//       if (event.key === 'Escape' && isOpen) {
//         onClose();
//       }
//     };

//     document.addEventListener('keydown', handleEscape);
//     return () => document.removeEventListener('keydown', handleEscape);
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       {/* Backdrop */}
//       <div 
//         className="absolute inset-0 bg-gray-50 bg-opacity-50 backdrop-blur-sm"
//         onClick={onClose}
//       />
      
//       {/* Modal Content */}
//       <div className="relative bg-white rounded-lg shadow-2xl max-w-6xl max-h-[90vh] w-full mx-4 overflow-hidden">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
//           aria-label="Close popup"
//         >
//           <X className="w-5 h-5 text-gray-600" />
//         </button>

//         {/* Scrollable Content */}
//         <div className="overflow-y-auto max-h-[90vh]">
//           <div className="min-h-screen bg-white">
//             <main className="container mx-auto px-4 py-8">
//               <CommonSituationsSectionForMarketing />
//               <AuthForm />
//               <TestinomialSliderForMarketing />
//               <ICFFrameworkSection />
//             </main>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function LandingPageClient() {
//   const [showPopup, setShowPopup] = useState(false);

//   // Function to handle popup close - navigates to root directory
//   const handleClosePopup = () => {
//     setShowPopup(false);
    
//     // Navigate to root directory using window.location
//     if (typeof window !== 'undefined') {
//       window.location.href = '/';
//     }
//   };

//   // Auto-show popup when page loads
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowPopup(true);
//     }, 500); // Show popup after 0.5 second

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Homepage Popup */}
//       <HomepagePopup 
//         isOpen={showPopup} 
//         onClose={handleClosePopup}
//       />
//     </div>
//   );
// }

// previous

import React from "react";
import ICFFrameworkSection from "@/components/ICFFrameworkSection";
import CommonSituationsSectionForMarketing from "@/components/CommonSituationsSectionForMarketing";
// import FooterStocai from "@/components/FooterStocai";
import TestinomialSliderForMarketing from "@/components/TestinomialSliderForMarketing";
import AuthForm from "@/components/auth/AuthForm";
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
      <main className="container mx-auto">
        <CommonSituationsSectionForMarketing />
        <AuthForm />
        <TestinomialSliderForMarketing />
        <ICFFrameworkSection />
      </main>
    </div>
  );
}
