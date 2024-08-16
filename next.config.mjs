import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => [
    {
      source: '/startup',
      destination: '/user-growth/ai-tools-directory',
      permanent: false,
      locale: false,
    },
    {
      source: '/:locale/startup',
      destination: '/:locale/user-growth/ai-tools-directory',
      permanent: false,
      locale: false,
    },
    {
      source: '/user-growth',
      destination: '/user-growth/ai-tools-directory',
      permanent: false,
      locale: false,
    },
    {
      source: '/:locale/user-growth',
      destination: '/:locale/user-growth/ai-tools-directory',
      permanent: false,
    },
    {
      source: '/tools',
      destination: '/tools/url-converter',
      permanent: false,
      locale: false,
    },
    {
      source: '/:locale/tools',
      destination: '/:locale/tools/url-converter',
      permanent: false,
    },
  ],
  env: {
    NEXT_BASE_API: process.env.NEXT_BASE_API,
    SITE_ID: process.env.SITE_ID,
    CONTACT_US_EMAIL: process.env.CONTACT_US_EMAIL,
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
    unoptimized: true,
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
    ],
  },
  productionBrowserSourceMaps: false,
};

export default withNextIntl(nextConfig);
