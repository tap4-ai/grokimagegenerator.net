/* eslint-disable import/prefer-default-export */
import { ResponseData } from '@/network/type';

import { clientFetch } from '../clientFetch';

export type LikeBlogRequestData = {
  action: 'up' | 'down';
  nameId: string;
};

export const likeBlog = async (data: LikeBlogRequestData) => {
  const res = await clientFetch<ResponseData<null>>('/blog/blog/votes', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  return res;
};
