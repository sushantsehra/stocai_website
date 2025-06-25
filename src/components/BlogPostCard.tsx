import React from "react";
import Link from "next/link";
import Image from "next/image";

interface BlogPostCardProps {
  id: string | number;
  title: string;
  excerpt: string;
  date: string;
  imageUrl?: string;
  slug: string;
}

export default function BlogPostCard({ 
  id, 
  title, 
  excerpt, 
  date, 
  imageUrl, 
  slug 
}: BlogPostCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:translate-y-[-5px]">
      <div className="h-48 bg-gray-200 relative">
        {imageUrl ? (
          <Image 
            src={imageUrl} 
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gradient-to-r from-[#54B0AF] to-[#7ED5D4]">
            <span className="text-white text-2xl font-bold">Stocai</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <p className="text-sm text-gray-500 mb-2">{date}</p>
        <h2 className="text-xl font-semibold mb-2 line-clamp-2">{title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>
        <Link 
          href={`/blog/${slug}`} 
          className="text-[#54B0AF] font-medium hover:underline inline-flex items-center"
        >
          Read More <span className="ml-1">→</span>
        </Link>
      </div>
    </div>
  );
} 