import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: ["ryzer-v2.s3.ap-south-1.amazonaws.com"],
  },
};

export default nextConfig;

