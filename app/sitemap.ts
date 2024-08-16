import type { MetadataRoute } from 'next';
import { locales } from '@/i18n';

import { BASE_URL } from '@/lib/env';

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapRoutes = [
    {
      url: '', // home or generation
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ] satisfies MetadataRoute.Sitemap;

  const sitemapData = sitemapRoutes.flatMap((route) =>
    locales.map((locale) => {
      const lang = locale === 'en' ? '' : `/${locale}`;
      const routeUrl = route.url === '' ? '' : `/${route.url}`;
      return {
        ...route,
        url: `${BASE_URL}${lang}${routeUrl}`,
      };
    }),
  );

  return sitemapData;
}
