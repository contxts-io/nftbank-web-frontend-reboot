/** @type {import('next').NextConfig} */
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://web-api-reboot.dev.nftbank.tools';
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
