import Heading from '@/components/internal-page/heading';

import { RenderCoreIcon } from '../icon';
import SectionWrapper from './section-wrapper';

export default function CoreFeatureSectionWithIcon({
  title,
  description,
  list,
}: {
  title: string;
  description: string;
  list: {
    id: string;
    title: string;
    description: string;
  }[];
}) {
  return (
    <SectionWrapper>
      <Heading title={title} description={description} />
      <div className='flex w-full flex-col flex-wrap items-stretch justify-center gap-5 lg:flex-row'>
        {list.map((item, idx) => (
          <div
            key={item.id}
            className='flex min-h-[230px] flex-col items-center gap-2 rounded-lg border-b-2 border-color-main bg-color-5 p-8 text-center lg:w-[410px]'
          >
            <div className='shrink-0 text-color-main'>{RenderCoreIcon(String(idx + 1))}</div>
            <h3 className='text-lg'>{item.title}</h3>
            <p className='text-sm opacity-70'>{item.description}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
