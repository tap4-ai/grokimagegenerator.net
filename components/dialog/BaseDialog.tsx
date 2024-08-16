'use client';

import { cn } from '@/lib/utils';
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog';

import Spinning from '../Spinning';

function Btn({
  children,
  className,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type='button'
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'h-7 min-w-[102px] text-nowrap rounded-full border border-white px-2.5 text-center text-xs font-normal hover:opacity-80 lg:h-10 lg:w-[176px] lg:text-base',
        className,
      )}
    >
      {children}
    </button>
  );
}

export default function BaseDialog({
  open,
  setOpen,
  title,
  cancelText,
  okText,
  onClose,
  onOk,
  disabled = false,
  children,
  className,
  btnsGroupClassName,
  btnClassName,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
  cancelText: string;
  onClose: () => void;
  okText: string;
  onOk: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  btnsGroupClassName?: string;
  btnClassName?: string;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        closeBtnClassName='hidden'
        className={cn(
          'flex h-[156px] w-[264px] flex-col justify-between !rounded-[32px] bg-main-gray p-5 lg:h-[268px] lg:w-[528px] lg:px-[68px] lg:py-10',
          className,
        )}
      >
        {title && <div className='text-center text-sm font-bold lg:text-base'>{title}</div>}
        {children}
        <div className={cn('flex items-center justify-between', btnsGroupClassName)}>
          <DialogClose asChild>
            <Btn onClick={onClose} className={btnClassName}>
              {cancelText}
            </Btn>
          </DialogClose>
          <Btn
            disabled={disabled}
            onClick={onOk}
            className={cn(
              'flex-center border-none bg-white font-bold text-black',
              disabled && 'opacity-70',
              btnClassName,
            )}
          >
            {disabled ? <Spinning className='size-3.5 lg:size-4 ' /> : okText}
          </Btn>
        </div>
      </DialogContent>
    </Dialog>
  );
}
