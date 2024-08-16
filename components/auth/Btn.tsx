import { cn } from '@/lib/utils';

import Spinning from '../Spinning';

export default function Btn({
  type,
  className,
  children,
  disabled = false,
  isLoading,
  onClick,
}: {
  type: 'submit' | 'reset' | 'button';
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={cn(
        'flex h-12 w-full items-center justify-center gap-4 rounded-lg text-center font-bold text-white hover:cursor-pointer hover:opacity-80',
        className,
      )}
    >
      {isLoading ? <Spinning className='size-5' /> : children}
    </button>
  );
}
