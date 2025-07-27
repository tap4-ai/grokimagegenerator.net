import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { FREE_IMAGE_FORMAT_CONVERTER_LINKS } from '@/lib/constants';
import { numberList } from '@/lib/utils/arrayUtils';
import { ImageFormatConverter } from '@/components/common/ImageFormatConverter';
import Faq from '@/components/Faq';
import BlogRecommend from '@/components/home/blog-recommend';
import HeroSection from '@/components/home/new-section/hero-section';
// import StartNowSection from '@/components/home/new-section/start-now-section';
import Features from '@/components/home/newSections/Features';
import IntroductionSection from '@/components/home/newSections/IntroductionSection';
import AdvantageSection from '@/components/home/section2/advantage-section';
import ManualSectionNew from '@/components/home/sections/ManualSection';

export const revalidate = 43200; // 12 hours

export const dynamicParams = false;

export function generateStaticParams() {
  return FREE_IMAGE_FORMAT_CONVERTER_LINKS.map((link) => ({
    slug: link.code,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = await getTranslations(`Metadata.free-image-format-converter.${slug}`);

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations(`free-image-format-converter.${slug}`);

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

        <ImageFormatConverter className='mx-auto max-w-[924px]' />
        <IntroductionSection
          className='mt-10'
          title={t('introduction.title')}
          description={t('introduction.description')}
        />
      </div>

      <Features
        title={t('features.title')}
        description={t('features.description')}
        features={numberList(4).map((num) => ({
          title: t(`features.${num}.title`),
          description: t(`features.${num}.description`),
        }))}
      />
      <AdvantageSection
        title={t('advantage.title')}
        description={t('advantage.description')}
        href={`/free-image-format-converter/${slug}`}
        hrefTitle={t('advantage.try-now')}
        imgSrc='/grokimagegenerator/free_image_format_converter/scene/scene.webp'
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
        faqList={numberList(5).map((num) => ({
          id: num,
          question: t(`faq.${num}.question`),
          answer: t(`faq.${num}.answer`),
        }))}
        className='py-[60px] lg:py-[100px]'
      />
      <BlogRecommend title={t('blog.title')} path='free-image-format-converter' />

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
