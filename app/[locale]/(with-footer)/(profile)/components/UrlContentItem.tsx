import { cn } from '@/lib/utils';

export default function UrlContentItem({
  title,
  content,
  className,
}: {
  title: string;
  content: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex w-full flex-1 flex-col gap-1', className)}>
      <div className='text-xs text-white/40'>{title}</div>
      <div className='max-h-[90px] min-h-[38px] overflow-hidden text-wrap rounded-lg border-2 border-main-gray bg-card-black p-2 text-sm text-white/70'>
        {content}
      </div>
    </div>
  );
}
