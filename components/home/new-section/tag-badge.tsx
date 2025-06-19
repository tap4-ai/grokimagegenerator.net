import { cn } from '@/lib/utils';

interface TagBadgeProps {
  children: React.ReactNode;
  variant: 'orange' | 'green' | 'blue' | 'purple';
}

export default function TagBadge({ children, variant }: TagBadgeProps) {
  const variants = {
    orange: 'bg-[#372717] border-[#5b3f18] text-[#d38a13]',
    green: 'bg-[#252a20] border-[#274833] text-[#19ac78]',
    blue: 'bg-[#25242b] border-[#2a3754] text-[#3a7deb]',
    purple: 'bg-[#2f1f2c] border-[#472b54] text-[#a654f5]',
  };

  return (
    <div
      className={cn(
        'relative flex-shrink-0 rounded border border-solid px-2 py-1 sm:px-3 sm:py-1.5',
        variants[variant],
      )}
    >
      <div className="font-['Noto_Sans'] text-[12px] leading-[18px] font-normal tracking-[0.24px] whitespace-nowrap sm:text-[14px] sm:leading-[21px] sm:tracking-[0.28px]">
        {children}
      </div>
    </div>
  );
}
