"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThumbsUp, MessageCircle } from "lucide-react";

interface BlogPostCardProps {
  id: string | number;
  title: string;
  excerpt: string;
  date: string;
  imageUrl?: string;
  slug: string;
  likeCount?: number;
  commentCount?: number;
  tags?: string[];
}

export default function BlogPostCard({ 
  title, 
  excerpt, 
  date, 
  imageUrl, 
  slug,
  likeCount = 0,
  commentCount = 0,
  tags = []
}: BlogPostCardProps) {
  const [imageError, setImageError] = useState(false);
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:translate-y-[-5px]">
      <Link href={`/blog/${slug}`} className="block">
        <div className="h-48 bg-gray-200 relative cursor-pointer">
          {imageUrl && !imageError ? (
            <Image 
              src={imageUrl} 
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-gradient-to-r from-[#54B0AF] to-[#7ED5D4]">
              <span className="text-white text-2xl font-bold">Stocai</span>
            </div>
          )}
        </div>
      </Link>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-[#323232]">{date}</p>
          {tags.length > 0 && (
            <div className="flex gap-1">
              {tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-[#54B0AF] text-white px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 2 && (
                <span className="text-xs text-[#323232]">+{tags.length - 2}</span>
              )}
            </div>
          )}
        </div>
        <h2 className="text-xl font-semibold mb-2 line-clamp-2">{title}</h2>
        <p className="text-[#323232] mb-4 line-clamp-3" dangerouslySetInnerHTML={{ __html: excerpt }} />
        
        {/* Engagement Stats */}
        <div className="flex items-center gap-4 text-[#323232] text-sm mb-4">
          <div className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4" />
            <span>{likeCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            <span>{commentCount}</span>
          </div>
        </div>
        
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