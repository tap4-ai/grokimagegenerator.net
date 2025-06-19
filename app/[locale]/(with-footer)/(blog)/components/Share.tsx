'use client';

/* eslint-disable jsx-a11y/control-has-associated-label */
import { Facebook, Twitter } from 'lucide-react';
import { FacebookShareButton, TwitterShareButton } from 'react-share';

import { cn } from '@/lib/utils';
import CopyBtn from '@/components/CopyBtn';

function Span({ children }: { children: React.ReactNode }) {
  return (
    <span className='flex-center size-9 rounded-full border border-white opacity-40 hover:opacity-100'>{children}</span>
  );
}

export default function ShareSocialTwo({ shareUrl, className }: { shareUrl: string; className?: string }) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className='relative w-full opacity-40 lg:max-w-[204px]'>
        <input
          type='text'
          disabled
          defaultValue={shareUrl}
          className='h-9 w-full select-all overflow-x-auto truncate rounded-full bg-[#1A1A1A] px-5 py-3 pe-10 text-sm shadow-xs hover:cursor-text'
        />
        <CopyBtn content={shareUrl} className='absolute right-3 top-1/2 -translate-y-1/2' />
      </div>
      <TwitterShareButton url={shareUrl}>
        <Span>
          <Twitter className='size-6' strokeWidth={1} />
        </Span>
      </TwitterShareButton>
      <FacebookShareButton url={shareUrl}>
        <Span>
          <Facebook className='size-6' strokeWidth={1} />
        </Span>
      </FacebookShareButton>
    </div>
  );
}
