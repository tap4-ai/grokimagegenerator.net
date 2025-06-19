'use client';

import { defaultLocale, languages } from '@/i18n/routing';
import { USER_INFO_KEY, type UserInfoState } from '@/store/useUserInfoStore';

import { clientSideGetCookie, generateBearerToken, objToQueryStr } from '@/lib/utils/stringUtils';

export const baseRequestData = {
  site: process.env.SITE_ID,
};

function getContentLanguage(code?: string): string {
  return languages.find((item) => item.lang === code)?.backendValue || defaultLocale;
}

export const clientFetch = async <T = any>(
  urlStr: Parameters<typeof fetch>[0],
  options?: Parameters<typeof fetch>[1],
) => {
  const userInfoStr = localStorage.getItem(USER_INFO_KEY);
  const userInfoObj = JSON.parse(userInfoStr!) as { state: UserInfoState };
  const url = `${process.env.NEXT_BASE_API}${urlStr}`;

  const headers = {
    credentials: 'include',
    'Content-Type': 'application/json',
    'Content-Language': getContentLanguage(clientSideGetCookie('NEXT_LOCALE') || defaultLocale),
    ...options?.headers,
  } as Record<string, string>;

  try {
    headers.authorization = generateBearerToken(userInfoObj.state.auth!.access_token);
  } catch (_) {
    console.log('userInfoObj', userInfoObj);
  }

  const initOptions = {
    headers,
    ...options,
  } satisfies Parameters<typeof fetch>[1];

  if (options?.method !== 'GET' && options?.body) {
    initOptions.body = JSON.stringify({
      ...baseRequestData,
      ...JSON.parse(options?.body as string),
    });
  }

  const res = await fetch(url, initOptions);

  if (!res.ok) {
    return {
      code: 500,
      msg: res.statusText,
    } as T;
  }
  return res.json() as T;
};

export const fetcher = (...args: any[]) => {
  let endpoint = '';
  let data = { ...baseRequestData };

  const [urlStrOrArray] = args;

  if (typeof urlStrOrArray === 'string') {
    endpoint = urlStrOrArray;
  }

  if (Array.isArray(urlStrOrArray)) {
    const [urlString, swrData] = urlStrOrArray;
    endpoint = urlString;
    data = { ...data, ...swrData };
  }

  const url = objToQueryStr(endpoint, data);

  return clientFetch(url, { method: 'GET' });
};
