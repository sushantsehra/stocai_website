import React from "react";
import { notFound } from "next/navigation";
import { getBlogPost, getAllBlogPosts, type BlogPost } from "../../../data/blogPosts";
import { Metadata } from "next";
import BlogPage from "./blog";

// Configure server-side rendering for fresh data
export const dynamic = 'force-dynamic';

// Generate metadata for each blog post
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  // Ensure params is fully resolved before accessing properties
  const {slug} = await params
  const post = await getBlogPost(slug);
  
  if (!post) {
    return {
      title: "Blog Post Not Found - Stocai",
      description: "The requested blog post could not be found.",
    };
  }
  
  return {
    title: `${post.title} - Stocai Blog`,
    description: post.excerpt,
    // Set canonical URL for this specific blog post
    alternates: {
      canonical: `https://mystocai.com/blog/${slug}`,
    },
    // Ensure proper indexing
    robots: {
      index: true,
      follow: true,
      nocache: false,
    },
    // Open Graph data for social sharing
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      url: `https://mystocai.com/blog/${slug}`,
      images: post.imageUrl ? [{ url: post.imageUrl }] : undefined,
    },
    // Twitter Card data
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.imageUrl ? [post.imageUrl] : undefined,
    },
  };
}

export default async function BlogPostPage({ 
  params 
}: {
  params: Promise<{ slug: string }>
}) {
  // Ensure params is fully resolved before accessing properties
  const {slug} = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    notFound();
  }

  // JSON-LD Structured Data for Article
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "datePublished": post.date,
    "image": post.imageUrl || "https://mystocai.com/og-image.jpg",
    "url": `https://mystocai.com/blog/${slug}`,
    "publisher": {
      "@type": "Organization",
      "name": "Stocai",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mystocai.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://mystocai.com/blog/${slug}`
    }
  };

  // JSON-LD Structured Data for Breadcrumb
  const breadcrumbJsonLd = {
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
        "name": "Blog",
        "item": "https://mystocai.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://mystocai.com/blog/${slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BlogPage params={{ slug }} />
    </>
  );
} 