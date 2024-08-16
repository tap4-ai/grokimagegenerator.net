'use client';

/* eslint-disable consistent-return */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CircleCheckBig } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { PAYMENT_INFO_KEY, PAYMENT_INFO_TYPE } from '@/lib/constants';
import { showConfettiFireworks } from '@/lib/utils/uiUtils';
import useUpdateUserInfo from '@/hooks/useUpdateUserInfo';
import { Link, useRouter } from '@/app/navigation';

export default function Page() {
  const t = useTranslations('Pricing.payment');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { updateUserInfo } = useUpdateUserInfo();

  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    updateUserInfo();
    showConfettiFireworks();
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      router.push('/');
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [seconds, router]);

  return (
    <div className=' flex h-screen w-full flex-col items-center justify-center gap-2'>
      {searchParams.get(PAYMENT_INFO_KEY) === PAYMENT_INFO_TYPE && (
        <div className='flex items-center gap-2 text-teal-500'>
          <CircleCheckBig />
          <p>{t('success')}</p>
        </div>
      )}
      <Link href='/' className='flex h-10 items-center gap-3 rounded-lg bg-white px-3 text-black'>
        {t('Home')}
      </Link>
      <div>
        {t('redirect')} {`${seconds}`} s
      </div>
    </div>
  );
}
