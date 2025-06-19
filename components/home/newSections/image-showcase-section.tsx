import { cn } from '@/lib/utils';

import SubHeading from '../../internal-page/sub-heading';
import SectionWrapper from '../section-wrapper';

function Showcase({ title, dataList }: { title: string; dataList: { id: string; imgSrc: string; imgAlt: string }[] }) {
  const imgCount = dataList.length;

  return (
    <div className='flex w-full flex-col gap-5 rounded-xl border border-main-gray bg-card-black p-5 lg:p-8'>
      <h3 className='text-2xl font-semibold opacity-70'>{title}</h3>
      <div
        className={cn(
          'grid grid-cols-1 gap-5',
          imgCount === 1 && 'lg:grid-cols-1',
          imgCount === 2 && 'lg:grid-cols-2',
          imgCount === 3 && 'lg:grid-cols-3',
        )}
      >
        {dataList.map((el) => (
          <div key={el.id} className='flex flex-col gap-5' title={el.imgAlt}>
            <img src={el.imgSrc} alt={el.imgAlt} className='h-auto w-full rounded-lg' />
            <p className='truncate opacity-70'>{el.imgAlt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ImageShowcaseSection({
  title,
  description,
  dataList,
}: {
  title: string;
  description: string;
  dataList: {
    title: string;
    imgList: { id: string; imgSrc: string; imgAlt: string }[];
  }[];
}) {
  return (
    <SectionWrapper>
      <SubHeading title={title} description={description} />
      {dataList.map((el) => (
        <Showcase key={el.title} title={el.title} dataList={el.imgList} />
      ))}
    </SectionWrapper>
  );
}
