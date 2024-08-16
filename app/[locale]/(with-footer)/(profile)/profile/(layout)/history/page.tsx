'use client';

import { useState } from 'react';
import useUserHistory from '@/network/profile/useUserHistory';

import ImageMasonry from '@/components/image/ImageMasonry';
import StatePagination from '@/components/page/StatePagination';

import ImageLoading from '../../../components/ImageLoading';

const PageSize = 42;

export default function Page() {
  const [pageNum, setPageNum] = useState(1);
  const { total, data, isLoading } = useUserHistory(pageNum, PageSize);

  if (isLoading) {
    return <ImageLoading />;
  }

  if (!data || data?.length === 0) {
    return <div>no data</div>;
  }

  return (
    <div className='flex h-full flex-col items-center justify-between gap-3'>
      <ImageMasonry imageList={data || []} route='/flux-ai' className='grid grid-cols-2 lg:grid-cols-6' />
      {!!total && total > 0 && (
        <StatePagination
          currentPage={pageNum}
          pageSize={PageSize}
          onChange={setPageNum}
          total={total}
          className='mt-2 justify-center'
        />
      )}
    </div>
  );
}
