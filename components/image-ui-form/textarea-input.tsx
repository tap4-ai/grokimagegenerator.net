'use client';

import { CircleX } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import CopyBtn from '@/components/CopyBtn';

export default function TextareaInput({
  name,
  placeholder,
  className,
  showBtns = true,
}: {
  name: string;
  placeholder?: string;
  className?: string;
  showBtns?: boolean;
}) {
  const methods = useFormContext<{ [key: string]: string }>();

  return (
    <FormField
      control={methods.control}
      name={name}
      render={({ field }) => (
        <FormItem className='space-y-0'>
          <FormLabel htmlFor={field.name} className='items-center p-0'>
            <div className='relative'>
              <Textarea
                onChange={field.onChange}
                value={field.value}
                placeholder={placeholder}
                className={cn(
                  'h-[160px] resize-none rounded-lg border-none bg-color-bg p-3 text-white/70 placeholder:text-white/40',
                  className,
                )}
              />
              {showBtns && (
                <div className='absolute bottom-1 right-1 flex h-8 items-center gap-2.5 rounded bg-white/5 px-2 py-1.5'>
                  <CopyBtn content={field.value} className='text-white/70' />
                  <Separator orientation='vertical' className='h-full w-px bg-main-gray' />
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button type='button' onClick={() => field.onChange('')}>
                    <CircleX className='size-5 text-white/70' />
                  </button>
                </div>
              )}
            </div>
          </FormLabel>
        </FormItem>
      )}
    />
  );
}
