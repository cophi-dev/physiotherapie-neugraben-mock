import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  async redirects() {
    return [
      {
        source: "/oeffnungzeiten-und-kontakt",
        destination: "/#kontakt",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
