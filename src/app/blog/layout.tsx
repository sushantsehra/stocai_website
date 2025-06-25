import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stocai Blog - Insights on AI Trading and Investment",
  description: "Read the latest articles and insights on AI-powered trading, investment strategies, and financial technology from Stocai.",
  // Ensure proper indexing
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  // Set canonical URL for blog section
  alternates: {
    canonical: "https://mystocai.com/blog",
  },
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>{children}</>
  );
} 