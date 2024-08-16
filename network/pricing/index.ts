import { clientFetch } from '../clientFetch';
import { ResponseData } from '../serverFetch';

// 定义请求参数的接口
export interface OrderRequest {
  memberCardId: string;
  successUrl: string;
  cancelUrl: string;
}

export async function getPriceOrder(orderData: OrderRequest) {
  const res = await clientFetch<ResponseData<string>>('/draw/memberCardOrder', {
    method: 'POST',
    body: JSON.stringify(orderData),
  });
  return res;
}
