"use client";

import React, { useState } from "react";

interface FeaturedPostImageProps {
  imageUrl?: string;
  title: string;
}

export default function FeaturedPostImage({ imageUrl, title }: FeaturedPostImageProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="md:w-1/2 h-64 md:h-auto bg-gray-200 relative">
      {imageUrl && !imageError ? (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-r from-[#54B0AF] to-[#7ED5D4] flex items-center justify-center">
          <span className="text-white text-3xl font-bold">Stocai</span>
        </div>
      )}
    </div>
  );
} 