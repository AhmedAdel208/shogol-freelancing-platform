import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "shogol.runasp.net",
        port: "",
        pathname: "/api/File/**",
      },
    ],
  },
};

export default nextConfig;
