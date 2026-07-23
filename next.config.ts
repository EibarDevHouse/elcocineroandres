import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [480, 640],
    imageSizes: [200, 480],
    minimumCacheTTL: 31536000,
  },
  compress: true,
};

export default nextConfig;
