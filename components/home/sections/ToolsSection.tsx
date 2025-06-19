import Image from 'next/image';

import LinkBtn from '../new-section/link-btn';

export default function ToolsSection({
  title,
  description,
  rows,
}: {
  title: string;
  description: string;
  rows: {
    title: string;
    description: string;
    tags: string[];
    href: string;
    hrefTitle: string;
    src: string;
    alt: string;
  }[];
}) {
  return (
    <div className='mx-auto max-w-pc px-3 lg:px-0'>
      <h2 className='text-center text-[32px] font-semibold capitalize leading-[36px] tracking-[0.06em] text-white lg:text-[48px] lg:leading-[54px] lg:tracking-[0.02em]'>
        {title}
      </h2>
      <p className='mt-1 text-center text-base font-normal capitalize leading-6 tracking-[0.04em] text-[#b8b8b8] lg:text-center lg:text-base lg:capitalize lg:leading-6 lg:tracking-[0.04em]'>
        {description}
      </p>
      <div className='mt-6 flex flex-col gap-y-4 lg:gap-y-[48px]'>
        {rows.map(({ title: childTitle, description: childDescription, tags, href, hrefTitle, src, alt }, index) => (
          <div key={index} className='flex flex-1 flex-col items-stretch justify-between gap-x-8 gap-y-3 lg:flex-row'>
            <div className='flex flex-1 flex-col'>
              <h3 className='mb-3 text-[24px] font-semibold capitalize leading-[100%] tracking-[0.02em] text-white lg:text-[32px] lg:leading-[48px]'>
                {childTitle}
              </h3>
              <p className='text-base font-normal capitalize leading-6 tracking-[0.04em] text-[#b8b8b8] lg:text-base lg:capitalize lg:leading-6 lg:tracking-[0.04em]'>
                {childDescription}
              </p>
              <div className='mb-4 mt-2 flex flex-wrap gap-x-2 gap-y-1.5'>
                {tags.map((tag) => (
                  <span
                    className='inline-block rounded-[4px] border border-white/40 p-[4px_8px] text-center text-[14px] font-normal capitalize leading-[21px] tracking-[0.02em] text-white/40'
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <LinkBtn className='mt-auto w-fit self-center lg:self-start' href={href}>
                {hrefTitle}
              </LinkBtn>
            </div>
            <Image
              loading='lazy'
              priority={false}
              src={src}
              alt={alt}
              width={686}
              height={282}
              className='h-auto flex-1 rounded-[12px] bg-[#212D2F]'
            />
          </div>
        ))}
      </div>
    </div>
  );
}
