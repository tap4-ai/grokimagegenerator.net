import { getExploreImages } from '@/network/prompt-market/server';
import { CircleArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import ImageMasonry from '@/components/image/ImageMasonry';
import { Link } from '@/app/navigation';

export default async function DiscoverList({
  pageSize = 15,
  categoryId,
  discoverMoreHref = '/prompt-market',
}: {
  pageSize?: number;
  categoryId: string;
  discoverMoreHref?: string;
}) {
  const t = await getTranslations('flux-ai.discover');
  const res = await getExploreImages({ pageNum: 1, pageSize, categoryId, isFeatured: 0 });

  return (
    <div className='flex flex-col items-center gap-3 lg:gap-5'>
      <div className='font-bold lg:text-2xl'>{t('title')}</div>
      <ImageMasonry
        imageList={res.rows?.imageList}
        config={{
          columns: [2, 5],
          gap: [12, 20],
          media: [768, 1322],
        }}
        route='/flux-ai'
      />
      <Link
        href={discoverMoreHref}
        className='flex h-10 w-fit items-center justify-center gap-1 rounded-md bg-white px-5 capitalize text-black'
      >
        {t('more')}
        <CircleArrowRight className='size-4' />
      </Link>
    </div>
  );
}
