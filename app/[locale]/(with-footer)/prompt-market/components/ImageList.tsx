import { ImageResponseVo } from '@/network/prompt-market/server';

import ImageMasonry from '@/components/image/ImageMasonry';
import BasePagination from '@/components/page/BasePagination';

export const PAGE_SIZE = 48;

export default function ImageList({
  dataList,
  total,
  currentPage,
}: {
  dataList: ImageResponseVo[];
  total: number;
  currentPage: number;
}) {
  return (
    <div className='w-full'>
      <ImageMasonry imageList={dataList} route='/flux-ai' className='px-3 py-5 lg:px-0' />
      <div className='my-3 flex justify-center'>
        <BasePagination
          className='justify-center'
          route='/prompt-market'
          subRoute='/page'
          searchParamsKeys={['prompt', 'style']}
          total={total}
          pageSize={PAGE_SIZE}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
