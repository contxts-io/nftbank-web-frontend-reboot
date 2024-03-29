/** @type {import('next').NextConfig} */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const nextConfig = {
  transpilePackages: ['jotai-devtools'],
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    unoptimaised: true,
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
        source: '/',
        destination: '/portfolio/overview',
        permanent: true,
      },
      {
        source: '/portfolio',
        destination: '/portfolio/overview',
        permanent: true,
      },
      {
        source: '/settings',
        destination: '/settings/manageWallets',
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
      {
        source: '/v1auth/:path*',
        destination: `https://reboot-auth.onrender.com/v1/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
