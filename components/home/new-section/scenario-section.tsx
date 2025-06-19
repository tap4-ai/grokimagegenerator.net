import SubHeading from '@/components/internal-page/sub-heading';

import SectionWrapper from './section-wrapper';

export default function ScenarioSection({
  title,
  description,
  list,
}: {
  title: string;
  description: string;
  list: { id: string | number; title: string; description: string; imgSrc: string }[];
}) {
  return (
    <SectionWrapper>
      <SubHeading title={title} description={description} />
      <div className='grid w-full grid-cols-1 gap-10 lg:grid-cols-2'>
        {list.map((item) => (
          <div key={item.id} className='relative aspect-square w-full overflow-hidden rounded-lg'>
            <img src={item.imgSrc} alt={item.title} className='h-full w-full' loading='lazy' fetchPriority='low' />
            <div className='absolute bottom-0 left-0 flex h-[320px] w-full flex-col justify-center gap-3 bg-black/70 p-8 backdrop-blur-xl'>
              <h3 className='text-lg font-semibold'>{item.title}</h3>
              <div className='opacity-70'>{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
