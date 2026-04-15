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
  tags = [],
}: BlogPostCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="blog-card-surface overflow-hidden transition-transform duration-300 hover:-translate-y-1">
      <Link href={`/blog/${slug}`} className="block">
        <div className="blog-soft-bg relative h-48 cursor-pointer md:h-52">
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
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0B64F4] via-[#4D86F7] to-[#A9C7FF]">
              <span className="font-jakarta text-2xl font-bold text-white">BCL</span>
            </div>
          )}
        </div>
      </Link>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="blog-muted-text text-sm">{date}</p>
          {tags.length > 0 && (
            <div className="flex gap-1">
              {tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="blog-tag rounded-full px-2 py-1 text-xs"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 2 && (
                <span className="blog-muted-text text-xs">+{tags.length - 2}</span>
              )}
            </div>
          )}
        </div>
        <h2 className="blog-title-text mb-2 line-clamp-2 font-jakarta text-xl font-semibold">{title}</h2>
        <p className="blog-body-text mb-4 line-clamp-3" dangerouslySetInnerHTML={{ __html: excerpt }} />

        <div className="blog-body-text mb-4 flex items-center gap-4 text-sm">
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
          className="blog-accent-text inline-flex items-center font-medium hover:underline"
        >
          Read More <span className="ml-1">-&gt;</span>
        </Link>
      </div>
    </div>
  );
}
