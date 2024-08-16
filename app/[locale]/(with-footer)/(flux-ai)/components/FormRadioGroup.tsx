'use client';

import { ControllerRenderProps, FieldValues, useFormContext } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface RadioOption {
  value: string;
  name: string;
  icon?: React.ReactNode;
}

export default function FormRadioGroup({
  name,
  options,
  onChange,
}: {
  name: string;
  options: RadioOption[];
  onChange?: (val: string) => void;
}) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      // eslint-disable-next-line react/no-unused-prop-types
      render={({ field }: { field: ControllerRenderProps<FieldValues, string> }) => (
        <FormItem key={field.name} className='flex gap-3 space-y-0'>
          <FormLabel htmlFor={field.name} className='sr-only'>
            {name}
          </FormLabel>
          <FormControl className='flex items-center'>
            <RadioGroup
              onValueChange={onChange || field.onChange}
              value={field.value}
              className='flex flex-1 flex-wrap'
            >
              {options.map((item) => (
                <FormItem key={item.value} className='space-y-0'>
                  <FormControl>
                    <RadioGroupItem className='hidden' value={item.value} />
                  </FormControl>
                  <FormLabel>
                    <div
                      className={cn(
                        'flex h-[38px] items-center justify-center gap-1 rounded-lg border border-main-gray border-white/40 bg-black px-2 text-xs text-white/40 hover:cursor-pointer',
                        item.value === field.value && 'border-white text-white',
                      )}
                    >
                      {item?.icon}
                      {item.name}
                    </div>
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
