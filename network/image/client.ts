import { removeEmptyProperties } from '@/lib/utils/objectUtils';
import { objToQueryStr } from '@/lib/utils/stringUtils';

import { baseRequestData, clientFetch } from '../clientFetch';
import { ResponseData } from '../serverFetch';

// 定义请求参数的接口
export interface VideoRequest {
  imageEndId?: string;
  imageEndUrl?: string;
  imageId?: string;
  imageUrl?: string;
  model: string; // proxy_luma_free_video & proxy_luma_vip_video
  prompt: string;
  // site: string;
}

export async function createVideoTraceId(data: VideoRequest) {
  const res = await clientFetch<ResponseData<{ traceId: string }>>('/video/genVideo', {
    method: 'POST',
    body: JSON.stringify(removeEmptyProperties(data)),
  });
  return res;
}

export type PollVideoResponse = {
  status: string;
  videoThumbnailUrl?: null | string;
  videoUrl: string;
};

export async function pollVideo(traceId: string) {
  const url = objToQueryStr('/video/result', { ...baseRequestData, traceId });
  const res = await clientFetch<ResponseData<PollVideoResponse>>(url, {
    method: 'GET',
  });
  return res;
}

export async function optimizePromptApi(prompt: string) {
  const res = await clientFetch<ResponseData<{ newPrompt: string }>>('/video/newPrompt', {
    method: 'POST',
    body: JSON.stringify({ prompt }),
  });
  return res;
}
