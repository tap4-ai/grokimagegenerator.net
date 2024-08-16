/* eslint-disable import/prefer-default-export */
import { clientFetch } from '../clientFetch';
import type { ResponseData } from '../serverFetch';

export async function userCheckIn() {
  const res = await clientFetch<ResponseData<any>>('/navigation/sign', {
    method: 'PUT',
  });
  return res;
}
