import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

import { BASE_URL } from '@/lib/env';

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapRoutes = [
    {
      url: '',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'privacy-policy',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'terms-of-service',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: 'blog',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ] satisfies MetadataRoute.Sitemap;

  const sitemapData = sitemapRoutes.flatMap((route) =>
    routing.locales.map((locale) => {
      const lang = locale === routing.defaultLocale ? '' : `/${locale}`;
      const routeUrl = route.url === '' ? '' : `/${route.url}`;
      return {
        ...route,
        url: `${BASE_URL}${lang}${routeUrl}/`,
      };
    }),
  );

  return sitemapData;
}
