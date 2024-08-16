import { cn } from '@/lib/utils';

export default function Box({ className, children }: { className: string; children: React.ReactNode }) {
  return <div className={cn('rounded-[21px] border border-white/75 bg-dark-bg', className)}>{children}</div>;
}
