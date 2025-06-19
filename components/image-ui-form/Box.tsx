import { cn } from '@/lib/utils';

export default function Box({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex h-9 items-center justify-center rounded bg-white/10 px-3 text-sm', className)}>
      {children}
    </div>
  );
}
