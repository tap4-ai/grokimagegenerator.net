import { CircleArrowRight } from 'lucide-react';

import { Link } from '@/app/navigation';

export default function ToolsItem({
  title,
  content,
  href,
  imgUrl,
}: {
  title: string;
  content: string;
  href: string;
  imgUrl: string;
}) {
  return (
    <li className='group flex flex-col gap-3 rounded-lg bg-card-black p-3 lg:flex-row lg:justify-between lg:gap-[105px] lg:bg-[url("/home/tools/odd.png")] lg:bg-cover lg:p-8 lg:even:flex-row-reverse lg:even:bg-[url("/home/tools/even.png")]'>
      <div className='flex flex-1 flex-col gap-3 group-even:items-end lg:gap-0'>
        <div className='flex flex-col gap-3'>
          <h3 className='text-lg font-semibold lg:text-2xl'>{title}</h3>
          <p className='text-sm text-white/40 lg:text-base'>{content}</p>
        </div>
        <Link
          href={href}
          className='mt-auto flex h-10 w-full items-center justify-center gap-1 rounded-md bg-white px-3 text-black lg:w-fit'
        >
          Try Now <CircleArrowRight className='size-5' />
        </Link>
      </div>
      <img src={imgUrl} alt={title} className='h-[135px] w-full rounded-md bg-black lg:h-[365px] lg:w-[881px]' />
    </li>
  );
}
