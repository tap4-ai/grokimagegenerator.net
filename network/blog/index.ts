import serverFetch, { ResponseData, ResponseRows } from '../serverFetch';

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
