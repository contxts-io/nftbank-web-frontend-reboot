/** @type {import('next').NextConfig} */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/v1/:path*',
        destination: `${API_BASE_URL}/v1/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
