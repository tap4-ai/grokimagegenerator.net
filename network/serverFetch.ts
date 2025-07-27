'use server';

import { cookies } from 'next/headers';
import { defaultLocale, languages } from '@/i18n/routing';
import { getLocale } from 'next-intl/server';

import { AUTHORIZATION } from '@/lib/constants';
import { BASE_API, SITE_ID } from '@/lib/env';
import { generateBearerToken, objToQueryStr } from '@/lib/utils/stringUtils';

import { ResponseBase } from './type';

function getContentLanguage(code?: string): string {
  return languages.find((item) => item.lang === code)?.backendValue || defaultLocale;
}

export default async function serverFetch<T = ResponseBase<unknown>>({
  endpoint,
  data,
  options,
}: {
  endpoint: string;
  data?: Record<string, any>;
  options?: RequestInit & { needCookie?: boolean };
}): Promise<T> {
  let url = BASE_API + endpoint;
  let { needCookie, ...configOptions } = options ?? {};
  needCookie = needCookie ?? true;
  const baseRequestData = {
    site: SITE_ID,
  };

  if (!options?.method || options.method === 'GET') {
    url = objToQueryStr(url, {
      ...baseRequestData,
      ...data,
    });
  } else {
    configOptions = {
      ...configOptions,
      body: JSON.stringify({
        ...baseRequestData,
        ...data,
      }),
    };
  }

  const cookieStore = needCookie ? await cookies() : null;
  // console.log('url', url);
  // console.log('configOptions', configOptions);
  const locale = needCookie ? await getLocale() : undefined;
  console.log(locale, 'locale');
  const res = await fetch(url, {
    ...configOptions,
    headers: {
      'Content-Language': getContentLanguage(locale),
      authorization: cookieStore?.get(AUTHORIZATION)?.value
        ? generateBearerToken(cookieStore?.get(AUTHORIZATION)?.value as string)
        : '',
      ...configOptions?.headers,
    },
  });

  if (!res.ok) {
    return {
      code: 500,
      msg: res.statusText,
    } as T;
  }

  return (await res.json()) as T;
}
