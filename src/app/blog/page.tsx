import React from "react";
import Header from "../../components/Header";
import Footer from "@/components/Footer";
import BlogPostCard from "@/components/BlogPostCard";
import { getAllBlogPosts } from "@/data/blogPosts";

// This ensures the page is statically generated at build time
export const dynamic = 'force-static';

export default function BlogPage() {
  const blogPosts = getAllBlogPosts();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto pt-32 px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Stocai Blog</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Insights and reflections on introspection, mindful decision-making, and personal clarity.
            </p>
          </div>
          
          {/* Featured Post */}
          {blogPosts.length > 0 && (
            <div className="mb-16">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden md:flex">
                <div className="md:w-1/2 h-64 md:h-auto bg-gray-200 relative">
                  {blogPosts[0].imageUrl ? (
                    <div className="w-full h-full bg-gradient-to-r from-[#54B0AF] to-[#7ED5D4] flex items-center justify-center">
                      <span className="text-white text-3xl font-bold">Stocai</span>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-[#54B0AF] to-[#7ED5D4] flex items-center justify-center">
                      <span className="text-white text-3xl font-bold">Stocai</span>
                    </div>
                  )}
                </div>
                <div className="p-8 md:w-1/2 flex flex-col justify-center">
                  <p className="text-sm text-gray-500 mb-2">{blogPosts[0].date}</p>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{blogPosts[0].title}</h2>
                  <p className="text-gray-600 mb-6">{blogPosts[0].excerpt}</p>
                  <a href={`/blog/${blogPosts[0].slug}`} className="inline-block bg-[#54B0AF] text-white py-2 px-6 rounded-full hover:bg-[#489998] transition-colors">
                    Read Article
                  </a>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <BlogPostCard
                key={post.id}
                id={post.id}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                imageUrl={post.imageUrl}
                slug={post.slug}
              />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 