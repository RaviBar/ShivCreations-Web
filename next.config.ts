import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["zxqligfzsjhykbjcurwc.supabase.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zxqligfzsjhykbjcurwc.supabase.co",
        pathname: "/storage/v1/object/public/blogs-images/**",
      },
    ],
  },
};

export default nextConfig;

  