import serverFetch, { ResponseRows } from '../serverFetch';

export type MyRequest = {
  /**
   * category id
   */
  categoryId?: string;
  /**
   * categoryName
   */
  categoryName?: string;
  /**
   * 指定国家，使用缩写，例如: CN
   */
  countryCode?: string;
  /**
   * 排序的方向desc或者asc
   */
  isAsc?: string;
  /**
   * 是否精选（1为精选，0为非精选）
   */
  isFeatured?: number;
  /**
   * 模型名
   */
  model?: string;
  /**
   * 排序列
   */
  orderByColumn?: string;
  /**
   * 当前页数
   */
  pageNum?: number;
  /**
   * 分页大小
   */
  pageSize?: number;
  /**
   * ai platform type
   */
  platformType?: number;
  /**
   * prompt key word of the image list
   */
  prompt?: string;
  /**
   * 站点，具体和后台确认site id信息
   */
  site?: string;
  /**
   * tags, es: #animcal#art
   */
  tags?: string;
  /**
   * 0:anime, 1:realistic, empty: all
   */
  roleType?: number;
};

/**
 * ImageListResponseV2Vo, 图片列表返回，支持分类
 */
export type ImageListResponseV2Vo = {
  /**
   * 分类
   */
  categoryList: DrawImageCategoryVo[];
  /**
   * 图片列表
   */
  imageList: ImageResponseVo[];
};

/**
 * DrawImageCategoryVo
 */
export type DrawImageCategoryVo = {
  /**
   * 分类ID
   */
  id: number;
  /**
   * 分类名
   */
  name: string;
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
  /**
   * 0:anime, 1:realistic, empty: all
   */
  roleType?: number;
};

export async function getExploreImages(reqData: MyRequest) {
  const res = await serverFetch<ResponseRows<ImageListResponseV2Vo>>({
    endpoint: '/anime/list',
    data: reqData,
  });
  return res;
}
