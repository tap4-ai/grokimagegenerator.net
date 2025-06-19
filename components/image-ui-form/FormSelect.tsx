'use client';

import { useFormContext } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type SelectOption = {
  name: string;
  value: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export default function FormSelect({
  name,
  options,
  className,
  disabled,
  onChange,
}: {
  name: string;
  options: SelectOption[];
  className?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}) {
  const methods = useFormContext();

  const handleChange = (val: string) => {
    if (onChange) {
      onChange(val);
      return;
    }
    methods.setValue(name, val);
  };

  return (
    <FormField
      control={methods.control}
      name={name}
      render={({ field }) => (
        <FormItem className='space-y-0'>
          <FormLabel className='sr-only'>{name}</FormLabel>
          <Select onValueChange={handleChange} value={field.value} disabled={disabled}>
            <FormControl>
              <SelectTrigger className={cn('h-9 rounded border-none bg-white/5 py-1 text-sm text-white/70', className)}>
                <SelectValue placeholder='' />
              </SelectTrigger>
            </FormControl>
            <SelectContent className='flex rounded border-[#363C41] bg-white/10 backdrop-blur-xl'>
              {options.map((item) => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  className={cn(
                    'cursor-pointer rounded text-white/70 focus:bg-white/10',
                    item.value === field.value && 'border-white text-white',
                  )}
                >
                  <span className='flex items-center gap-1.5'>
                    {item?.leftIcon}
                    {item.name}
                    {item?.rightIcon}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
