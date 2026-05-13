import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    domains: [
      'cdn.builder.io',
      'ui-avatars.com', // ✅ Add this explicitly
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Still broad
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
