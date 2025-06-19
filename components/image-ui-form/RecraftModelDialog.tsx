'use client';

import useRecraftModalStore from '@/store/form/useRecraftModalStore';
import { CircleX } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';
import useRecraftModelsList from '@/hooks/translation/useRecraftModelsList';
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog';

function ModelImg({
  imgSrc,
  name,
  isSelected,
  id,
  onClick,
}: {
  imgSrc: string;
  name: string;
  isSelected: boolean;
  id: string;
  onClick: (id: string) => void;
}) {
  return (
    <li className='w-full'>
      <button type='button' onClick={() => onClick(id)} className='flex w-full flex-col items-center'>
        <img
          src={imgSrc}
          alt={name}
          className={cn(
            'aspect-square w-full rounded-xl border border-transparent hover:border-white',
            isSelected && 'border-white',
          )}
        />
        <div className={cn('line-clamp-1 py-2 text-sm text-white/40', isSelected && 'text-white')}>{name}</div>
      </button>
    </li>
  );
}

export default function RecraftModelDialog({
  open,
  setOpen,
  onClick,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  onClick: (id: string) => void;
}) {
  const t = useTranslations('flux-ai.recraft-ai-image-generator.model-dialog');

  const selectedModalId = useRecraftModalStore((state) => state.selectedModalId);
  const recraftModalList = useRecraftModelsList();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        closeBtnClassName='hidden'
        className='flex max-h-[600px] w-[calc(100%-24px)] flex-col gap-3 rounded-xl! border-none bg-main-gray p-3 lg:max-h-none lg:w-full lg:max-w-pc'
      >
        <div className='flex items-start justify-between'>
          <div className='text-lg font-semibold'>{t('choose model')}</div>
          <DialogClose asChild>
            <button type='button' onClick={() => setOpen(false)}>
              <CircleX className='size-5' />
              <span className='sr-only'>close</span>
            </button>
          </DialogClose>
        </div>
        <ul className='no-scrollbar grid w-full grid-cols-2 gap-3 overflow-y-auto lg:grid-cols-8'>
          {recraftModalList.map((el) => (
            <ModelImg
              key={el.id}
              imgSrc={el.imageSrc}
              name={el.name}
              id={el.id}
              isSelected={el.id === selectedModalId}
              onClick={onClick}
            />
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
