import Image from 'next/image';

import SubHeading from '@/components/internal-page/sub-heading';
import InViewPlayVideo from '@/components/video/InViewPlayVideo';

import LinkBtn from '../new-section/link-btn';

export default async function AdvantageSection({
  title,
  description,
  href,
  hrefTitle,
  imgSrc,
  videoSrc,
  list,
}: {
  title: string;
  description: string;
  href: string;
  hrefTitle: string;
  imgSrc: string;
  videoSrc?: string;
  list: { id: string | number; title: string; description: string }[];
}) {
  return (
    <div className='container-centered container-py flex flex-col gap-10 lg:flex-row'>
      <div className='flex w-full flex-col justify-between gap-10 self-stretch lg:w-[488px]'>
        <div className='flex flex-col gap-5'>
          <SubHeading title={title} description={description} className='max-w-[484px] gap-5 text-left' />
          <LinkBtn href={href} className='w-fit'>
            {hrefTitle}
          </LinkBtn>
        </div>
        {videoSrc ? (
          <InViewPlayVideo src={videoSrc} poster={imgSrc} preload='none' className='w-full rounded-xl' />
        ) : (
          <Image
            src={imgSrc}
            alt={title}
            width={488}
            height={542}
            className='h-auto w-full rounded-xl'
            loading='lazy'
            decoding='async'
            fetchPriority='low'
          />
        )}
      </div>
      <ul className='max-w-heading flex flex-1 flex-col gap-10'>
        {list.map((item) => (
          <li key={item.id} className='relative flex h-[210px] shrink-0 flex-col gap-5 pl-5'>
            <div className='absolute left-0 h-full w-px bg-linear-to-t from-transparent to-gray-400' />
            <div className='border-color-main bg-color-main size-4 rounded-full border' />
            <p className='font-bold'>{item.title}</p>
            <p className='opacity-70'>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
