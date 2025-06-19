import { getBlogRecommend } from '@/network/blog';

import { LinkItem } from './newSections/RecommendSection';
import SectionWrapper from './section-wrapper';

export default async function BlogRecommend({
  title,
  path,
  pageNum = 1,
  pageSize = 12,
}: {
  title: string;
  path: string;
  pageNum?: number;
  pageSize?: number;
}) {
  const { rows } = await getBlogRecommend({ path, pageNum, pageSize });

  return (
    <SectionWrapper>
      <h2 className='text-2xl font-semibold lg:text-3xl'>{title}</h2>
      <div className='grid grid-cols-1 gap-3 lg:w-auto  lg:grid-cols-2 lg:flex-row'>
        {rows &&
          rows.length > 0 &&
          rows.map((el) => (
            <LinkItem
              key={el.id}
              href={`/blog/detail/${el.nameId}`}
              title={el.title}
              content={el.digest}
              tagsList={el.tags || []}
            />
          ))}
      </div>
    </SectionWrapper>
  );
}
