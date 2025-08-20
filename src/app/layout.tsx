import type { Metadata } from "next";
import { Quattrocento } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/contexts/UserContext";
import Script from "next/script"; // ✅ Import Script

// Initialize the Quattrocento font
const quattrocento = Quattrocento({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-quattrocento',
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
    <html lang="en" className={quattrocento.variable}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Mona+Sans:ital,wght@0,200..900;1,200..900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/stocailogoo.png" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />

        {/* ✅ Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1161086805845175');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1161086805845175&ev=PageView&noscript=1"
          />
        </noscript>
        {/* ✅ End Meta Pixel Code */}
      </head>
      <body className="antialiased">
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}