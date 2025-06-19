import SubHeading from '@/components/internal-page/sub-heading';

import LinkBtn from './link-btn';
import SectionWrapper from './section-wrapper';

export default function CoreFeatureSection({
  title,
  description,
  href,
  hrefTitle,
  list,
}: {
  title: string;
  description: string;
  href?: string;
  hrefTitle?: string;
  list: { id: string; title: string; description: string; imgSrc: string }[];
}) {
  return (
    <SectionWrapper>
      <SubHeading title={title} description={description} />
      <div className='grid w-full grid-cols-1 gap-10 lg:grid-cols-3'>
        {list.map((item) => (
          <div key={item.id} className='flex flex-col gap-3'>
            <img
              src={item.imgSrc}
              alt={item.title}
              className='w-full rounded-lg'
              fetchPriority='low'
              loading='lazy'
              decoding='async'
            />
            <div className='flex flex-col gap-2'>
              <h3 className='text-lg'>{item.title}</h3>
              <p className='text-sm text-color-70'>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      {href && hrefTitle && <LinkBtn href={href}>{hrefTitle}</LinkBtn>}
    </SectionWrapper>
  );
}
