'use client';

import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

import useCopyToClipboard from '@/hooks/useCopyToClipboard';
import BaseImage from '@/components/image/BaseImage';

export default function CopyBtn({
  content,
  className,
  delay = 2000,
}: {
  content: string;
  className?: string;
  delay?: number;
}) {
  const t = useTranslations();
  const { isCopied, copyToClipboard } = useCopyToClipboard(delay);

  function onCopy() {
    copyToClipboard(content);
  }

  return (
    <button type='button' disabled={isCopied} onClick={onCopy} className={className}>
      <span className='sr-only'>{t('Common.copy')}</span>
      {isCopied ? (
        <Check className='h-4 w-4' />
      ) : (
        <BaseImage
          src='/icons/copy.svg'
          alt='copy'
          width={12}
          height={12}
          className='h-4 w-4 rounded-sm hover:scale-110 hover:cursor-pointer'
        />
      )}
    </button>
  );
}
