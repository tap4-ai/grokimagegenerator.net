import { cn } from '@/lib/utils';

export default function SubHeading({
  title,
  description,
  className,
  titleClassName,
}: {
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div
      className={cn(
        'mx-auto flex max-w-5xl flex-col items-center gap-3 text-balance text-center tracking-[1.5px] lg:leading-9',
        className,
      )}
    >
      <h2 className={cn('text-32 font-semibold lg:text-5xl', titleClassName)}>{title}</h2>
      {description && <p className='text-sm lg:text-lg'>{description}</p>}
    </div>
  );
}
