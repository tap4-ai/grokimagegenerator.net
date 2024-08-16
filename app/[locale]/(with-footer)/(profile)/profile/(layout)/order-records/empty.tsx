/* eslint-disable @next/next/no-img-element */
// import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Link } from '@/app/navigation';

export default function Empty() {
  const t = useTranslations('Profile.order');

  return (
    <div className='flex size-full items-center justify-center'>
      <div className='flex flex-col items-center gap-1'>
        <img src='/images/profile/order-empty.png' alt='empty' className='max-w-[82px]' />
        <h2 className='text-xs text-white/40'>{t('no-data')}</h2>
        <Link
          href='/pricing'
          className='flex h-7 min-w-[92px] items-center justify-center rounded bg-white text-xs text-[#2C2D36]'
        >
          {t('price')}
        </Link>
      </div>
    </div>
  );
}
