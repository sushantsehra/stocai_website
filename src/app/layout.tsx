import type { Metadata } from "next";
import { Quattrocento } from "next/font/google";
import "./globals.css";

// Initialize the Quattrocento font
const quattrocento = Quattrocento({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-quattrocento',
});

// Default metadata (will be overridden by page-specific metadata)
export const metadata: Metadata = {
  metadataBase: new URL('https://mystocai.com'),
  title: {
    default: "Stocai - AI-Powered Introspection Partner",
    template: "%s | Stocai"
  },
  description: "Stocai helps you uncover your own answers through guided introspection and mindful decision-making, providing clarity and personal growth.",
  keywords: ["introspection", "AI assistant", "mindfulness", "clarity", "personal growth", "decision-making", "self-reflection"],
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
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  // Explicitly set canonical URL to avoid duplicate content issues
  alternates: {
    canonical: '/',
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
