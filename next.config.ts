import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/selflms",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
