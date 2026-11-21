
import { withPayload } from "@payloadcms/next/withPayload";
// Enable Cloudflare context in development
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";

initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/signs/pages",
        destination: "/signs/pages/1",
        permanent: true,
      }
    ];
  },
  turbopack: {
      resolveAlias: {
      'drizzle-kit/api': './src/stubs/drizzle-kit-api.ts',
    },
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};

export default withPayload(nextConfig);