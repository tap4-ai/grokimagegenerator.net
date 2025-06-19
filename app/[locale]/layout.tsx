import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';
import { generateLanguagePaths, routing } from '@/i18n/routing';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Toaster } from '@/components/ui/sonner';
import Navigation from '@/components/home/Navigation';

import './globals.css';

// import SeoScript from '@/components/seo/SeoScript';
import { GoogleAnalytics } from '@next/third-parties/google';

// import { NavigationGuardProvider } from 'next-navigation-guard';

import LazyGlobalUI from './LazyGlobalUI';

import GoogleAdScript from '@/components/ad/GoogleAdScript';

// import ClarityScript from '@/components/scripts/ClarityScript';

// const LoginDialog = dynamic(() => import('@/components/dialog/LoginDialog'), { ssr: false });
const din = localFont({
  src: [
    {
      path: '../../public/fonts/DIN-Medium.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-din',
});

// export const dynamic = 'force-static';
export const revalidate = 7200;
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;

  const { locale } = params;

  const t = await getTranslations({
    locale,
    namespace: 'Metadata.home',
  });

  // const SITE_URL = `${process.env.NEXT_PUBLIC_SITE_URL}/`;

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
    alternates: {
      languages: {
        'x-default': './',
        ...generateLanguagePaths('', ''),
      },
      canonical: './',
    },
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('openGraph.title'),
      description: t('openGraph.description'),
      url: process.env.NEXT_PUBLIC_SITE_URL,
      siteName: t('openGraph.siteName'),
      type: 'website',
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/home/home-page.webp`,
          secureUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/images/home/home-page.webp`,
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
    },
    twitter: {
      title: t('twitter.title'),
      description: t('twitter.description'),
      site: t('twitter.site'),
      creator: t('twitter.creator'),
      card: 'summary_large_image',
      images: {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/home/home-page.webp`,
        alt: t('title'),
      },
    },
  };
}

export default async function RootLayout(props: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const { locale } = params;

  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // Enable static rendering
  setRequestLocale(locale);
  const { children } = props;

  return (
    <html lang={locale} suppressHydrationWarning className='dark'>
      <body className={`${din.variable} bg-color-bg relative mx-auto flex min-h-screen flex-col text-white`}>
        {/* <NavigationGuardProvider> */}
        <NextIntlClientProvider>
          <Toaster
            duration={2000}
            position='top-center'
            toastOptions={{
              style: {
                backgroundColor: '#202020',
                color: '#fff',
              },
            }}
          />
          <LazyGlobalUI />
          <Navigation />
          {children}
        </NextIntlClientProvider>
        {/* </NavigationGuardProvider> */}
        {/* <SeoScript /> */}
        <GoogleAdScript />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_TRACKING_ID as string} />
        {/* <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID as string} /> */}
        {/* <ClarityScript /> */}
      </body>
    </html>
  );
}
