import type { ResponseData, ResponseRows, SignedUrlType } from '@/network/type';

import { removeEmptyProperties } from '@/lib/utils/objectUtils';
import { objToQueryStr } from '@/lib/utils/stringUtils';

import { baseRequestData, clientFetch } from '../clientFetch';

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

export async function deleteImageById(imageId: string) {
  const url = objToQueryStr('/image/delete', { ...baseRequestData, imageId });
  const res = await clientFetch<ResponseData<null>>(url, {
    method: 'DELETE',
    // body: JSON.stringify({ imageId }),
  });
  return res;
}

export async function createSignedUrl(mineType: string[]) {
  const res = await clientFetch<ResponseRows<SignedUrlType[]>>('/image/presignedUrl', {
    method: 'POST',
    body: JSON.stringify({ mineType }),
  });
  return res;
}

export async function removeImageBackground({ imageUrl }: { imageUrl: string }) {
  const res = await clientFetch<ResponseData<{ resultImageUrl: string }>>('/image/removeBackground', {
    method: 'POST',
    body: JSON.stringify({ imageUrl }),
  });
  return res;
}

export type Message = {
  id: string;
  content?: string;
  role: 'user' | 'assistant';
  imgSrc?: string;
  originalImgList?: string[];
  // custom
  isReferImage?: boolean;
};

export type OnMessageSubmit = ({
  prompt,
  multiImages,
  model,
  ratio,
}: {
  prompt: string;
  multiImages?: File[];
  model?: string;
  ratio?: string;
}) => Promise<void>;

export type ChatStatus = 'submitted' | 'streaming' | 'ready' | 'error';

export type OnReferImage = (message: Message) => void;
