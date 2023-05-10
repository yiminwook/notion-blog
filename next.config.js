/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  publicRuntimeConfig: {
    SITE_URL: process.env.SITE_URL ?? 'http://localhost:3000',
  },
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    unoptimized: true,
    domains: ['www.notion.so', 's3.us-west-2.amazonaws.com'],
  },
};

module.exports = nextConfig;
