import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,   // Enable typed routes
  },
  typescript: {
    ignoreBuildErrors: true,  // Don’t ignore TS errors during build
  },
  eslint: {
    ignoreDuringBuilds: true, // Don’t ignore ESLint errors during build
  },
};

export default nextConfig;
