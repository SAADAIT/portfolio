import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "portfolio-seven-phi-ow4gckcb58.vercel.app", // TODO: replace with your real URL
  };
}