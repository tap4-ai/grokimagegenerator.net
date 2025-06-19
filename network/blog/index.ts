import serverFetch from '../serverFetch';
import { ResponseData, ResponseRows } from '../type';

export type Input = {
  // moduleId?: string;
  pageNum: number;
  pageSize: number;
  moduleNameId?: string;
  userType?: 1;
};

export type Rows = {
  blogDtoList: BlogDtoList[];
  blogModuleDtoList: BlogModuleDtoList[];
};

export type BlogDtoList = {
  appVn: string;
  /**
   * 作者
   */
  author: string;
  /**
   * 内容
   */
  content: string;
  coverOssId: string;
  /**
   * 封面
   */
  coverUrl: string;
  createTime: number;
  dbrand: string;
  description: string;
  /**
   * detail,markdown
   */
  detail: string;
  /**
   * 摘要
   */
  digest: string;
  dmodel: string;
  /**
   * 点踩数
   */
  down: string;
  /**
   * blogID
   */
  id: string;
  /**
   * 模块ID
   */
  moduleId: string;
  nameId: string;
  osType: number;
  osVn: string;
  /**
   * 阅读数
   */
  readingNum: string;
  /**
   * 站点
   */
  site: string;
  /**
   * 标题
   */
  title: string;
  /**
   * 点赞数
   */
  up: number;
  updateTime: number;
  /**
   * 0:web 1:app 2: api
   */
  userType: number;
};

export type RecommendBlogList = {
  /**
   * 封面url
   */
  coverUrl: string;
  /**
   * 描述
   */
  description: string;
  /**
   * 摘要
   */
  digest: string;
  id: string;
  nameId: string;
  /**
   * 标题
   */
  title: string;
  createTime: number;
  updateTime: number;
  up: number;
};

export type BlogModuleDtoList = {
  id: string;
  name: string;
  nameId: string;
  site: string;
};

export type BlogDto = {
  appVn: null;
  content?: string;
  coverOssId: string;
  coverUrl: string;
  dbrand: null;
  description: string;
  detail: string;
  digest: string;
  dmodel: null;
  id: string;
  moduleId: string;
  nameId: string;
  osType: null;
  osVn: null;
  readingNum: number;
  site: string;
  title: string;
  userType: null;
  author: string;
  createTime: number;
  updateTime: number;
  up: number;
  recommendBlogList: RecommendBlogList[] | null;
};

export const getBlogModulesAndList = async (data: Input) => {
  const result = await serverFetch<ResponseData<ResponseRows<Rows>>>({
    endpoint: '/blog/blog/blog_and_moduleV2',
    data,
  });
  return result.data;
};

export const getBlogById = async (nameId: string) => {
  const result = await serverFetch<ResponseData<BlogDto>>({
    endpoint: '/blog/blog',
    data: { nameId },
  });

  return result.data;
};

export type BlogRecommendRow = {
  coverUrl: string;
  createTime: number;
  description: string;
  digest: string;
  down: number;
  id: string;
  nameId: string;
  tags: string[] | null;
  title: string;
  up: number;
  updateTime: number;
};

export const getBlogRecommend = async (req: { path: string; pageNum: number; pageSize: number }) => {
  const result = await serverFetch<ResponseRows<BlogRecommendRow[]>>({
    endpoint: '/blog/blog/blogRecommend',
    data: req,
    options: {
      needCookie: false,
    },
  });

  return result;
};
