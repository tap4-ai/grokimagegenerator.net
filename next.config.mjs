import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  redirects: async () => [],
  turbopack: {},
  env: {
    NEXT_BASE_API: process.env.NEXT_BASE_API,
    SITE_ID: process.env.SITE_ID,
  },
  trailingSlash: true,
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'dev-test.xiaoxiaoqi.cn',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.artiversehub.ai',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.topshort.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'a.aishort.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.fluxia.pro',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'c.topshort.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.bestimage.ai',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.grokimagegenerator.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'myimg.aifacefy.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.videoweb.ai',
        port: '',
        pathname: '/**',
      },
    ],
  },
  productionBrowserSourceMaps: false,
};

export default withNextIntl(nextConfig);
