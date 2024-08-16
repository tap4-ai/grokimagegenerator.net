/* eslint-disable import/prefer-default-export */
import { objToQueryStr } from '@/lib/utils/stringUtils';

import { baseRequestData, clientFetch } from '../clientFetch';
import type { ResponseData } from '../serverFetch';

export async function unsubscribeApi(memberCardId: string) {
  const url = objToQueryStr('/draw/memberCardOrder/cancelSubscribe', { ...baseRequestData, memberCardId });

  const res = await clientFetch<ResponseData<any>>(url, {
    method: 'GET',
  });

  return res;
}
