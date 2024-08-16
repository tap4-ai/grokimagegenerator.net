/* eslint-disable react/jsx-props-no-spreading */

'use client';

import { useState } from 'react';
import { loginWithSocial, signupWithEmail } from '@/network/auth';
import useGlobalLoginStore from '@/store/useGlobalLoginStore';
import { zodResolver } from '@hookform/resolvers/zod';
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

const FormSchema = z
  .object({
    email: z.string().email(),
    userName: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirm'],
  });

export default function SignupForm({ className }: { className?: string }) {
  const t = useTranslations('Signup');
  const router = useRouter();
  // const searchParams = useSearchParams();
  // const cbUrl = searchParams.get(LOGIN_CALLBACK_URL);

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const setStep = useGlobalLoginStore((state) => state.setStep);
  const setOpen = useGlobalLoginStore((state) => state.setOpen);
  const setEmail = useGlobalLoginStore((state) => state.setEmail);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      userName: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    let errMsg = t('networkError');
    if (data.password !== data.confirmPassword) {
      toast.error(t('passwordNotMatch'));
      return;
    }

    try {
      setLoading(true);
      const res = await signupWithEmail({
        email: data.email,
        userName: data.userName,
        password: data.password,
      });
      errMsg = res.msg;
      if (res?.code !== 200) {
        toast.error(errMsg);
        return;
      }
      toast.success(res?.msg);
      setEmail(data.email);
      setStep('verifyCode');
    } catch (error) {
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const socialSignup = async (source: string) => {
    let errMsg = t('networkError');
    try {
      setGoogleLoading(true);
      const res = await loginWithSocial(source);
      errMsg = res.msg;
      if (res?.code !== 200) {
        toast.error(errMsg);
        return;
      }
      setOpen(false);
      router.replace(res.data);
    } catch (error) {
      toast.error(errMsg);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('flex size-full flex-col gap-3', className)}>
        <div>
          <h1 className='text-xl font-bold'>{t('welcome')}</h1>
          <span className='text-sm'>{t('haveAccount')}</span>
          <button
            type='button'
            onClick={() => setStep('login')}
            className='ml-1 text-[#3CD4E9] hover:underline hover:opacity-80'
          >
            {t('goTologin')}
          </button>
        </div>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>{t('email')}</FormLabel>
              <FormControl>
                <Input placeholder={t('emailPlaceholder')} className='input-border' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='userName'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>{t('userName')}</FormLabel>
              <FormControl>
                <Input placeholder={t('userNamePlaceholder')} className='input-border' {...field} />
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
        <Btn isLoading={loading} type='submit' className='login-btn mt-auto'>
          {t('Signup')}
        </Btn>
        <Btn
          type='button'
          className='border-[0.5px] border-white bg-dark-bg'
          onClick={() => socialSignup(SOCIAL_SOURCE_GOOGLE)}
          isLoading={googleLoading}
        >
          <BaseImage src='/images/auth/Google.png' width={24} height={18} title='Google' alt='Google' />
          {t('siginGoogle')}
        </Btn>
      </form>
    </Form>
  );
}
