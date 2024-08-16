/* eslint-disable react/jsx-props-no-spreading */

'use client';

import { useState } from 'react';
import { getVerifyCodeByEmail } from '@/network/auth';
import useGlobalLoginStore from '@/store/useGlobalLoginStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { cn } from '@/lib/utils';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import Btn from '../Btn';

const FormSchema = z.object({
  email: z.string().email(),
});

export default function ForgotPassword({ className }: { className?: string }) {
  const t = useTranslations('Login');

  const setStep = useGlobalLoginStore((state) => state.setStep);
  const setEmail = useGlobalLoginStore((state) => state.setEmail);

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
    },
  });

  // const cleanUp = () => {
  //   form.reset();
  // };

  const gotoLogin = () => {
    setStep('login');
    // cleanUp();
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      setLoading(true);
      const res = await getVerifyCodeByEmail({
        email: data.email,
      });
      if (res?.code !== 200) {
        throw new Error(res?.msg);
      }
      toast.success(res?.msg);
      setEmail(data.email);
      setStep('resetPassword');
    } catch (error: any) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('flex size-full flex-col justify-between', className)}>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='flex-1'>
              <div className='mb-4'>
                <h1 className='text-xl font-bold '>{t('forgotPasswordTitle')}</h1>
                <div className='text-sm font-normal'>
                  <span>{t('rememberPassword')}</span>{' '}
                  <button type='button' onClick={gotoLogin} className='text-[#3CD4E9] hover:underline'>
                    {t('login')}
                  </button>
                </div>
              </div>
              <FormLabel className='text-sm font-bold'>{t('email')}</FormLabel>
              <FormControl>
                <Input type='email' placeholder={t('emailPlaceholder')} className='input-border' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Btn type='submit' isLoading={loading} className={cn('login-btn', loading ? 'hover:cursor-not-allowed' : '')}>
          {t('confirm')}
        </Btn>
      </form>
    </Form>
  );
}
