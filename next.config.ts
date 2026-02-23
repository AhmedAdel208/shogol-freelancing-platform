import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'shogol.runasp.net',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'shogol.runasp.net',
        port: '',
      },
    ],
  },
};

export default nextConfig;
