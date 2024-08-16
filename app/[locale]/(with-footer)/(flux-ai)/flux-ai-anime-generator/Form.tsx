'use client';

import { useTranslations } from 'next-intl';
import { z } from 'zod';

import { ANIME_TYPE } from '../components/constants';
import FormRadioGroup from '../components/FormRadioGroup';
import GenerateForm from '../components/GenerateForm';
import TextIcon from '../components/TextIcon';
import { animeFormatPrompt } from '../components/utils';

export default function Form({ styleName }: { styleName: string }) {
  const t = useTranslations('flux-ai.form');

  const slotNode = (
    <div className='flex flex-col lg:flex-row lg:items-center lg:gap-3'>
      <TextIcon title={t('anime type')} />
      <FormRadioGroup
        name='animeType'
        options={ANIME_TYPE.map((item) => ({ ...item, name: t(`anime.type.${item.value}`) }))}
      />
    </div>
  );

  return (
    <GenerateForm
      formType='anime'
      styleName={styleName}
      moreFormSchema={z.object({
        animeType: z.string(),
      })}
      slotNode={slotNode}
      formatPrompt={animeFormatPrompt}
      defaultValues={{
        animeType: ANIME_TYPE[0].value,
      }}
    />
  );
}
