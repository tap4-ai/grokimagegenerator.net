'use client';

import useGlobalLoginStore from '@/store/useGlobalLoginStore';
import useLocalRedirectUrlStore from '@/store/useLocalRedirectUrlStore';
import { useTranslations } from 'next-intl';

import { usePathname } from '@/i18n/navigation';

import LoginExpiredIcon from './svg/401';

export default function Unauthorized() {
  const pathname = usePathname();
  const t = useTranslations('error-page.login-expired');
  const setLocalRedirectUrl = useLocalRedirectUrlStore((state) => state.setLocalRedirectUrl);
  const openLoginDialog = useGlobalLoginStore((state) => state.setOpen);

  const onLogin = () => {
    openLoginDialog(true);
    setLocalRedirectUrl(pathname);
  };

  return (
    <div className='mx-auto flex h-screen flex-1 items-center justify-center'>
      <div className='flex flex-col items-center gap-4'>
        <LoginExpiredIcon />
        <h1 className='text-sm text-white/40'>{t('title')}</h1>
        <button
          type='button'
          onClick={onLogin}
          className='flex h-9 items-center justify-center rounded-full border border-white/40 px-2.5 text-sm uppercase text-white/40 hover:cursor-pointer hover:opacity-80'
        >
          {t('login')}
        </button>
      </div>
    </div>
  );
}
