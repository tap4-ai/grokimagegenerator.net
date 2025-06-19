import { ResponseData } from '@/network/type';

import { clientFetch } from '../clientFetch';

export const getImage = async (key: string) => {
  const result = await clientFetch<ResponseData<AsyncGenerationImageResult>>(`/image/getResult/free/${key}`);
  return result;
};

/**
 * AsyncGenerationImageResult, 异步生图返参
 */
export interface AsyncGenerationImageResult {
  imageResponseVo?: ImageResponseVo;
  /**
   * key
   */
  key?: string;
  /**
   * 失败原因
   */
  message?: string;
  /**
   * 请求的状态 等待：await 失败：failed 成功：success
   */
  status: 'await' | 'failed' | 'success';
}

/**
 * ImageResponseVo
 */
export interface ImageResponseVo {
  /**
   * the category id of the image
   */
  categoryId?: number;
  /**
   * the category name of the image
   */
  categoryName?: string;
  /**
   * the cost of the image
   */
  costCredits?: number;
  /**
   * 创建者
   */
  createBy?: number;
  /**
   * the createTime of the image
   */
  createTime?: Date;
  /**
   * the id of the image
   */
  id?: number;
  /**
   * the mimeType of the image
   */
  mimeType?: string;
  /**
   * the model id of the platform
   */
  modelId?: number;
  /**
   * the modelName of the image
   */
  modelName?: string;
  /**
   * the negativePrompt of the image
   */
  negativePrompt?: string;
  /**
   * the nickName of the image created user
   */
  nickName?: string;
  /**
   * 请求参数
   */
  params?: { [key: string]: { [key: string]: any } };
  /**
   * the ai platform name
   */
  platformName?: string;
  /**
   * the ai platform type
   */
  platformType?: number;
  /**
   * the prompt of the image
   */
  prompt?: string;
  /**
   * the resolution of the image
   */
  resolution?: string;
  /**
   * the roleType of the image
   */
  roleType?: number;
  /**
   * 图片展示类型，0:不限制，1：付费用户去蒙层
   */
  showTag?: number;
  /**
   * the size of the image
   */
  size?: number;
  /**
   * the tags of the image
   */
  tags?: string;
  /**
   * the thumbnailUrl of the image
   */
  thumbnailUrl?: string;
  /**
   * the title of the image
   */
  title?: string;
  /**
   * 更新者
   */
  updateBy?: number;
  /**
   * 更新时间
   */
  updateTime?: Date;
  /**
   * the url of the image
   */
  url?: string;
}
