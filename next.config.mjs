/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewites() {
    return [];
  },
};

export default nextConfig;
