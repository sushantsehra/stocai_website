import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function BlogNotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto pt-32 px-4 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Blog Post Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">
            Sorry, the blog post you're looking for doesn't exist or has been moved.
          </p>
          <Link 
            href="/blog" 
            className="inline-block bg-[#54B0AF] text-white py-3 px-8 rounded-full hover:bg-[#489998] transition-colors"
          >
            Return to Blog
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 