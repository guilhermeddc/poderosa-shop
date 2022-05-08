/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'firebasestorage.googleapis.com/',
      'firebasestorage.googleapis.com',
      'firebasestorage.googleapis.com/v0/b/poderosa-estoque.appspot.com/o/',
      'firebasestorage.googleapis.com/v0/b/poderosa-estoque.appspot.com/o',
    ],
  },
};

module.exports = nextConfig;
