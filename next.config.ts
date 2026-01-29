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
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.bettercorporatelife.com',
          },
        ],
        destination: 'https://bettercorporatelife.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
