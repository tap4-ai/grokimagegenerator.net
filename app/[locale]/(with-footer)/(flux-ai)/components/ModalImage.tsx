import { LockKeyhole } from 'lucide-react';

import { cn } from '@/lib/utils';
import BaseImage from '@/components/image/BaseImage';

export default function ModalImage({
  src,
  selected,
  className,
  isPaidUser,
  title,
}: {
  src: string;
  selected: boolean;
  className?: string;
  isPaidUser: boolean;
  title: string;
}) {
  return (
    <figure
      className={cn('flex flex-col items-center gap-1 border-none hover:cursor-pointer hover:opacity-70', className)}
    >
      <div className='relative'>
        <BaseImage
          className={cn(
            'h-12 w-12 rounded-[9px] lg:h-24 lg:w-24 lg:rounded-[21px]',
            selected && 'border-2 border-white',
          )}
          src={src}
          width={96}
          height={96}
          alt={title}
          title={title}
        />
        <div
          className={cn(
            'absolute bottom-0 flex h-5 w-full items-center justify-center rounded-b-[9px] bg-[#00000080] lg:h-10 lg:rounded-b-[21px]',
            isPaidUser ? 'flex' : 'hidden',
          )}
        >
          <LockKeyhole width={18} height={18} className='h-4 w-3 lg:h-5 lg:w-4' />
        </div>
      </div>
      <span
        className={cn(
          'max-w-full truncate text-center text-[10px] font-normal capitalize leading-[14px] lg:text-xs',
          selected && 'text-white',
        )}
      >
        {title}
      </span>
    </figure>
  );
}
