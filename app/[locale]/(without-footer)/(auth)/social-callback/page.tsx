'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { loginSystem, UserData } from '@/network/auth';
import useGlobalLoginStore from '@/store/useGlobalLoginStore';
import useLocalRedirectUrlStore, { localRedirectUrlStoreKey } from '@/store/useLocalRedirectUrlStore';
import useUserInfoStore from '@/store/useUserInfoStore';
import { useTranslations } from 'next-intl';

import Loading from '@/components/Loading';

export interface OauthCallback {
  grantType: string;
  code: string;
  state: string;
  uuid: string;
  source: string;
  socialCode: string;
  socialState: string;
  userType: number;
  site?: string;
  redirectUrl: string;
}

// export function setClientCookie(name: string, value: string, expire: number) {
//   const expires = new Date();
//   expires.setTime(expires.getTime() + expire * 1000);
//   document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
// }

function Page() {
  const t = useTranslations('Login');
  const result = useSearchParams();
  // const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const setAuth = useUserInfoStore((state) => state.setAuth);
  const setUserInfo = useUserInfoStore((state) => state.setUserInfo);
  const localRedirectUrl = useLocalRedirectUrlStore((state) => state.localRedirectUrl);
  // const setLocalRedirectUrl = useLocalRedirectUrlStore((state) => state.setLocalRedirectUrl);
  const setOpen = useGlobalLoginStore((state) => state.setOpen);

  useEffect(() => {
    (async () => {
      const callbackData: OauthCallback = {
        grantType: 'social',
        code: result.get('code') ?? '',
        state: result.get('state') ?? '',
        uuid: '', // UUID需要根据上下文确定如何获取
        source: result.get('source') ?? '',
        socialCode: result.get('code') ?? '',
        socialState: result.get('state') ?? '',
        userType: 0, // drawUserType需要根据上下文确定具体值
        // site: process.env.SITE_ID as string, // site需要根据上下文确定具体值
        redirectUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/social-callback?source=${result.get('source')}`,
      };

      try {
        const res = await loginSystem({
          socialData: callbackData,
        });
        const { auth, userInfo } = res.data as UserData;
        setAuth(auth);
        setUserInfo(userInfo);
        const str = localStorage.getItem(localRedirectUrlStoreKey) || '';
        const url = localRedirectUrl || JSON.parse(str)?.state?.localRedirectUrl || '/';
        router.push(url);
      } catch (error) {
        // console.log(error);
        setLoading(false);
      }
    })();
  }, [localRedirectUrl]); // Add a comma here

  return (
    <div className='flex h-screen items-center justify-center'>
      {loading ? (
        <Loading className='h-12 w-12' />
      ) : (
        <div className='flex-y-center'>
          <div>{t('tryAgain')}</div>
          <button
            type='button'
            onClick={() => setOpen(true)}
            className='bg-ag-pink rounded-lg p-2 text-white hover:opacity-80'
          >
            {t('goToLogin')}
          </button>
        </div>
      )}
    </div>
  );
}

export default Page;
