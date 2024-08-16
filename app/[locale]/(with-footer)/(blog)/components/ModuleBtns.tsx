// import Link from 'next/link';
import { BlogModuleDtoList } from '@/network/blog';

import { ALL_TAG } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Link } from '@/app/navigation';

function LinkTag({ className, title, href }: { className: string; title: string; href: string }) {
  return (
    <Link
      href={href}
      title={title}
      className={cn(
        'flex h-[34px] items-center justify-center text-nowrap rounded bg-[#2C2D36] px-5 py-2.5 text-sm capitalize text-white/40 last:mr-auto hover:text-white lg:h-9',
        className,
      )}
    >
      {title}
    </Link>
  );
}

export default function ModuleBtns({ list, activeName }: { list: BlogModuleDtoList[]; activeName: string }) {
  return (
    <div className='flex w-full items-center gap-5 overflow-x-auto'>
      <LinkTag
        href='/blog'
        title={ALL_TAG}
        className={cn('ml-auto', activeName === '/' && 'border border-white text-white')}
      />
      {list.map((item) => (
        <LinkTag
          key={item.id}
          href={`/category/${item.nameId}`}
          title={item.name}
          className={cn(activeName === item.nameId && 'border border-white text-white')}
        />
      ))}
    </div>
  );
}
