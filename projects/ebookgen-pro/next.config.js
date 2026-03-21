/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['saldaclaw-viz.vercel.app', 'www.w3.org'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
