import React from "react";
import Link from "next/link";
import Header from "@/components/LandingHeader";
import Footer from "@/components/FooterSection";
import BlogStickyCTA from "@/components/BlogStickyCTA";

export default function BlogNotFound() {
  return (
    <div className="blog-theme min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 pb-32 pt-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="blog-title-text mb-6 font-jakarta text-4xl font-bold md:text-5xl">Blog Post Not Found</h1>
          <p className="blog-body-text mb-8 text-xl">
            Sorry, the blog post you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link 
            href="/blog" 
            className="blog-accent-bg inline-block rounded-full px-8 py-3 text-white transition-colors"
          >
            Return to Blog
          </Link>
        </div>
      </main>
      
      <Footer />
      <BlogStickyCTA />
    </div>
  );
} 
