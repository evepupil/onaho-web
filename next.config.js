/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      }
    ],
  },
  // 禁用类型检查
  typescript: {
    ignoreBuildErrors: true,
  },
  // 禁用 ESLint
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig; 