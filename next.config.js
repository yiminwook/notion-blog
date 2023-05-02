/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  publicRuntimeConfig: {
    siteURL: process.env.SITE_URL ?? 'https://yiminwook.vercel.app',
  },
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: ['www.notion.so', 's3.us-west-2.amazonaws.com'],
  },
};

module.exports = nextConfig;
