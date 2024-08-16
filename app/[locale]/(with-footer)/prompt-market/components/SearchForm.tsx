'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { objToQueryStr } from '@/lib/utils/stringUtils';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const FormSchema = z.object({
  prompt: z.string({
    required_error: 'Please input your search.',
  }),
});

export const ALL_TAG = 'all';

export default function SearchForm() {
  const t = useTranslations('prompt-market');
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      prompt: searchParams.get('prompt') || '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { prompt } = data;
    router.push(objToQueryStr('/prompt-market', { prompt, style: searchParams.get('style') }));
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex gap-x-2 lg:gap-x-5'>
        <FormField
          control={form.control}
          name='prompt'
          render={({ field }) => (
            <FormItem className='flex'>
              <FormLabel htmlFor={field.name} className='relative flex items-center p-0'>
                <Input
                  type='search'
                  onChange={field.onChange}
                  value={field.value}
                  placeholder={t('placeholder')}
                  className='rounded-lg border border-main-gray bg-transparent pr-10 placeholder:uppercase lg:w-[413px]'
                />
                <button
                  type='submit'
                  className='absolute right-3 top-3 flex items-center justify-center border-l border-main-gray pl-2'
                >
                  <Search className='size-4 text-main-gray' />
                  <span className='sr-only'>search</span>
                </button>
                <FormMessage />
              </FormLabel>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
