import useSWR from 'swr';

import { fetcher } from '../clientFetch';
import type { ResponseRows } from '../serverFetch';

export type OrderRequest = {
  pageNum: number;
  pageSize: number;
  /**
   * 默认最晚，最晚为false，最早为true
   */
  earliest?: boolean;
  search?: string;
};

export type OrderRow = {
  /**
   * 金额
   */
  amount: number;
  /**
   * token数
   */
  credits: number;
  expireTime: number;
  /**
   * 订单ID
   */
  id: string;
  memberCardId: string;
  /**
   * 支付时间
   */
  time: number;
};

const useOrderRecords = ({ pageNum, pageSize, earliest, search }: OrderRequest) => {
  const { data, error, isLoading, mutate } = useSWR<ResponseRows<OrderRow[]>>(
    ['/draw/memberCardOrder/mylist', { pageNum, pageSize, earliest, search }],
    fetcher,
  );

  return { data: data?.rows, error, isLoading, mutate, total: data?.total };
};

export default useOrderRecords;
