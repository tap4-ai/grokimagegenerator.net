'use client';

import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { objToQueryStr } from '@/lib/utils/stringUtils';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { TimeList } from './constants';

export default function TimeOrderSelect() {
  const t = useTranslations('Profile.common');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const querysObj = Object.fromEntries(searchParams.entries());

  const [selectValue, setSelectValue] = useState(querysObj?.sort || TimeList[0].value);

  const onChange = (val: string) => {
    setSelectValue(val);
    const { search } = querysObj;

    if (val === TimeList[0].value) {
      router.push(objToQueryStr(pathname, { search }));
      return;
    }

    router.push(objToQueryStr(pathname, { search, sort: val }));
  };

  return (
    <Select value={selectValue} onValueChange={onChange}>
      <SelectTrigger className='h-9 w-fit rounded-lg border-none bg-dark-gray text-sm text-white/70'>
        <SelectValue placeholder='' />
      </SelectTrigger>
      <SelectContent className='border-none bg-dark-gray text-sm text-white/70'>
        <SelectGroup>
          {TimeList.map((item) => (
            <SelectItem key={item.value} value={item.value} className='hover:cursor-pointer hover:!bg-slate-500'>
              {t(`${item.title}`)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
