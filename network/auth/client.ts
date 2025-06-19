/* eslint-disable import/prefer-default-export */

import { clientFetch } from '../clientFetch';
import type { ResponseData } from '../type';

export async function getCountry() {
  const res = await clientFetch<ResponseData<{ country: string }>>('/auth/getCountry', {
    method: 'GET',
  });
  return res;
}
