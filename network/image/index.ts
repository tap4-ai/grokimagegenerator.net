import serverFetch, { ResponseData } from '../serverFetch';

/**
 * ImageDetailResponseV2Vo, 图片详情返回，支持推荐图片
 */
export type ImageDetailResponseV2Vo = {
  detail: ImageResponseVo;
  /**
   * 图片列表
   */
  imageList: ImageResponseVo[];
};

/**
 * ImageResponseVo
 */
export type ImageResponseVo = {
  /**
   * the category id of the image
   */
  categoryId: number;
  /**
   * the category name of the image
   */
  categoryName: string;
  /**
   * the cost of the image
   */
  costCredits: number;
  /**
   * 创建者
   */
  createBy: number;
  /**
   * the createTime of the image
   */
  createTime: Date;
  /**
   * the id of the image
   */
  id: number;
  /**
   * the mimeType of the image
   */
  mimeType: string;
  /**
   * the model id of the platform
   */
  modelId: number;
  /**
   * the modelName of the image
   */
  modelName: string;
  /**
   * the negativePrompt of the image
   */
  negativePrompt: string;
  /**
   * the nickName of the image created user
   */
  nickName: string;
  /**
   * 请求参数
   */
  params: { [key: string]: { [key: string]: any } };
  /**
   * the ai platform name
   */
  platformName: string;
  /**
   * the ai platform type
   */
  platformType: number;
  /**
   * the prompt of the image
   */
  prompt: string;
  /**
   * the resolution of the image
   */
  resolution: string;
  /**
   * the size of the image
   */
  size: number;
  /**
   * the tags of the image
   */
  tags: string;
  /**
   * the thumbnailUrl of the image
   */
  thumbnailUrl: string;
  /**
   * the title of the image
   */
  title: string;
  /**
   * 更新者
   */
  updateBy: number;
  /**
   * 更新时间
   */
  updateTime: Date;
  /**
   * the url of the image
   */
  url: string;
  outputPrompt: string;
};

export async function gatImageDetail(id: string, recommends: number = 5) {
  const res = await serverFetch<ResponseData<ImageDetailResponseV2Vo>>({
    endpoint: '/anime/detail',
    data: { id, num: recommends },
  });
  return res;
}
