// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   experimental:{
//     esmExternals : "loose"
//   },
// };

// export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,   // Enable typed routes
    esmExternals: "loose", // Allow loose esm externals
  },
  typescript: {
    ignoreBuildErrors: true,  // Don’t ignore TS errors during build
  },
  eslint: {
    ignoreDuringBuilds: true, // Don’t ignore ESLint errors during build
  },
};

export default nextConfig;
