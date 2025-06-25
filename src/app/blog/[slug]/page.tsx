import React from "react";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getBlogPost, getAllBlogPosts } from "@/data/blogPosts";
import Link from "next/link";
import { Metadata } from "next";

// Configure static rendering
export const dynamic = 'force-static';
export const revalidate = false;

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each blog post
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  // Ensure params is fully resolved before accessing properties
  const {slug} = await params
  const post = getBlogPost(slug);
  
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
  const {slug} = await params
  const post = getBlogPost(slug);
  
  if (!post) {
    notFound();
  }
  
  // Convert markdown-like content to HTML (very basic implementation)
  const formatContent = (content: string) => {
    let formatted = content
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mt-5 mb-2">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '</p><p class="mb-4">');
    
    // Handle lists
    formatted = formatted.replace(/^- (.*$)/gm, '<li class="ml-6 list-disc mb-1">$1</li>');
    formatted = formatted.replace(/^(\d+)\. (.*$)/gm, '<li class="ml-6 list-decimal mb-1">$1. $2</li>');
    
    // Wrap in paragraph tags
    formatted = `<p class="mb-4">${formatted}</p>`;
    
    // Fix duplicated paragraph tags
    formatted = formatted.replace(/<\/p><p class="mb-4"><li/g, '<li');
    formatted = formatted.replace(/<\/li><\/p><p class="mb-4">/g, '</li>');
    
    // Group list items
    formatted = formatted.replace(/(<li class="ml-6 list-disc mb-1">.*<\/li>)+/g, '<ul class="mb-4">$&</ul>');
    formatted = formatted.replace(/(<li class="ml-6 list-decimal mb-1">.*<\/li>)+/g, '<ol class="mb-4">$&</ol>');
    
    return formatted;
  };

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
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      
      <main className="container mx-auto pt-32 px-4 pb-16">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center text-[#54B0AF] mb-8 hover:underline">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to All Articles
          </Link>
          
          <article>
            <header className="mb-8">
              <p className="text-sm text-gray-500 mb-2">{post.date} • By {post.author}</p>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
              <p className="text-xl text-gray-600">{post.excerpt}</p>
              
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.map((tag) => (
                    <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>
            
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: formatContent(post.content) }} />
            </div>
          </article>
          
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold mb-4">Continue Reading</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {getAllBlogPosts()
                .filter((p) => p.id !== post.id)
                .slice(0, 2)
                .map((relatedPost) => (
                  <div key={relatedPost.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6">
                      <p className="text-sm text-gray-500 mb-2">{relatedPost.date}</p>
                      <h3 className="text-xl font-semibold mb-2">{relatedPost.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{relatedPost.excerpt}</p>
                      <Link href={`/blog/${relatedPost.slug}`} className="text-[#54B0AF] font-medium hover:underline">
                        Read More →
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 