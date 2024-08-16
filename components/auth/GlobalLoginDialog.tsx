'use client';

import { useEffect } from 'react';
import useGlobalLoginStore from '@/store/useGlobalLoginStore';
import { CircleX } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog';

import ForgotPassword from './login/ForgotPassword';
import LoginForm from './login/LoginForm';
import ResetPassword from './login/ResetPassword';
import SignupForm from './signup/SignupForm';
import Verification from './signup/Verification';

export default function GlobalLoginDialog({ className }: { className?: string }) {
  const open = useGlobalLoginStore((state) => state.open);
  const setOpen = useGlobalLoginStore((state) => state.setOpen);
  const step = useGlobalLoginStore((state) => state.step);
  const setStep = useGlobalLoginStore((state) => state.setStep);

  useEffect(() => {
    if (open) {
      setStep('login');
    }
  }, [open, setStep]);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        closeBtnClassName='hidden'
        className={cn(
          'lg:bg-gradient-price-dialog flex h-[581px] w-[calc(100%-32px)] !rounded-2xl  bg-[#1D1D27] p-3 lg:min-w-[740px]',
          className,
        )}
      >
        <div className='relative flex flex-1 gap-4'>
          <img
            className='bg-gradient-character-list-card hidden w-[383px] rounded-xl lg:block'
            src='/images/auth/auth.jpg'
            alt='auth'
          />
          <div className='flex w-full flex-1 shrink-0 flex-col'>
            <DialogClose asChild>
              <button type='button' className='absolute right-0 top-0' onClick={onClose}>
                <CircleX className='size-5 rounded-full bg-[#1D1D27]' />
                <span className='sr-only'>close</span>
              </button>
            </DialogClose>
            {/* login */}
            {step === 'login' && <LoginForm />}
            {step === 'forgetPassword' && <ForgotPassword />}
            {step === 'resetPassword' && <ResetPassword />}
            {/* <LoginForm className={`${step === 'login' ? 'flex' : 'hidden'}`} /> */}
            {/* <ForgotPassword className={`${step === 'forgetPassword' ? 'flex' : 'hidden'}`} /> */}
            {/* <ResetPassword className={`${step === 'resetPassword' ? 'flex' : 'hidden'}`} /> */}

            {/* signup */}
            {step === 'signup' && <SignupForm />}
            {step === 'verifyCode' && <Verification />}
            {/* <SignupForm className={`${step === 'signup' ? 'flex' : 'hidden'}`} /> */}
            {/* <Verification className={`${step === 'verifyCode' ? 'flex' : 'hidden'}`} /> */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
