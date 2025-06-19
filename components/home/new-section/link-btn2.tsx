import { Link } from '@/i18n/navigation';

import { cn } from '@/lib/utils';

export default function LinkBtn2({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'bg-color-100 text-color-main hover:bg-color-100/90 rounded-lg px-8 py-2.5 font-semibold backdrop-blur-sm',
        className,
      )}
    >
      {children}
    </Link>
  );
}
