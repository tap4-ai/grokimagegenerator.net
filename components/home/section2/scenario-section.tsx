import { cn } from '@/lib/utils';
import SubHeading from '@/components/internal-page/sub-heading';
import InViewPlayVideo from '@/components/video/InViewPlayVideo';

import SectionWrapper from '../section-wrapper';

export default function ScenarioSection({
  title,
  description,
  list,
}: {
  title: string;
  description: string;
  list: { id: string | number; title: string; description: string; imgSrc?: string; videoSrc?: string }[];
}) {
  return (
    <SectionWrapper>
      <SubHeading title={title} description={description} />
      <div className='grid w-full grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-10'>
        {list.map((item) => (
          <div
            key={item.id}
            className={cn('flex flex-col overflow-hidden rounded-t-xl', !item.imgSrc && 'rounded-b-xl')}
          >
            <div className='flex-1 bg-card-black p-8'>
              <h3 className='text-2xl font-semibold'>{item.title}</h3>
              <div className='text-sm opacity-70'>{item.description}</div>
            </div>
            {!!item.videoSrc && (
              <InViewPlayVideo
                src={item.videoSrc}
                preload='none'
                poster={item.imgSrc}
                className='w-full rounded-b-xl'
              />
            )}
            {!item.videoSrc && !!item.imgSrc && (
              <img
                src={item.imgSrc}
                alt={item.title}
                className='w-full rounded-b-xl'
                loading='lazy'
                decoding='async'
                fetchPriority='low'
              />
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
