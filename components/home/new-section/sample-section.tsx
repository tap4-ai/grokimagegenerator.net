import CopyBtn from '@/components/CopyBtn';
import SubHeading from '@/components/internal-page/sub-heading';

import SectionWrapper from './section-wrapper';

export default function SampleSection({
  title,
  description,
  list,
}: {
  title: string;
  description: string;
  list: { id: string; description: string; imgSrc: string }[];
}) {
  return (
    <SectionWrapper>
      <SubHeading title={title} description={description} />
      <div className='grid grid-cols-1 gap-5 lg:grid-cols-4'>
        {list.map((item) => (
          <div key={item.id} className='space-y-3'>
            <img
              src={item.imgSrc}
              alt={item.description}
              className='w-full rounded-lg'
              loading='lazy'
              fetchPriority='low'
              decoding='async'
            />
            <div className='flex items-center gap-2.5 rounded-lg bg-color-5 px-3 py-2'>
              <CopyBtn content={item.description} className='shrink-0 opacity-70' />
              <p className='line-clamp-2 text-sm'>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
