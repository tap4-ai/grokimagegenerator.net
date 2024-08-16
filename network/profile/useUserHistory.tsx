import useSWR from 'swr';

import { fetcher } from '../clientFetch';
import { ImageResponseVo } from '../image';
import { ResponseRows } from '../serverFetch';

const useUserHistory = (pageNum: number, pageSize: number) => {
  const { data, error, isLoading, isValidating } = useSWR<ResponseRows<ImageResponseVo[]>>(
    ['/anime/myList', { pageNum, pageSize }],
    fetcher,
  );

  return { data: data?.rows, total: data?.total, error, isLoading, isValidating };
};

export default useUserHistory;
