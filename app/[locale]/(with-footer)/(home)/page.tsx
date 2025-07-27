import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { numberList } from '@/lib/utils/arrayUtils';
import Faq from '@/components/Faq';
import BlogRecommend from '@/components/home/blog-recommend';
import HeroSection from '@/components/home/new-section/hero-section';
import StartNowSection from '@/components/home/new-section/start-now-section';
import Features from '@/components/home/newSections/Features';
import ModelsSection from '@/components/home/newSections/ModelsSection';
import AdvantageSection from '@/components/home/section2/advantage-section';
import ExampleSection, { type ExampleSectionProps } from '@/components/home/sections/ExampleSection';
import ManualSectionNew from '@/components/home/sections/ManualSection';
import OuterLinks from '@/components/home/sections/OuterLinks';
import TwitterSction from '@/components/home/sections/TwitterSction';

import ImageHistoryWrapper from './ImageHistoryWrapper';
import ImagePromptGeneratorWrapper from './ImagePromptGeneratorWrapper';

const tweetIds: string[] = [
  '1837931322356158513',
  '1929771017452282368',
  '1916207375029096770',
  '1875204735311188046',
  '1886882648829960654',
  '1865640421378175125',
  '1856020327869952188',
  '1867715876960842202',
];

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata.home');

  return {
    title: t('title'),
    description: t('description'),
  };
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('Home');

  const exampleSections: ExampleSectionProps = {
    promptTitle: t('example.promptTitle'),
    title: t('example.title'),
    subtitle: t('example.description'),
    sections: [
      {
        isWide: false,
        prompt: '',
        texts: [
          {
            title: t('example.texts.1.title'),
            description: t('example.texts.1.description'),
          },
          {
            title: t('example.texts.2.title'),
            description: t('example.texts.2.description'),
          },
        ],
      },
      {
        bgImage: 'https://cdn.videoweb.ai/grokimagegenerator/home/example/example1.webp',
        prompt:
          'A young girl with a backpack standing, watching a green and yellow train pass by at a railroad crossing in Japan. Style: Photorealistic Lighting: Bright Outdoor Light Composition: Medium Shot, slight low angle Details: Red blinking railroad signal, yellow and black railroad crossing sign, text in Japanese on a signpost, blurred faces of people in the train windows, girl wearing a light blue shirt, grey skirt, and white sneakers. Quality: High Detail, 4K',
        isWide: false,
      },
      {
        bgImage: 'https://cdn.videoweb.ai/grokimagegenerator/home/example/example2.webp',
        prompt:
          'A beautiful young woman with long black hair and bangs, wearing round glasses and a white t-shirt, pulling at her bottom lip with her finger, in an indoor cafe setting. Style: Photorealistic Lighting: Soft Natural Light Composition: Medium close-up portrait Details: Slight smirk, blurred background Quality: High detail',
        isWide: false,
      },
      {
        bgImage: 'https://cdn.videoweb.ai/grokimagegenerator/home/example/example3.webp',
        prompt:
          'A young girl with short brown hair and a red headband, wearing a white and blue jacket with red accents over a black shirt, and a pink and white plaid skirt, standing with her hands in her jacket pockets, against a wall with various posters with Asian text and symbols, and casting a shadow on the wall. Style: Anime, Watercolor Lighting: Sunlight Composition: Full body shot Details: Relaxed pose, casual outfit, urban background, posters with red, orange, and blue colors Quality: High Detail, Masterpiece',
        isWide: false,
      },
      {
        bgImage: 'https://cdn.videoweb.ai/grokimagegenerator/home/example/example4.webp',
        prompt:
          'A balcony full of potted plants on a building in a bustling cityscape at twilight, bathed in rain. Style: Anime, Digital Painting Lighting: Warm interior light contrasting with cool exterior light, moody atmosphere Composition: Medium shot, elevated viewpoint Details: Rain streaks visible, city lights in the background, potted plants of various sizes and types, railing detail, small white curtains on the window, illuminated room interior faintly visible, wires and power lines in the cityscape. Quality: High Detail, 4K, Masterpiece',
        isWide: true,
      },
      {
        bgImage: 'https://cdn.videoweb.ai/grokimagegenerator/home/example/example5.webp',
        prompt:
          'A portrait of a person with shoulder-length brown hair, depicted from the chest up, looking down and to the left, with their right shoulder visible and torso angled slightly to the right, against a cream colored background with stylized Japanese text in black and pink at the top left. Style: Halftone Pop Art, Retro Lighting: Simple Flat Lighting Composition: Medium Shot, Rule of Thirds Details: Minimalist color palette of black, orange, and cream, distressed texture effect, bold typography Quality: High Detail, Concept Art',
        isWide: false,
      },
      {
        isWide: true,
        prompt: '',
        texts: [
          {
            title: t('example.texts.3.title'),
            description: t('example.texts.3.description'),
          },
          {
            title: t('example.texts.4.title'),
            description: t('example.texts.4.description'),
          },
        ],
        btnText: t('example.btnText'),
        btnLink: '/',
      },
      {
        bgImage: 'https://cdn.videoweb.ai/grokimagegenerator/home/example/example6.webp',
        prompt:
          'A dark and narrow alleyway, lined with traditional Japanese buildings and dense, overgrown trees, in a mysterious and atmospheric urban environment at night. Style: Anime, Digital Art Lighting: Dim street lighting, Lantern light, Ambient light from the sky, Mysterious Green Glow Composition: Medium Shot, Leading Lines, Depth of Field Details: Overgrown foliage, Power lines crisscrossing the sky, Glowing lanterns, Wet pavement reflecting light, Glowing green particles in the air, Dark and moody atmosphere, Detailed textures Quality: High Detail, 4K',
        isWide: true,
      },
      {
        bgImage: 'https://cdn.videoweb.ai/grokimagegenerator/home/example/example7.webp',
        prompt:
          'Close-up of a young Asian woman with long black hair, looking to the side, framed by yellow flowers and green foliage. Style: Photorealistic Lighting: Soft Natural Light Composition: Close-up shot, Shallow Depth of Field Details: Detailed facial features, soft skin texture, green background blurred, foreground yellow flowers out of focus, dreamy atmosphere Quality: High Detail, 4K, Masterpiece',
        isWide: false,
      },
    ],
  };

  return (
    <div className='relative w-full'>
      <div className='container-centered container-py'>
        <HeroSection
          className='py-0 lg:py-0'
          title={t('heading.title')}
          description={t('heading.description')}
          href={process.env.NEXT_PUBLIC_HIGH_QUALITY_LINK!}
          hrefTitle={t('heading.try-now')}
          href2={process.env.NEXT_PUBLIC_AI_VIDEO_LINK!}
          hrefTitle2={t('heading.try-now-2')}
          tags={[
            { variant: 'orange', text: t('heading.tags.free') },
            { variant: 'green', text: t('heading.tags.powered') },
            { variant: 'blue', text: t('heading.tags.no-login') },
            { variant: 'purple', text: t('heading.tags.unlimited') },
          ]}
        />
        <ImagePromptGeneratorWrapper
          className='mt-8 md:mt-12'
          hrefs={{
            highQuality: process.env.NEXT_PUBLIC_HIGH_QUALITY_LINK!,
            generate: process.env.NEXT_PUBLIC_AI_VIDEO_LINK!,
          }}
        />
        <ImageHistoryWrapper className='mt-8 md:mt-12' />
      </div>
      <ExampleSection {...exampleSections} />

      <Features
        title={t('features.title')}
        features={numberList(4).map((num) => ({
          title: t(`features.${num}.title`),
          description: t(`features.${num}.description`),
        }))}
      />
      <ModelsSection
        title={t('models.title')}
        description={t('models.description')}
        models={numberList(3).map((num) => ({
          title: t(`models.${num}.title`),
          description: t(`models.${num}.description`),
        }))}
      />
      <AdvantageSection
        title={t('advantage.title')}
        description={t('advantage.description')}
        href='/'
        hrefTitle={t('advantage.try-now')}
        imgSrc='https://cdn.videoweb.ai/grokimagegenerator/home/scene/scene.webp'
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
      <TwitterSction tweetIds={tweetIds} title={t('twitter.title')} description={t('twitter.description')} />
      <Faq
        title={t('faq.title')}
        faqList={numberList(11).map((num) => ({
          id: num,
          question: t(`faq.${num}.question`),
          answer: t(`faq.${num}.answer`),
        }))}
        className='py-[60px] lg:py-[120px]'
      />
      <BlogRecommend title={t('blog.title')} path='homepage' />

      {/* <RecommendSectionContainer code='Home' blogData={homeBlogData} /> */}
      <StartNowSection title={t('start-now.title')} href='/' hrefTitle={t('start-now.try-now')} />
      <OuterLinks />
    </div>
  );
}
