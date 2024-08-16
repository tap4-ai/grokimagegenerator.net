/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/indent */

'use client';

import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

import { cn } from '@/lib/utils';

import { Switch } from './ui/switch';

const AgSwitch = forwardRef<
  ElementRef<typeof SwitchPrimitives.Root>,
  ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
    thumbClassName?: string;
  }
>(({ className, thumbClassName, ...props }, ref) => (
  <Switch
    className={cn(
      'h-[16px] w-[28px] border border-[#889799] !bg-transparent data-[state=checked]:border-white',
      className,
    )}
    thumbClassName={cn(
      'h-3 w-3 data-[state=unchecked]:translate-x-[1px] data-[state=checked]:translate-x-[12px] bg-[#889799] data-[state=checked]:bg-white',
      thumbClassName,
    )}
    ref={ref}
    {...props}
  />
));

export default AgSwitch;
