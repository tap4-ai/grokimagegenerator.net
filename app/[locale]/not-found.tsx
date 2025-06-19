/* eslint-disable @next/next/no-img-element */
// import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

export default function NotFound() {
  const t = useTranslations('error-page.not-found');
  return (
    <div className='flex w-screen flex-1 items-center justify-center'>
      <div className='flex flex-col items-center gap-4'>
        <img
          src='https://a.aishort.org/home/flux_pro_net/404.webp'
          className='aspect-square w-[248px] -translate-x-4 rounded-full'
          alt='404'
        />
        <h1 className='text-sm text-white/40'>{t('title')}</h1>
        <Link
          href='/'
          className='flex h-9 items-center justify-center rounded-full border border-white/40 px-2.5 text-sm uppercase text-white/40 hover:cursor-pointer hover:opacity-80'
        >
          {t('goHome')}
        </Link>
      </div>
    </div>
  );
}
