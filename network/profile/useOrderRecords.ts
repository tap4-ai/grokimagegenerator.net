import useSWR from 'swr';

import { fetcher } from '../clientFetch';
import type { ResponseRows } from '../type';

export type OrderRequest = {
  pageNum: number;
  pageSize: number;
  /**
   * 默认最晚，最晚为false，最早为true
   */
  earliest?: boolean;
  search?: string;
  isNeedStatus?: boolean;
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
   * 0, 待支付
   * 1, 支付成功
   * 2, 支付失败
   * 3, 支付过期
   * 4, 取消订单
   * 5, 已退款
   * 6, 订阅成功后，取消订阅
   */
  status: number;
  /**
   * 支付时间
   */
  time: number;
  transactionNo: string;
  paymentSource: 'app' | 'web';
  memberCardType: 'free' | 'monthly' | 'yearly' | 'one-time';
};

const useOrderRecords = (request: OrderRequest) => {
  const { data, error, isLoading, mutate } = useSWR<ResponseRows<OrderRow[]>>(
    ['/draw/memberCardOrder/mylist', request],
    fetcher,
  );

  return { data: data?.rows, error, isLoading, mutate, total: data?.total };
};

export default useOrderRecords;
