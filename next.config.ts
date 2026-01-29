import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
