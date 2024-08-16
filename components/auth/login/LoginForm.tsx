'use client';

/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { loginSystem, loginWithSocial, UserData } from '@/network/auth';
import useGlobalLoginStore from '@/store/useGlobalLoginStore';
import useUserInfoStore from '@/store/useUserInfoStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { sendGAEvent } from '@next/third-parties/google';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { SOCIAL_SOURCE_GOOGLE } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import BaseImage from '@/components/image/BaseImage';
import { useRouter } from '@/app/navigation';

import Btn from '../Btn';

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default function LoginForm({ className }: { className?: string }) {
  const t = useTranslations('Login');
  const router = useRouter();
  const setStep = useGlobalLoginStore((state) => state.setStep);
  const setOpen = useGlobalLoginStore((state) => state.setOpen);

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const setAuth = useUserInfoStore((state) => state.setAuth);
  const setUserInfo = useUserInfoStore((state) => state.setUserInfo);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    let errMsg = t('networkError');
    try {
      setLoading(true);
      const res = await loginSystem({
        email: data.email,
        password: data.password,
      });
      errMsg = res.msg;
      if (res?.code !== 200) {
        toast.error(errMsg);
        return;
      }
      toast.success(t('loginSuccessful'));
      sendGAEvent({
        event: 'login',
        value: 'account',
      });
      const { auth, userInfo } = res.data as UserData;
      setAuth(auth);
      setUserInfo(userInfo);
      setOpen(false);
      // router.push(cbUrl || loginDialogCbUrl || '/');
      // updateStore({ cbUrl: '' });
    } catch (error) {
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const socialLogin = async (source: string) => {
    let errMsg = t('networkError');
    try {
      setGoogleLoading(true);
      const res = await loginWithSocial(source);
      errMsg = res.msg;
      if (res?.code !== 200) {
        toast.error(errMsg);
        return;
      }
      await router.replace(res.data);
      setOpen(false);
    } catch (error) {
      toast.error(errMsg);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('flex size-full flex-col gap-5', className)}>
        <div className='text-sm'>
          <h1 className='text-xl font-bold'>{t('login')}</h1>
          <span>{t('noAccount')}</span>
          <button
            type='button'
            onClick={() => setStep('signup')}
            className='ml-1 text-[#3CD4E9] hover:underline hover:opacity-80'
          >
            {t('createOne')}
          </button>
        </div>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>{t('email')}</FormLabel>
              <FormControl>
                <Input
                  type='email'
                  placeholder={t('emailPlaceholder')}
                  className='input-border border-none'
                  {...field}
                />
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
              <div className='flex items-center justify-between'>
                <FormLabel>{t('password')}</FormLabel>
                <button
                  type='button'
                  onClick={() => setStep('forgetPassword')}
                  className='text-xs font-medium text-[#3CD4E9] hover:underline'
                >
                  {t('forgotPassword')}
                </button>
              </div>
              <FormControl>
                <Input
                  type='password'
                  placeholder={t('passwordPlaceholder')}
                  className='input-border border-none'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Btn isLoading={loading} type='submit' className='login-btn mt-auto'>
          {t('login')}
        </Btn>
        <Btn
          type='button'
          className='border-[0.5px] border-white bg-dark-bg'
          onClick={() => socialLogin(SOCIAL_SOURCE_GOOGLE)}
          isLoading={googleLoading}
        >
          <BaseImage src='/images/auth/Google.png' width={24} height={18} title='Google' alt='Google' />
          {t('siginGoogle')}
        </Btn>
      </form>
    </Form>
  );
}
