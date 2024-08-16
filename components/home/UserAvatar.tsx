import { cn } from '@/lib/utils';

import BaseImage from '../image/BaseImage';

export default function UserAvatar({ className, name, src }: { className?: string; name: string; src?: string }) {
  if (!src) {
    return (
      <div
        className={cn(
          'border-1 flex size-[26px] items-center justify-center rounded-[6px] border-white bg-white text-black',
          className,
        )}
      >
        {name && name.at(0)?.toUpperCase()}
      </div>
    );
  }

  return (
    <BaseImage
      src={src}
      className={cn('border-1 size-[26px] rounded-[6px] border-white', className)}
      title={name}
      alt={name}
      width={26}
      height={26}
    />
  );
}
