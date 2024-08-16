'use server';

import { cookies } from 'next/headers';
import { languages } from '@/i18n';

import { AUTHORIZATION } from '@/lib/constants';
import { BASE_API, SITE_ID } from '@/lib/env';
import { generateBearerToken, objToQueryStr } from '@/lib/utils/stringUtils';

export type ResponseBase<T> = {
  code: number;
  msg: string;
} & T;

export type ResponseRows<T = any> = ResponseBase<{
  total: number;
  rows: T;
}>;

export type ResponseData<T = any> = ResponseBase<{
  data: T;
}>;

function getContentLanguage(code?: string): string {
  return languages.find((item) => item.lang === code)?.backendValue || 'en';
}

export default async function serverFetch<T = Response>({
  endpoint,
  data,
  options,
}: {
  endpoint: string;
  data?: Record<string, any>;
  options?: Parameters<typeof fetch>[1];
}): Promise<T> {
  let url = BASE_API + endpoint;
  let configOptions: Parameters<typeof fetch>[1] = { ...options };
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

  // console.log('url', url);
  // console.log('configOptions', configOptions);
  const res = await fetch(url, {
    ...configOptions,
    headers: {
      'Content-Language': getContentLanguage(cookies()?.get('NEXT_LOCALE')?.value),
      authorization: cookies()?.get(AUTHORIZATION)?.value
        ? generateBearerToken(cookies()?.get(AUTHORIZATION)?.value as string)
        : '',
      ...configOptions?.headers,
    },
  });

  return (await res.json()) as T;
}
