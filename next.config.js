/** @type {import('next').NextConfig} */
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://web-api-reboot.dev.nftbank.tools';
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // domains: [
    //   // 'i.seadn.io',
    //   // 'upload.wikimedia.org',
    //   // 'lh3.googleusercontent.com',
    //   '**',
    // ],
  },
  async redirects() {
    return [
      {
        source: '/portfolio',
        destination: '/portfolio/overview',
        permanent: true,
      },
    ];
  },

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
