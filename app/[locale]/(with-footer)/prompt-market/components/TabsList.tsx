'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { PROMPT_MARKET_TAPS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { objToQueryStr } from '@/lib/utils/stringUtils';
import { useRouter } from '@/app/navigation';

export default function TabsList() {
  const t = useTranslations('prompt-market.tabs');
  const searchParams = useSearchParams();
  const router = useRouter();

  const [activeNameId, setActiveNameId] = useState(searchParams.get('style') || PROMPT_MARKET_TAPS[0].nameId);

  const onNavigate = (val: string) => {
    setActiveNameId(val);
    router.push(objToQueryStr('/prompt-market', { style: val, prompt: searchParams.get('prompt') }));
  };

  return (
    <ul className='no-scrollbar flex max-w-full items-center gap-3 overflow-x-auto px-3 lg:px-0'>
      {PROMPT_MARKET_TAPS.map((item) => (
        <li key={item.id}>
          <button
            type='button'
            onClick={() => onNavigate(item.nameId)}
            className={cn(
              'h-9 text-nowrap rounded-lg border border-main-gray bg-card-black px-3',
              activeNameId === item.nameId && 'border-white',
              // !searchParams.get('style') && item.id === 'all' && 'border-white',
            )}
          >
            {t(item.name)}
          </button>
        </li>
      ))}
    </ul>
  );
}
