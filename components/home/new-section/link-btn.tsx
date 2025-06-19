import { Link } from '@/i18n/navigation';

import { cn } from '@/lib/utils';

export default function LinkBtn({
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
        'border-color-main bg-color-main hover:bg-color-main/90 flex items-center justify-center rounded-lg border-2 px-8 py-2.5 font-semibold backdrop-blur-sm',
        className,
      )}
    >
      {children}
    </Link>
  );
}
