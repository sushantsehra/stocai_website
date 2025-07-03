import React from "react";
import Header from "../../components/Header";
import Footer from "@/components/Footer";
import { getAllBlogPosts } from "../../data/blogPosts";
import BlogPageClient from "./BlogPageClient";

// This ensures the page is server-side rendered for fresh data
export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const blogPosts = await getAllBlogPosts();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <BlogPageClient initialBlogPosts={blogPosts} />
      <Footer />
    </div>
  );
} 