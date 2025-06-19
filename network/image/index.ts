import serverFetch from '../serverFetch';
import { ResponseData } from '../type';

export type RecommendBlogList = {
  coverUrl: string;
  description: string;
  digest: string;
  id: string;
  nameId: string;
  title: string;
};

/**
 * ImageDetailResponseV2Vo, 图片详情返回，支持推荐图片
 */
export type ImageDetailResponseV2Vo = {
  categoryId: number;
  costCredits: number;
  createTime: number;
  credits: number;
  guidanceScale?: number | null;
  id: string;
  mimeType: string;
  modelId: string;
  modelName: string;
  negativePrompt: string;
  nickName: string;
  outputPrompt: string;
  platformName: string;
  platformType: number;
  prompt: string;
  resolution: string;
  roleType: number;
  seed?: number | null;
  showTag: number;
  size: number;
  steps?: number | null;
  tags: string;
  thumbnailUrl: string;
  title: string;
  url: string;
  hfLora?: string;
  recommendBlogList?: RecommendBlogList[];
};

export async function gatImageDetail(id: string) {
  const res = await serverFetch<ResponseData<ImageDetailResponseV2Vo>>({
    endpoint: `/image/${id}`,
  });
  return res;
}
