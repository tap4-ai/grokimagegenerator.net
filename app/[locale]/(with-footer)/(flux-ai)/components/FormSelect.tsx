'use client';

import { useFormContext } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type SelectOption = {
  name: string;
  value: string;
};

export default function FormSelect({ name, options }: { name: string; options: SelectOption[] }) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='space-y-0'>
          <FormLabel className='sr-only'>{name}</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger className='h-[38px] rounded-lg border-white/70 bg-black px-2 py-1 text-white/70'>
                <SelectValue placeholder='' />
              </SelectTrigger>
            </FormControl>
            <SelectContent className='border-white/70 bg-black'>
              {options.map((item) => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  className={cn(
                    'cursor-pointer text-white/70 focus:bg-white/40',
                    item.value === field.value && 'border-white text-white',
                  )}
                >
                  {item.name}
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
