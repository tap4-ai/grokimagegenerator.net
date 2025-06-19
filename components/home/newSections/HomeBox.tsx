import { cn } from '@/lib/utils';

export default function HomeBox({
  children,
  className,
  outerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  outerClassName?: string;
}) {
  return (
    <div className={cn('flex rounded-[96px] bg-gradient-main p-px', outerClassName)}>
      <div className={cn('flex-1 rounded-inherit bg-card-black', className)}>{children}</div>
    </div>
  );
}
