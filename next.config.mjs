/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow the Arena preview proxy host(s) to talk to the dev server.
  allowedDevOrigins: [
    '*.e2b.app',
    '*.arena.ai',
    'localhost',
    '127.0.0.1',
  ],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
