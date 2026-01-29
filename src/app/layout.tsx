import type { Metadata } from "next";
import { Suspense } from "react";
import { Quattrocento, Plus_Jakarta_Sans, Montserrat } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/contexts/UserContext";
import Script from "next/script";
import PostHogInit from "./_components/PostHogInit";
import PostHogPageview from "./_components/PostHogPageview";
import WaitlistModalHost from "@/components/WaitlistModalHost";

// Initialize the Quattrocento font
const quattrocento = Quattrocento({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-quattrocento",
});

// Plus Jakarta Sans
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-jakarta",
});

// Montserrat
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mystocai.com"),
  title: {
    default: "StocAI",
    template: "%s | StocAI",
  },
  description:
    "Stocai helps you uncover your own answers through guided introspection and mindful decision-making, providing clarity and personal growth.",
  keywords: [
    "introspection",
    "AI assistant",
    "mindfulness",
    "clarity",
    "personal growth",
    "decision-making",
    "self-reflection",
  ],
  authors: [{ name: "Stocai Team" }],
  creator: "Stocai",
  publisher: "Stocai",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // ✅ Added the new font variables to html className
    <html
      lang="en"
      suppressHydrationWarning
      className={`${quattrocento.variable} ${jakarta.variable} ${montserrat.variable}`}
    >
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5VLRJZ4H');
          `}
        </Script>
        {/* End Google Tag Manager */}

        <link rel="icon" href="/stocailogoo.png" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />

      </head>
      <body className="antialiased" suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5VLRJZ4H"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <PostHogInit />
        <Suspense fallback={null}>
          <PostHogPageview />
        </Suspense>
        <UserProvider>
          <div suppressHydrationWarning>{children}</div>
          <WaitlistModalHost />
        </UserProvider>
      </body>
    </html>
  );
}

// import type { Metadata } from "next";
// import { Quattrocento } from "next/font/google";
// import "./globals.css";
// import { UserProvider } from "@/contexts/UserContext";
// import Script from "next/script";
// import PostHogInit from './_components/PostHogInit'
// import Image from "next/image";
// import WaitlistModalHost from "@/components/WaitlistModalHost";

// // Initialize the Quattrocento font
// const quattrocento = Quattrocento({
//   weight: ['400', '700'],
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-quattrocento',
// });

// export const metadata: Metadata = {
//   metadataBase: new URL("https://mystocai.com"),
//   title: {
//     default: "StocAI",
//     template: "%s | StocAI",
//   },
//   description:
//     "Stocai helps you uncover your own answers through guided introspection and mindful decision-making, providing clarity and personal growth.",
//   keywords: [
//     "introspection",
//     "AI assistant",
//     "mindfulness",
//     "clarity",
//     "personal growth",
//     "decision-making",
//     "self-reflection",
//   ],
//   authors: [{ name: "Stocai Team" }],
//   creator: "Stocai",
//   publisher: "Stocai",
//   formatDetection: {
//     email: false,
//     address: false,
//     telephone: false,
//   },
//   robots: {
//     index: true,
//     follow: true,
//     nocache: false,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-image-preview": "large",
//       "max-video-preview": -1,
//       "max-snippet": -1,
//     },
//   },
//   alternates: {
//     canonical: "/",
//   },
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" suppressHydrationWarning className={quattrocento.variable}>
//       <head>
//         <link rel="icon" href="/stocailogoo.png" sizes="any" />
//         <link rel="apple-touch-icon" href="/apple-icon.png" />

//         {/* Meta Pixel Code */}
//         <Script id="meta-pixel" strategy="afterInteractive">
//           {`
//             !function(f,b,e,v,n,t,s)
//             {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
//             n.callMethod.apply(n,arguments):n.queue.push(arguments)};
//             if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
//             n.queue=[];t=b.createElement(e);t.async=!0;
//             t.src=v;s=b.getElementsByTagName(e)[0];
//             s.parentNode.insertBefore(t,s)}(window, document,'script',
//             'https://connect.facebook.net/en_US/fbevents.js');
//             fbq('init', '1161086805845175');
//             fbq('track', 'PageView');
//           `}
//         </Script>
//         {/* Meta Pixel fallback */}
//         <noscript>
//           <Image
//             height={1}
//             width={1}
//             style={{ display: "none" }}
//             src="https://www.facebook.com/tr?id=1161086805845175&ev=PageView&noscript=1"
//             alt=""
//           />
//         </noscript>
//         {/* End Meta Pixel Code */}
//       </head>
//       <body className="antialiased" suppressHydrationWarning>
//         <PostHogInit />
//         <UserProvider>
//          <div suppressHydrationWarning>
//             {children}
//           </div>
//           <WaitlistModalHost />
//          </UserProvider>
//       </body>
//     </html>
//   );
// }
