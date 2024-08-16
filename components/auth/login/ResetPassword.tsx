/* eslint-disable react/jsx-props-no-spreading */

'use client';

import { useState } from 'react';
import { resetPassword } from '@/network/auth';
import useGlobalLoginStore from '@/store/useGlobalLoginStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { cn } from '@/lib/utils';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Separator } from '@/components/ui/separator';
import GobackBtn from '@/components/GobackBtn';

import Btn from '../Btn';

const FormSchema = z.object({
  code: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.',
  }),
  password: z.string(),
  confirmPassword: z.string(),
});

const MAX_LENGTH = 6;
const numList = Array.from({ length: MAX_LENGTH }).map((_, idx) => idx);

export default function ResetPassword({ className }: { className?: string }) {
  const t = useTranslations('Login');

  const email = useGlobalLoginStore((state) => state.email);
  const setStep = useGlobalLoginStore((state) => state.setStep);

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      code: '',
      password: '',
      confirmPassword: '',
    },
  });

  const watchCode = form.watch('code');

  const goBack = () => {
    setStep('login');
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      setLoading(true);
      const res = await resetPassword({
        email,
        emailCode: data.code,
        newPassword: data.password,
      });
      if (res?.code !== 200) {
        throw new Error(res?.msg);
      }
      toast.success(res?.msg);
      setStep('login');
    } catch (error: any) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('flex size-full flex-col justify-between gap-y-5', className)}
      >
        <div className='mb-3'>
          <h1 className='text-[26px] font-bold '>{t('changePasswordTitle')}</h1>
          <div className='mt-[10px] text-[13px] font-normal'>
            <span>{t('rememberPassword')}</span>{' '}
            <button type='button' onClick={() => setStep('login')} className='text-[#3CD4E9] hover:underline'>
              {t('login')}
            </button>
          </div>
        </div>
        <FormField
          control={form.control}
          name='code'
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center gap-5 overflow-hidden'>
                <Separator className='h-[1px] flex-1 bg-[#2C2B35]' />
                <FormLabel className='text-nowrap text-[13px] font-bold'>{t('pinCode')}</FormLabel>
                <Separator className='h-[1px] flex-1 bg-[#2C2B35]' />
              </div>
              <FormControl>
                <InputOTP maxLength={MAX_LENGTH} {...field}>
                  <InputOTPGroup className='mx-auto flex w-full items-center justify-between'>
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
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>{t('password')}</FormLabel>
              <FormControl>
                <Input type='password' placeholder={t('passwordPlaceholder')} className='input-border' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>{t('confirmPassword')}</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder={t('confirmPasswordPlaceholder')}
                  className='input-border'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex-xy-center mt-auto'>
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
