'use client';

import useGlobalLoginStore from '@/store/useGlobalLoginStore';
import usePricingDialogStore from '@/store/usePricingDialogStore';
import useUserInfoStore from '@/store/useUserInfoStore';
import { useTranslations } from 'next-intl';

import { FLUX_KONTEXT_TEXT_TO_IMAGE_PRO_MODEL } from '@/lib/constants';

// import { useRouter } from '@/i18n/navigation';

const PromptListData = [
  {
    id: 1,
    prompt: 'Generate a cute plush toy cat image',
  },
  {
    id: 2,
    prompt: 'Generate a spectacular futuristic tech city image',
  },
  {
    id: 3,
    prompt: 'Generate a promotional image for wine products',
  },
];

export default function PromptList({
  // chatId,
  onSubmit,
}: {
  // chatId: string;
  onSubmit: ({ prompt, multiImages }: { prompt: string; multiImages?: File[] }) => void;
}) {
  // const router = useRouter();
  const t = useTranslations('components.chat-image-editor-form');
  const userInfo = useUserInfoStore((state) => state.userInfo);
  const auth = useUserInfoStore((state) => state.auth);
  const openLoginDialog = useGlobalLoginStore((state) => state.setOpen);
  const openPricing = usePricingDialogStore((state) => state.setOpen);

  const onClick = async (prompt: string) => {
    if (!userInfo || (auth && auth.expire_date < new Date().getTime())) {
      openLoginDialog(true);
      return;
    }

    if (userInfo && userInfo.credits < FLUX_KONTEXT_TEXT_TO_IMAGE_PRO_MODEL.credit) {
      openPricing(true);
      return;
    }

    // router.push(`/flux-kontext/${chatId}`);

    Promise.resolve().then(() => {
      onSubmit({
        prompt,
      });
    });
  };

  return (
    <div className='flex w-full flex-col items-center gap-3 text-sm text-white/70'>
      <p>{t('description-title')}</p>
      {PromptListData.map((el) => (
        <button key={el.id} type='button' className='rounded-xl bg-[#333] px-5 py-3' onClick={() => onClick(el.prompt)}>
          {el.prompt}
        </button>
      ))}
    </div>
  );
}
