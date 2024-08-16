import { getBlogModulesAndList } from '@/network/blog';

import { PAGE_SIZE } from '@/lib/constants';

import ModuleBtns from './ModuleBtns';

export default async function ModulesButtons({ activeName }: { activeName: string }) {
  const resData = await getBlogModulesAndList({ pageNum: 1, pageSize: PAGE_SIZE });

  return <ModuleBtns list={resData?.rows.blogModuleDtoList || []} activeName={activeName} />;
}
