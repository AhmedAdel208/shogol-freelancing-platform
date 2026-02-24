import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
