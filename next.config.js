/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'default',
    path: 'http://test.wynode.com/',
    unoptimized: true,
  },
}

module.exports = nextConfig
