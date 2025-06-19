import { getTranslations } from 'next-intl/server';

import SubHeading from '@/components/internal-page/sub-heading';

import SectionWrapper from './section-wrapper';

async function AdvantageItem({ title, description, num }: { num: number; title: string; description: string }) {
  const t = await getTranslations('Common');
  return (
    <div className='w-full px-5 lg:h-[381px] lg:min-h-[381px]'>
      <div className='flex h-full w-full flex-col gap-2 border-b border-white/10'>
        <div className='w-fit rounded-lg border border-color-main px-8 py-3 text-color-main'>
          {t('advantage')}
          {num}
        </div>
        <h3 className='text-2xl font-semibold'>{title}</h3>
        <p className='text-sm text-color-70'>{description}</p>
      </div>
    </div>
  );
}

export default async function AdvantageSection({
  title,
  description,
  startImgSrc,
  endImgSrc,
  list,
}: {
  title: string;
  description: string;
  startImgSrc: string;
  endImgSrc: string;
  list: { id: string | number; title: string; description: string }[];
}) {
  return (
    <SectionWrapper innerClassName='bg-white/5 p-10 rounded-lg'>
      <SubHeading title={title} description={description} />
      <div className='flex w-full flex-col gap-10 lg:flex-row lg:gap-px'>
        <div className='flex-1 space-y-20'>
          <img
            src={startImgSrc}
            alt='start'
            className='w-full rounded-lg'
            loading='lazy'
            fetchPriority='low'
            decoding='async'
          />
          <AdvantageItem num={1} key={list[1].id} title={list[1].title} description={list[1].description} />
          <AdvantageItem num={3} key={list[3].id} title={list[3].title} description={list[3].description} />
        </div>
        <div className='flex-1 space-y-20'>
          <AdvantageItem num={2} key={list[0].id} title={list[0].title} description={list[0].description} />
          <AdvantageItem num={4} key={list[2].id} title={list[2].title} description={list[2].description} />
          <img
            src={endImgSrc}
            alt='end'
            className='w-full rounded-lg'
            loading='lazy'
            fetchPriority='low'
            decoding='async'
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
