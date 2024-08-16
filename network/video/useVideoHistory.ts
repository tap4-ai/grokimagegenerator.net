import useSWR from 'swr';

import { fetcher } from '../clientFetch';
import type { ResponseRows } from '../serverFetch';

export type VideoRequestType = {
  pageNum: number;
  pageSize: number;
};

export type VideoResponseType = {
  categoryName: string;
  createTime: number;
  errorInfo: null | string;
  id: string;
  imageEndUrl: null | string;
  imageUrl: null | string;
  prompt: string;
  /**
   * pending, processing, completed, fail,  当status不是completed和fail时，可使用traceId继续轮询结果
   */
  // status: string;
  status: 'pending' | 'processing' | 'completed' | 'fail';
  traceId: string;
  videoThumbnailUrl: string;
  videoUrl: string;
};

const useVideoHistory = (reqData: VideoRequestType) => {
  const { data, error, isLoading, mutate } = useSWR<ResponseRows<VideoResponseType[]>>(
    ['/video/history', reqData],
    fetcher,
  );

  return { data: data?.rows, error, isLoading, mutate, total: data?.total };
};

export default useVideoHistory;
