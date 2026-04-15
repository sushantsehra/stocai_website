"use client";

import React, { useMemo, useState } from "react";
import BlogPostCard from "@/components/BlogPostCard";
import { type BlogPost } from "../../data/blogPosts";

interface BlogPageClientProps {
  initialBlogPosts: BlogPost[];
}

export default function BlogPageClient({ initialBlogPosts }: BlogPageClientProps) {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  
  // Get all unique tags from blog posts
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    initialBlogPosts.forEach(post => {
      post.tags.forEach(tag => tagSet.add(tag));
    });
    return ['All', ...Array.from(tagSet).sort()];
  }, [initialBlogPosts]);

  // Filter posts based on selected tag
  const filteredPosts = useMemo(() => {
    if (selectedTag === 'All') {
      return initialBlogPosts;
    }
    return initialBlogPosts.filter(post => 
      post.tags.includes(selectedTag)
    );
  }, [initialBlogPosts, selectedTag]);

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
    
    // Truncate if too long (optional)
    if (formatted.length > 200) {
      formatted = formatted.substring(0, 200) + '...';
    }
    
    return formatted;
  };

  return (
    <main className="container mx-auto px-4 pb-32 pt-6 md:pt-10">
      <div className="max-w-7xl mx-auto">
        {/* Tag Filter Navigation */}
        {initialBlogPosts.length > 0 && (
          <div className="mb-12">
            <div className="flex flex-wrap justify-start gap-3">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                    selectedTag === tag
                      ? 'blog-filter-active'
                      : 'blog-filter blog-soft-bg-hover hover:shadow-md'
                  }`}
                >
                  {tag}
                  {tag !== 'All' && (
                    <span className="ml-2 text-xs opacity-75">
                      ({initialBlogPosts.filter(post => post.tags.includes(tag)).length})
                    </span>
                  )}
                  {tag === 'All' && (
                    <span className="ml-2 text-xs opacity-75">
                      ({initialBlogPosts.length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post: BlogPost) => (
              <BlogPostCard
                key={post.id}
                id={post.id}
                title={post.title}
                excerpt={formatExcerpt(post.excerpt)}
                date={post.date}
                imageUrl={post.imageUrl}
                slug={post.slug}
                likeCount={post.like_count || 0}
                commentCount={post.comment_count || 0}
                tags={post.tags}
              />
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <p className="blog-body-text text-lg">
              {initialBlogPosts.length === 0
                ? "No blog posts are available from the backend right now."
                : `No blog posts found for the “${selectedTag}” tag.`}
            </p>
          </div>
        ) : null}
      </div>
    </main>
  );
} 
