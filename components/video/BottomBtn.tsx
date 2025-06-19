/* eslint-disable react/jsx-props-no-spreading */
import { ComponentProps, PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

export default function BottomBtn({
  type = 'button',
  children,
  className,
  ...props
}: PropsWithChildren<ComponentProps<'button'>>) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      {...props}
      className={cn(
        'flex h-7 items-center justify-center gap-1 rounded border border-main-gray bg-black px-1.5 text-xs text-white/40',
        className,
      )}
    >
      {children}
    </button>
  );
}
