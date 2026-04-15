import React from "react";
import type { Metadata } from "next";
import env from "@/utils/env";

export const metadata: Metadata = {
  title: "Stocai Blog - Your AI-Powered Introspection & Clarity Partner",
  description: "Read the latest articles and insights on AI-powered introspection, clarity, and personal growth from Stocai.",
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  alternates: {
    canonical: `${env.publicUrl}/blog`,
  },
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
