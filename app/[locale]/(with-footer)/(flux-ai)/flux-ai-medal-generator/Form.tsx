'use client';

import { useTranslations } from 'next-intl';
import { z } from 'zod';

import { Separator } from '@/components/ui/separator';

import { MEDAL_METERIAL, MEDAL_SHAPE } from '../components/constants';
import FormSelect from '../components/FormSelect';
import GenerateForm from '../components/GenerateForm';
import TextIcon from '../components/TextIcon';
import { medalFormatPrompt } from '../components/utils';

export default function Form({ styleName }: { styleName: string }) {
  const t = useTranslations('flux-ai.form');

  const slotNode = (
    <>
      <div className='flex flex-col lg:flex-row lg:items-center lg:gap-3'>
        <TextIcon title={t('material')} />
        <FormSelect
          name='material'
          options={MEDAL_METERIAL.map((item) => ({ ...item, name: t(`medal.material.${item.value}`) }))}
        />
      </div>
      <Separator className='hidden h-5 w-px bg-main-gray lg:block' orientation='vertical' />
      <div className='flex flex-col lg:flex-row lg:items-center lg:gap-3'>
        <TextIcon title={t('shape')} />
        <FormSelect
          name='shape'
          options={MEDAL_SHAPE.map((item) => ({ ...item, name: t(`medal.shape.${item.value}`) }))}
        />
      </div>
    </>
  );

  return (
    <GenerateForm
      formType='medal'
      styleName={styleName}
      moreFormSchema={z.object({
        material: z.string(),
        shape: z.string(),
      })}
      slotNode={slotNode}
      formatPrompt={medalFormatPrompt}
      defaultValues={{
        material: MEDAL_METERIAL[0].value,
        shape: MEDAL_SHAPE[0].value,
      }}
    />
  );
}
