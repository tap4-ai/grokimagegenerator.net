import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { gatImageDetail } from '@/network/image';
import { Minus } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { IMAGE_STYLE_LIST, METADATA_TITLE_SUBFIX } from '@/lib/constants';
import { BASE_URL } from '@/lib/env';
import GobackBtn from '@/components/GobackBtn';

import Prompt from './components/Prompt';
import Share from './components/Share';

type Props = {
  params: {
    id: string;
  };
};

// 函数用于截断文本
const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3)}...`; // 使用模板字符串进行拼接
};

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {
  const t = await getTranslations();

  const res = await gatImageDetail(id);

  const {
    data: { detail },
  } = res;

  // 截断 title 和 description
  const truncatedTitle = truncateText(detail.title, 40);
  const truncatedDescription = truncateText(detail.prompt, 160);
  // const categoryTitle = `prompt-market.category.${detail.categoryId}`;
  // const translatedCategoryTitle = t(categoryTitle);

  return {
    title: `${truncatedTitle} | ${METADATA_TITLE_SUBFIX}`,
    description: truncatedDescription,
    // keywords: detail.tags,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/flux-ai/${id}/`,
    },
    openGraph: {
      title: truncatedTitle,
      description: truncatedDescription,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/flux-ai/${id}`,
      siteName: t('Metadata.common.siteName'),
      type: 'website',
      images: [
        {
          url: detail.thumbnailUrl,
          secureUrl: detail.thumbnailUrl,
          width: 1200,
          height: 630,
          alt: truncatedTitle,
        },
      ],
    },
    twitter: {
      title: truncatedTitle,
      description: truncatedDescription,
      site: t('Metadata.common.siteName'),
      creator: t('Metadata.common.siteName'),
      card: 'summary_large_image',
      images: {
        url: detail.thumbnailUrl,
        alt: t('Metadata.common.siteName'),
      },
    },
  };
}

export default async function Page({ params: { id } }: Props) {
  const t = await getTranslations();

  const res = await gatImageDetail(id);

  const {
    data: { detail },
  } = res;

  if (!res?.data?.detail) {
    return notFound();
  }

  const imageDownloadName = `${detail.title}_${detail.id}.${detail.mimeType.split('/').pop()}`;
  // 截断 title 和 description
  const truncatedTitle = truncateText(detail.title, 80);

  return (
    <div className='flex flex-col gap-11 px-3 py-5 lg:px-0 lg:py-10'>
      <div className='bg-ag-card/40 relative rounded-[32px] p-3 lg:p-10'>
        {/* 调整 GobackBtn 的位置 */}
        <GobackBtn className='absolute left-6 top-6 z-10' />

        {/* 容器用于对齐标题和内容 */}
        <div className='mx-auto flex w-full max-w-[1076px] flex-col'>
          {' '}
          {/* 1076px = 550px (图片宽度) + 488px (右侧内容宽度) + 38px (间距) */}
          {/* 调整标题的间距和对齐 */}
          <h1 className='mb-6 mt-14 w-full break-words px-3 text-left text-lg font-semibold lg:mt-4 lg:text-2xl'>
            {truncatedTitle}
          </h1>
          <div className='flex w-full flex-col items-start gap-5 lg:flex-row'>
            <div className='flex h-full w-full justify-center lg:w-auto lg:justify-start'>
              <img
                src={detail.url}
                width={550}
                height={550}
                alt={detail.title}
                title={detail.title}
                className='w-full rounded-xl bg-[#212D2F] lg:w-[550px]'
              />
            </div>
            <div className='flex w-full flex-col gap-1 lg:w-[488px]'>
              <div className='flex flex-col gap-3 rounded-xl bg-card-black p-5'>
                <Prompt title={t('Common.prompt')} content={detail?.outputPrompt || detail.prompt} />
                <div className='flex flex-col gap-2'>
                  <div className='flex items-center text-white/70'>
                    <Minus />
                    {t('Common.model')}
                  </div>
                  <div className='flex h-10 w-fit items-center justify-center rounded-lg border border-main-gray bg-black px-2 text-white/70'>
                    {IMAGE_STYLE_LIST.find((item) => item.value === detail.modelName)?.name}
                  </div>
                </div>
                <Share shareUrl={`${BASE_URL}/flux-ai/${id}`} downloadUrl={detail.url} imageName={imageDownloadName} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
