'use client';

import React, { useState, useMemo } from "react";
import BlogPostCard from "@/components/BlogPostCard";
// import FeaturedPostImage from "@/components/FeaturedPostImage";
import { type BlogPost } from "../../data/blogPosts";
// import { ThumbsUp, MessageCircle } from "lucide-react";

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
    <main className="container mx-auto px-4 pb-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Stocai Blog</h1>
          <p className="text-xl text-[#323232] max-w-3xl mx-auto">
            Insights and reflections on introspection, mindful decision-making, and personal clarity.
          </p>
        </div>
        
        {/* Featured Post */}
        {/* {filteredPosts.length > 0 && ( */}
          {/* // <div className="mb-16"> */}
          {/* //   <div className="bg-white rounded-xl shadow-lg overflow-hidden md:flex"> */}
          {/* //     <FeaturedPostImage  */}
          {/* //       imageUrl={filteredPosts[0].imageUrl}  */}
          {/* //       title={filteredPosts[0].title}  */}
          {/* //     /> */}
          {/* //     <div className="p-8 md:w-1/2 flex flex-col justify-center"> */}
          {/* //       <div className="flex items-center gap-2 mb-2"> */}
          {/* //         <p className="text-sm text-[#323232]">{filteredPosts[0].date}</p> */}
          {/* //         {filteredPosts[0].tags.length > 0 && ( */}
          {/* //           <div className="flex gap-1"> */}
          {/* //             {filteredPosts[0].tags.slice(0, 2).map((tag, index) => ( */}
          {/* //               <span */}
          {/* //                 key={index} */}
          {/* //                 className="text-xs bg-[#54B0AF] text-white px-2 py-1 rounded-full" */}
          {/* //               > */}
          {/* //                 {tag} */}
          {/* //               </span> */}
          {/* //             ))} */}
          {/* //           </div> */}
          {/* //         )} */}
          {/* //       </div> */}
          {/* //       <h2 className="text-2xl md:text-3xl font-bold mb-4">{filteredPosts[0].title}</h2> */}
          {/* //       <p className="text-[#323232] mb-4" dangerouslySetInnerHTML={{ __html: formatExcerpt(filteredPosts[0].excerpt) }} /> */}
                
           {/* Engagement Stats for Featured Post */}
          {/* //       <div className="flex items-center gap-6 text-[#323232] text-sm mb-6"> */}
          {/* //         <div className="flex items-center gap-2"> */}
          {/* //           <ThumbsUp className="w-5 h-5" /> */}
          {/* //           <span>{filteredPosts[0].like_count || 0}</span> */}
          {/* //         </div> */}
          {/* //         <div className="flex items-center gap-2"> */}
          {/* //           <MessageCircle className="w-5 h-5" /> */}
          {/* //           <span>{filteredPosts[0].comment_count || 0}</span> */}
          {/* //         </div> */}
          {/* //       </div> */}
                
          {/* //       <a href={`/blog/${filteredPosts[0].slug}`} className="inline-block bg-[#54B0AF] text-white py-2 px-6 rounded-full hover:bg-[#489998] transition-colors"> */}
          {/* //         Read Article */}
          {/* //       </a> */}
          {/* //     </div> */}
          {/* //   </div> */}
          {/* // </div> */}
        {/* // )} */}

        {/* Tag Filter Navigation */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-start gap-3">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-[#54B0AF] text-white shadow-lg'
                    : 'bg-gray-100 text-[#323232] hover:bg-gray-200 hover:shadow-md'
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
            <p className="text-[#323232] text-lg">No blog posts found for the &ldquo;{selectedTag}&rdquo; tag.</p>
          </div>
        ) : null}
      </div>
    </main>
  );
} 