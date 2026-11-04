import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  transpilePackages: ["@repo/db"],
  partialPrefetching: true,
};

export default nextConfig;
