'use client';

import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

export default function NavPopover({
  label,
  isHighLight = false,
  navDataList,
  className,
  columnNumber = 2,
  align = 'start',
}: {
  label: string;
  isHighLight?: boolean;
  navDataList: { code: string; href: string; label: string; content: string }[];
  className?: string;
  columnNumber?: number;
  align?: React.ComponentProps<typeof PopoverContent>['align'];
}) {
  const [openToolsNav, setOpenToolsNav] = useState(false);

  return (
    <Popover open={openToolsNav} onOpenChange={setOpenToolsNav}>
      <PopoverTrigger asChild>
        <button
          type='button'
          className={cn(
            'flex h-10 min-h-10 items-center gap-1 rounded-lg px-3 font-semibold text-white/70 hover:bg-white/15',
            isHighLight ? 'bg-white/15 text-color-main' : 'text-white/70',
            className,
          )}
        >
          <span className='text-base font-semibold'>
            {label}
          </span>
          <ChevronDown
            className={cn(
              'size-5 rotate-0 text-white/40 transition-transform duration-150',
              openToolsNav && '-rotate-180',
            )}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align={align}
        className={cn(
          'z-50 flex flex-col gap-3 rounded-lg border-none bg-white/70 p-5 text-center text-base leading-4 font-normal shadow-lg backdrop-blur-lg text-black',
          columnNumber === 2 && 'w-[750px]',
          columnNumber === 3 && 'w-[1123px]',
          columnNumber === 4 && 'w-[1234px]',
        )}
      >
        <ul
          className={cn(
            'grid gap-5',
            columnNumber === 2 && 'grid-cols-2',
            columnNumber === 3 && 'grid-cols-3',
            columnNumber === 4 && 'grid-cols-4',
          )}
        >
          {navDataList.map((child) => (
            <li key={child.href}>
              <Link
                key={child.code}
                href={child.href as string}
                onClick={() => setOpenToolsNav(false)}
                className={cn(
                  'relative flex h-[60px] w-full items-center gap-3 rounded-lg p-2 hover:bg-white/15',
                  columnNumber === 3 && 'h-[82px]',
                  columnNumber === 4 && 'h-[92px]',
                )}
              >
                <div className='flex-grow'>
                  <div className='line-clamp-1 text-left leading-tight font-semibold text-black'>{child.label}</div>
                  <p className='line-clamp-2 text-left text-sm text-black/60'>{child.content}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
