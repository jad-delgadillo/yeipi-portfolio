import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "pub-d24c6b501d254fb2949ddc37e644d121.r2.dev",
      },
    ],
  },
};

export default nextConfig;
