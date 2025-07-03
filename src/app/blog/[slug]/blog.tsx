import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogInteractions from '@/components/BlogInteractions';
import { getBlogPost, getAllBlogPosts, type BlogPost } from '../../../data/blogPosts';
import type { DynamicBlogPost } from '@/types/blog';

interface BlogProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

// This component can handle both static and dynamic blog posts
export default async function BlogPage({ params }: BlogProps) {
  const { slug } = params;
  
  // Try to get static blog post first
  const staticPost = await getBlogPost(slug);

  // Helper function to format excerpt content
  const formatExcerpt = (excerpt: string) => {
    if (!excerpt) return '';
    
    // Remove any HTML tags
    let formatted = excerpt.replace(/<[^>]*>/g, '');
    
    // Handle basic markdown formatting
    formatted = formatted
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markdown
      .replace(/\*(.*?)\*/g, '$1')     // Remove italic markdown
      .replace(/`(.*?)`/g, '$1')       // Remove code markdown
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'); // Remove links, keep text
    
    // Clean up extra whitespace and line breaks
    formatted = formatted
      .replace(/\s+/g, ' ')            // Multiple spaces to single space
      .replace(/\n+/g, ' ')            // Line breaks to spaces
      .trim();
    
    // Truncate if too long (keep shorter for related posts)
    if (formatted.length > 150) {
      formatted = formatted.substring(0, 150) + '...';
    }
    
    return formatted;
  };
  
  // If no static post found, this could be a dynamic blog post
  // For now, we'll use the static post structure, but you can extend this
  // to fetch dynamic posts from your API
  
  if (!staticPost) {
    notFound();
  }

  const fallbackURL = "https://media.istockphoto.com/id/2174551157/photo/cyber-security-data-protection-business-technology-privacy-concept.jpg?s=2048x2048&w=is&k=20&c=sCjAoM5vMvI7PXGFaTaOnRr1AppyOWmxPHkckruBq_A=";

  // Convert static post to dynamic format for interactions
  const dynamicBlog: DynamicBlogPost = {
    blog_id: staticPost.id,
    title: staticPost.title,
    description: staticPost.content,
    username: staticPost.author,
    created_at: staticPost.date,
    image_url: staticPost.imageUrl,
    blog_tags: staticPost.tags.join(','),
    like_count: staticPost.like_count || 0, // Use actual like_count from backend or default to 0
    comment_count: staticPost.comment_count || 0, // Use actual comment_count from backend or default to 0
  };

  // Convert markdown-like content to HTML (same as existing page.tsx)
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

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto pt-32 px-4 pb-16">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center text-[#54B0AF] mb-8 hover:underline">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to All Articles
          </Link>
          
          <article className="bg-white shadow-lg rounded-xl overflow-hidden">
            {/* Blog Image */}
            <img
              src={staticPost.imageUrl || fallbackURL}
              alt={staticPost.title}
              className="w-full h-64 object-cover"
            />
            
            <div className="p-8">
              {/* Blog Header */}
              <header className="mb-6">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(staticPost.author)}&background=54B0AF&color=fff`}
                      alt={staticPost.author}
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    <span className="text-gray-900 font-medium">{staticPost.author}</span>
                  </div>
                  <span>{new Date(staticPost.date).toLocaleDateString()}</span>
                </div>
                
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{staticPost.title}</h1>
                {/* <p className="text-xl text-gray-600 mb-4">{staticPost.excerpt}</p> */}
                
                {/* Blog Tags */}
                                 {staticPost.tags && staticPost.tags.length > 0 && (
                   <div className="flex flex-wrap gap-2">
                     {staticPost.tags.map((tag: string) => (
                      <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </header>
              
              {/* Blog Content */}
              <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: formatContent(staticPost.content) }} />
              </div>
              
              {/* Interactive Features */}
              <BlogInteractions blog={dynamicBlog} slug={slug} />
            </div>
          </article>
          
          {/* Related Posts */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold mb-4">Continue Reading</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {(await getAllBlogPosts())
                .filter((p: BlogPost) => p.id !== staticPost.id)
                .slice(0, 2)
                .map((relatedPost: BlogPost) => (
                  <div key={relatedPost.id} className="bg-white rounded-lg shadow-md overflow-hidden border">
                    <div className="p-6">
                      <p className="text-sm text-gray-500 mb-2">{relatedPost.date}</p>
                      <h3 className="text-xl font-semibold mb-2">{relatedPost.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{formatExcerpt(relatedPost.excerpt)}</p>
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
