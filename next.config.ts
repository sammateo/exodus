import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gbxzakdtrjizqifdhmhu.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/animal-photos/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
