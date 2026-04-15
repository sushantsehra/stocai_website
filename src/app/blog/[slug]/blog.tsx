import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/LandingHeader";
import Footer from "@/components/FooterSection";
import BlogStickyCTA from "@/components/BlogStickyCTA";
import BlogInteractions from "@/components/BlogInteractions";
import { getAllBlogPosts, getBlogPost, type BlogPost } from "../../../data/blogPosts";
import type { DynamicBlogPost } from "@/types/blog";
import Image from "next/image";

interface BlogProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function BlogPage({ params }: BlogProps) {
  const { slug } = params;
  const post = await getBlogPost(slug);

  const formatExcerpt = (excerpt: string) => {
    if (!excerpt) return "";

    let formatted = excerpt.replace(/<[^>]*>/g, "");
    formatted = formatted
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/`(.*?)`/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

    formatted = formatted.replace(/\s+/g, " ").replace(/\n+/g, " ").trim();

    if (formatted.length > 150) {
      formatted = `${formatted.substring(0, 150)}...`;
    }

    return formatted;
  };

  if (!post) {
    notFound();
  }

  const fallbackURL = "https://media.istockphoto.com/id/2174551157/photo/cyber-security-data-protection-business-technology-privacy-concept.jpg?s=2048x2048&w=is&k=20&c=sCjAoM5vMvI7PXGFaTaOnRr1AppyOWmxPHkckruBq_A=";

  const dynamicBlog: DynamicBlogPost = {
    blog_id: post.id,
    title: post.title,
    description: post.content,
    username: post.author,
    created_at: post.date,
    image_url: post.imageUrl,
    blog_tags: post.tags.join(","),
    like_count: post.like_count || 0,
    comment_count: post.comment_count || 0,
  };

  const formatContent = (content: string) => {
    const h1Class = "text-3xl font-bold mt-8 mb-4";
    const h2Class = "text-2xl font-bold mt-6 mb-3";
    const h3Class = "text-xl font-bold mt-5 mb-2";

    let formatted = content
      .replace(/^# (.*$)/gm, `<h1 class="${h1Class}">$1</h1>`)
      .replace(/^## (.*$)/gm, `<h2 class="${h2Class}">$1</h2>`)
      .replace(/^### (.*$)/gm, `<h3 class="${h3Class}">$1</h3>`)
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 underline hover:text-blue-800" rel="noopener noreferrer" target="_blank">$1</a>')
      .replace(/\n\n/g, '</p><p class="mb-4">');

    formatted = formatted.replace(/^- (.*)$/gm, '<li class="ml-6 mb-1 list-disc">$1</li>');
    formatted = formatted.replace(/^(\d+)\. (.*)$/gm, '<li class="ml-6 mb-1 list-decimal">$1. $2</li>');
    formatted = `<p class="mb-4">${formatted}</p>`;
    formatted = formatted.replace(/<\/p><p class="mb-4"><li/g, "<li");
    formatted = formatted.replace(/<\/li><\/p><p class="mb-4">/g, "</li>");
    formatted = formatted.replace(/<a\s+(?:[^>]*?\s+)?href="([^"]*)"(?:\s+[^>]*)?>/g, '<a href="$1" class="text-blue-600 underline hover:text-blue-800" rel="noopener noreferrer" target="_blank">');

    return formatted;
  };

  const relatedPosts = (await getAllBlogPosts()).filter((candidate: BlogPost) => candidate.id !== post.id).slice(0, 2);

  return (
    <div className="blog-theme min-h-screen bg-white">
      <Header />

      <main className="container mx-auto px-4 pb-32 pt-4 md:pt-8">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="blog-accent-text mb-8 inline-flex items-center font-jakarta hover:underline">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to All Articles
          </Link>

          <article className="blog-detail-surface overflow-hidden">
            <Image
              src={post.imageUrl || fallbackURL}
              alt={post.title}
              width={800}
              height={256}
              className="w-full h-64 md:h-96 object-cover"
              style={{ objectFit: "cover" }}
            />

            <div className="p-8">
              <header className="mb-6">
                <div className="blog-muted-text mb-4 flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Image
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(post.author)}&background=0B64F4&color=fff`}
                      alt={post.author}
                      width={32}
                      height={32}
                      className="rounded-full mr-3"
                    />
                    <span className="text-gray-900 font-medium">{post.author}</span>
                  </div>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>

                <h1 className="blog-title-text mb-4 font-jakarta text-4xl font-bold">{post.title}</h1>

                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: string) => (
                      <span key={tag} className="blog-tag rounded-full px-3 py-1 text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </header>

              <div className="blog-prose prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: formatContent(post.content) }} />
              </div>

              <BlogInteractions blog={dynamicBlog} />
            </div>
          </article>

          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-8 border-t border-gray-200">
              <h2 className="blog-title-text mb-4 font-jakarta text-2xl font-bold">Continue Reading</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedPosts.map((relatedPost: BlogPost) => (
                  <div key={relatedPost.id} className="blog-secondary-surface overflow-hidden">
                    <div className="p-6">
                      <p className="blog-muted-text mb-2 text-sm">{relatedPost.date}</p>
                      <h3 className="blog-title-text mb-2 font-jakarta text-xl font-semibold">{relatedPost.title}</h3>
                      <p className="blog-body-text mb-4 line-clamp-2">{formatExcerpt(relatedPost.excerpt)}</p>
                      <Link href={`/blog/${relatedPost.slug}`} className="blog-accent-text font-medium hover:underline">
                        Read More -&gt;
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <BlogStickyCTA />
    </div>
  );
}
