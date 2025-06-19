/* eslint-disable import/prefer-default-export */
import { clientFetch } from '../clientFetch';
import type { ResponseData } from '../type';

export async function userCheckIn() {
  const res = await clientFetch<ResponseData<any>>('/navigation/sign', {
    method: 'PUT',
  });
  return res;
}

export async function deleteAccount() {
  const res = await clientFetch<ResponseData<null>>('/draw/clientUser/delete', {
    method: 'DELETE',
  });
  return res;
}
