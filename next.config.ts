import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
   allowedDevOrigins: ["127.0.0.1"],

	images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows any website
      },
    ],
  },
  experimental: {
    serverActions:{
      bodySizeLimit: "5mb"
    }
  }
	
};

export default nextConfig;

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
