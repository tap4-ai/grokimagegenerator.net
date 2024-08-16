/* eslint-disable react/jsx-props-no-spreading */

'use client';

import { useState } from 'react';
import { verifyCode } from '@/network/auth';
import useGlobalLoginStore from '@/store/useGlobalLoginStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { cn } from '@/lib/utils';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import GobackBtn from '@/components/GobackBtn';

import Btn from '../Btn';

const FormSchema = z.object({
  code: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.',
  }),
});

const MAX_LENGTH = 6;
const numList = Array.from({ length: MAX_LENGTH }).map((_, idx) => idx);

export default function Verification({ className }: { className?: string }) {
  const t = useTranslations('Signup');

  const setStep = useGlobalLoginStore((state) => state.setStep);
  const email = useGlobalLoginStore((state) => state.email);
  const setEmail = useGlobalLoginStore((state) => state.setEmail);

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      code: '',
    },
  });

  const watchCode = form.watch('code');

  const goBack = () => {
    setStep('signup');
  };

  // eslint-disable-next-line arrow-body-style

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      setLoading(true);
      const res = await verifyCode({
        email,
        emailCode: data.code,
      });
      if (res?.code !== 200) {
        throw new Error(res?.msg);
      }
      toast.success(res?.msg);
      setStep('login');
      setEmail('');
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
          name='code'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-xl font-bold'>{t('pinCode')}</FormLabel>
              <FormDescription className='text-sm font-normal'>{t('enterCode')}</FormDescription>
              <FormControl>
                <InputOTP maxLength={MAX_LENGTH} {...field}>
                  <InputOTPGroup className='mt-5 flex w-full items-center justify-between'>
                    {numList.map((num) => (
                      <InputOTPSlot
                        key={num}
                        index={num}
                        className='flex-xy-center size-11 !rounded-lg !border-none bg-[#2C2B35] p-5'
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex-xy-center mb-7 mt-auto'>
          <GobackBtn handleGoBack={goBack} />
        </div>
        <Btn
          type='submit'
          disabled={watchCode.length !== MAX_LENGTH}
          isLoading={loading}
          className={cn('login-btn', watchCode.length !== MAX_LENGTH || loading ? 'hover:cursor-not-allowed' : '')}
        >
          {t('confirm')}
        </Btn>
      </form>
    </Form>
  );
}
