/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Add the domain for our Unsplash placeholder images
    domains: ['images.unsplash.com'],
  },
};

module.exports = nextConfig;