'use client';

import useGlobalLoginStore from '@/store/useGlobalLoginStore';
import useLocalRedirectUrlStore from '@/store/useLocalRedirectUrlStore';
import useUserInfoStore from '@/store/useUserInfoStore';
import { ArrowRight, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';
import { isToday } from '@/lib/utils/timeUtils';
import CheckInIcon from '@/components/svg/check-in-icon';
import { usePathname, useRouter } from '@/i18n/navigation';

export default function CheckIn({ className }: { className?: string }) {
  const t = useTranslations('components.check-in');
  const router = useRouter();
  const pathname = usePathname();

  const userInfo = useUserInfoStore((state) => state.userInfo);
  const setLocalRedirectUrl = useLocalRedirectUrlStore((state) => state.setLocalRedirectUrl);
  const openLoginDialog = useGlobalLoginStore((state) => state.setOpen);

  const isCheckToday = isToday(userInfo?.signInTime || 0);

  const handleCheckIn = () => {
    if (!userInfo) {
      setLocalRedirectUrl(pathname);
      openLoginDialog(true);
      return;
    }

    router.push('/pricing');
  };

  return (
    <div className={cn('flex h-14 w-full rounded-xl bg-color-main p-px lg:w-fit', className)}>
      <div className='rounded-inherit flex flex-1 items-center gap-5 pl-3 pr-2'>
        <div className='flex items-center gap-1 text-nowrap font-semibold'>
          <CheckInIcon />
          {t('title')}
        </div>
        <button
          type='button'
          onClick={handleCheckIn}
          disabled={isCheckToday}
          className={cn(
            'flex h-10 w-10 items-center justify-center gap-1 rounded-lg bg-white text-black lg:w-fit lg:px-6',
            isCheckToday ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:opacity-70',
          )}
        >
          {isCheckToday ? (
            <>
              <span className='hidden text-teal-400 lg:block'>{t('finish-check-in')}</span>
              <Check className='h-4 w-4 text-teal-400' />
            </>
          ) : (
            <>
              <span className='hidden text-nowrap lg:block'>{t('go-check-in')}</span>
              <ArrowRight className='h-4 w-4' />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
