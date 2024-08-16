import { cn } from '@/lib/utils';

export default function LoadingBar({ className }: { className?: string }) {
  return (
    <div className={cn('flex h-[121px] w-full flex-col gap-px overflow-hidden rounded-xl', className)}>
      <div className='h-11 w-full bg-main-gray' />
      <div className='w-full flex-1 bg-main-gray' />
    </div>
  );
}
