import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    // Tree-shake heavy icon / animation packages
    optimizePackageImports: ["lucide-react", "motion"],
  },
};

export default withNextIntl(nextConfig);