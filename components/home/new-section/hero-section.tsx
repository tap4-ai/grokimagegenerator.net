import Image from 'next/image';
import { Link } from '@/i18n/navigation';

import { cn } from '@/lib/utils';

import TagBadge from './tag-badge';

export default async function HeroSection({
  title,
  description,
  href,
  hrefTitle,
  imgSrc,
  href2,
  hrefTitle2,
  tags,
  className,
}: {
  title: string;
  description: string;
  href: string;
  hrefTitle: string;
  href2: string;
  hrefTitle2: string;
  imgSrc?: string;
  tags: Array<{ variant: 'orange' | 'green' | 'blue' | 'purple'; text: string }>;
  className?: string;
}) {
  return (
    <div className={cn('container-centered py-[50px] lg:py-[100px]', className)}>
      <div className='flex flex-col gap-4 lg:gap-6'>
        {/* Logo and Title Section */}
        <div className='relative w-full'>
          <div className='relative flex w-full flex-col items-center justify-center gap-3 p-0 lg:flex-row'>
            <Image
              src='/images/logo.svg'
              alt='logo'
              width={60}
              height={60}
              className='hidden size-[90px] shrink-0 lg:block'
            />
            <h1 className='text-center text-[32px] leading-tight font-semibold tracking-[1.5px] text-[#1677ff] capitalize sm:text-[32px] lg:text-[72px] lg:leading-[85px] lg:tracking-[2.88px]'>
              {title}
            </h1>
          </div>
        </div>

        {/* Description */}
        <div className='w-full px-4 text-center text-[16px] leading-[24px] font-normal text-[#ffffff] capitalize'>
          {description}
        </div>

        {/* Tags Section */}
        <div className='relative flex w-full justify-center'>
          <div className='relative flex max-w-full flex-row flex-wrap items-center justify-center gap-2 p-0 lg:gap-3'>
            {tags.map((tag, index) => (
              <TagBadge key={index} variant={tag.variant}>
                {tag.text}
              </TagBadge>
            ))}
          </div>
        </div>

        {/* Buttons Section */}
        <div className='relative flex w-full justify-center'>
          <div className='relative flex flex-col items-center justify-center gap-3 p-0 sm:flex-row'>
            <Link
              href={href || '#'}
              rel={typeof href === 'string' && href.indexOf('http') === 0 ? 'nofollow' : undefined}
              className='w-full rounded-lg border-[#1677ff] bg-[#1677ff] px-6 py-2.5 text-[14px] leading-[21px] font-semibold whitespace-nowrap text-white capitalize backdrop-blur backdrop-filter transition-colors hover:bg-[#1677ff]/90 sm:w-auto sm:px-8 sm:py-3 sm:text-[16px] sm:leading-[24px]'
            >
              {hrefTitle}
            </Link>
            <Link
              href={href2 || '#'}
              rel={typeof href2 === 'string' && href2.indexOf('http') === 0 ? 'nofollow' : undefined}
              className='w-full rounded-lg border-[#1677ff] bg-[#1677ff] px-6 py-2.5 text-[14px] leading-[21px] font-semibold whitespace-nowrap text-white capitalize backdrop-blur backdrop-filter transition-colors hover:bg-[#1677ff]/90 sm:w-auto sm:px-8 sm:py-3 sm:text-[16px] sm:leading-[24px]'
            >
              {hrefTitle2}
            </Link>
          </div>
        </div>
      </div>

      {imgSrc && (
        <div className='relative mt-8 h-[143px] w-full overflow-clip rounded-[12px] bg-[#cacaca] sm:h-[250px] lg:mt-12 lg:h-[460px]'>
          <Image priority src={imgSrc} alt={title} className='object-cover' fill />
        </div>
      )}
    </div>
  );
}
