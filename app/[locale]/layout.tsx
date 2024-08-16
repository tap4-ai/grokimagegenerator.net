import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { generateLanguagePaths } from '@/i18n';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { Toaster } from '@/components/ui/sonner';
import Navigation from '@/components/home/Navigation';

import './globals.css';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
// import SeoScript from '@/components/seo/SeoScript';
import { GoogleAnalytics } from '@next/third-parties/google';

// import GoogleAdScript from '@/components/ad/GoogleAdScript';
// import ClarityScript from '@/components/scripts/ClarityScript';

import Loading from './loading';

// const LoginDialog = dynamic(() => import('@/components/dialog/LoginDialog'), { ssr: false });
const GlobalLoginDialog = dynamic(() => import('@/components/auth/GlobalLoginDialog'), { ssr: false });
const LogoutDialog = dynamic(() => import('@/components/dialog/LogoutDialog'), { ssr: false });
const LoginExpireDialog = dynamic(() => import('@/components/dialog/LoginExpireDialog'), { ssr: false });
const PricingImageDialog = dynamic(() => import('@/components/dialog/PricingImageDialog'), { ssr: false });
const InsufficientCreditsDialog = dynamic(() => import('@/components/dialog/InsufficientCreditsDialog'), {
  ssr: false,
});

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

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
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
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/home/home-page.jpg`,
          secureUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/images/home/home-page.jpg`,
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
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/home/home-page.jpg`,
        alt: t('title'),
      },
    },
  };
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();

  return (
    <html lang={locale} suppressHydrationWarning className='dark'>
      <body className={`${din.variable} relative mx-auto flex min-h-screen flex-col bg-black text-white`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Toaster
            icons={{
              success: <span className='sr-only'>icon</span>,
              error: <span className='sr-only'>icon</span>,
            }}
            position='top-center'
            toastOptions={{
              classNames: {
                success: 'text-ag-green border-ag-green ag-toast',
                error: 'text-ag-red border-ag-red ag-toast',
                info: 'ag-toast',
                warning: 'ag-toast',
              },
            }}
          />
          {/* <LoginDialog /> */}
          <GlobalLoginDialog />
          <LoginExpireDialog />
          <LogoutDialog />
          <PricingImageDialog />
          <InsufficientCreditsDialog />
          <Navigation />
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </NextIntlClientProvider>
        {/* <SeoScript /> */}
        {/* <GoogleAdScript /> */}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_TRACKING_ID as string} />
        {/* <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID as string} /> */}
        {/* <ClarityScript /> */}
      </body>
    </html>
  );
}
