import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { numberList } from '@/lib/utils/arrayUtils';
import ImageCompare from '@/components/common/ImageCompare';
import ImageUpscaler from '@/components/common/ImageUpscaler';
import Faq from '@/components/Faq';
import BlogRecommend from '@/components/home/blog-recommend';
import HeroSection from '@/components/home/new-section/hero-section';
// import StartNowSection from '@/components/home/new-section/start-now-section';
import IntroductionSection from '@/components/home/newSections/IntroductionSection';
import AdvantageSection from '@/components/home/section2/advantage-section';
import ManualSectionNew from '@/components/home/sections/ManualSection';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata.free-image-upscaler');

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('free-image-upscaler');

  return (
    <div className='relative w-full'>
      <div className='container-py container-centered space-y-8 md:space-y-12'>
        <HeroSection
          title={t('heading.title')}
          description={t('heading.description')}
          tags={[
            { variant: 'orange', text: t('heading.tags.free') },
            { variant: 'green', text: t('heading.tags.powered') },
            { variant: 'blue', text: t('heading.tags.no-login') },
            { variant: 'purple', text: t('heading.tags.unlimited') },
          ]}
        />

        <ImageUpscaler className='mx-auto max-w-[924px]' />
        <IntroductionSection
          className='mt-10'
          title={t('introduction.title')}
          description={t('introduction.description')}
        />
      </div>

      <ImageCompare
        leftImage='/grokimagegenerator/free_image_upscaler_online/example/example1.webp'
        rightImage='/grokimagegenerator/free_image_upscaler_online/example/example2.webp'
        leftSize='9.7KB'
        rightSize='12.7KB'
        code='free-image-upscaler'
        href='/free-image-upscaler'
      />
      <AdvantageSection
        title={t('advantage.title')}
        description={t('advantage.description')}
        href='/free-image-upscaler'
        hrefTitle={t('advantage.try-now')}
        imgSrc='/grokimagegenerator/free_image_upscaler_online/scene/scene.webp'
        list={numberList(4).map((num) => ({
          id: num,
          title: t(`advantage.${num}.title`),
          description: t(`advantage.${num}.description`),
        }))}
      />
      <ManualSectionNew
        title={t('manual.title')}
        content={t('manual.content')}
        stepList={numberList(4).map((num) => ({
          title: t(`manual.${num}.title`),
        }))}
      />
      <Faq
        title={t('faq.title')}
        faqList={numberList(6).map((num) => ({
          id: num,
          question: t(`faq.${num}.question`),
          answer: t(`faq.${num}.answer`),
        }))}
        className='py-[60px] lg:py-[100px]'
      />
      <BlogRecommend title={t('blog.title')} path='free-image-upscaler' />

      {/* <StartNowSection
        title={t('start-now.title')}
        href='/flux-ai-image-generator'
        hrefTitle={t('start-now.try-now')}
        href2='/janus-pro-image-generator'
        hrefTitle2={t('start-now.try-now-2')}
      /> */}
    </div>
  );
}
