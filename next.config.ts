import type { NextConfig } from "next";

/**
 * Server Actions (the admin login form, "marquer comme lu", order status, …)
 * are rejected by Next.js with `Invalid Server Actions request.` as soon as the
 * `Origin` header sent by the browser does not match the `Host` /
 * `x-forwarded-host` header the server sees. Behind a reverse proxy — Vercel
 * preview deployments, Cloudflare, an ngrok/localtunnel tunnel, the sandbox
 * preview proxy — those two values differ, and the button then looks like it
 * does nothing.
 *
 * `experimental.serverActions.allowedOrigins` lists the extra origins that are
 * accepted (`*.example.com` matches any subdomain). Add your own preview or
 * proxy domain through the `SERVER_ACTIONS_ALLOWED_ORIGINS` environment
 * variable (comma separated) instead of editing this file.
 */
const proxyOrigins = [
  "*.e2b.app",
  "*.e2b.dev",
  "*.vercel.app",
  "*.now.sh",
  "*.arena.ai",
  "*.ngrok-free.app",
  "*.ngrok.io",
  "*.loca.lt",
];

const extraOrigins = (process.env.SERVER_ACTIONS_ALLOWED_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins = [...proxyOrigins, ...extraOrigins];

const nextConfig: NextConfig = {
  images: {
    // The catalog mixes self-hosted legacy URLs and Pexels hero images.
    // Unoptimized is fine (we use <img>), but remotePatterns unlocks next/image if you switch.
    remotePatterns: [
      { protocol: "https", hostname: "atc-maroc.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "**.vercel-storage.com" },
      { protocol: "https", hostname: "**.public.blob.vercel-storage.com" },
    ],
  },
  async rewrites() {
    return [
      // Optional bridge to a separate legacy host while restoring media. Do not
      // point this at atc-maroc.com after that domain's DNS is moved to Vercel:
      // it would proxy image requests back to the new site. For a static mirror,
      // leave LEGACY_IMAGE_BASE / NEXT_PUBLIC_LEGACY_IMAGE_BASE unset.
      ...(process.env.LEGACY_IMAGE_BASE || process.env.NEXT_PUBLIC_LEGACY_IMAGE_BASE
        ? [
            {
              source: "/wp-content/:path*",
              destination: `${(process.env.LEGACY_IMAGE_BASE || process.env.NEXT_PUBLIC_LEGACY_IMAGE_BASE || "").replace(/\/$/, "")}/wp-content/:path*`,
            },
          ]
        : []),
    ];
  },
  experimental: {
    serverActions: {
      allowedOrigins,
    },
  },
  // Dev only: Next.js refuses cross-origin requests for dev assets/HMR unless
  // the origin is listed here too.
  allowedDevOrigins: allowedOrigins,
};

export default nextConfig;
