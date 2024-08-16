import { cn } from '@/lib/utils';

export default function Item({
  label,
  className,
  selected = false,
  children,
}: {
  label: string;
  className?: string;
  selected?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'group flex h-[34px] items-center gap-1 rounded-[9px] border border-transparent bg-white px-[10px] hover:cursor-pointer hover:border-white',
        selected && 'border border-white bg-[#FFE4EB]',
        className,
      )}
    >
      {children}
      <span
        className={cn(
          'text-ag-black text-center text-xs font-normal leading-[14px] group-hover:text-white',
          selected && 'text-white',
        )}
      >
        {label}
      </span>
    </div>
  );
}
