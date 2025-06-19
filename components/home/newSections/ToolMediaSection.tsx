/* eslint-disable no-confusing-arrow */
import { useTranslations } from 'next-intl';

import { NavChildren, toolsChildrenList } from '@/lib/constants';

import SectionHeader from '../sections/SectionHeader';
import ToolMediaCard from './ToolMediaCard';

function ToolText({ title, content }: { title: string; content: string }) {
  return (
    <div className='group flex h-[240px] flex-col justify-between overflow-hidden rounded-xl border border-main-gray bg-card-black lg:h-auto'>
      <div className='relative space-y-2 p-3'>
        <h3 className='text-lg font-medium text-white lg:text-2xl'>{title}</h3>
        <p className='text-white/70'>{content}</p>
      </div>
    </div>
  );
}

export default function ToolMediaSection() {
  const t = useTranslations('Home.tools');

  const list: (NavChildren & { title: string; content: string; tags: string[] })[] = [
    ...toolsChildrenList,
    {
      code: 'ai-action-figure-video-generator',
      href: '/ai-action-figure-video-generator',
      homeVideoSrc: 'https://c.topshort.org/fluxpro/home_2/tools/ai_action_figure_video/video.mp4',
      homeVideoPoster: 'https://c.topshort.org/fluxpro/home_2/tools/ai_action_figure_video/start_frame.webp',
      homeImgSrc: 'https://c.topshort.org/fluxpro/home_2/tools/ai_action_figure_video/start_frame.webp',
    },
    {
      code: 'ghibli-style-video-generator',
      href: '/ghibli-style-video-generator',
      homeVideoSrc: 'https://c.topshort.org/fluxpro/home_2/tools/ghibli_video_generator/video.mp4',
      homeVideoPoster: 'https://c.topshort.org/fluxpro/home_2/tools/ghibli_video_generator/start_frame.webp',
      homeImgSrc: 'https://c.topshort.org/fluxpro/home_2/tools/ghibli_video_generator/start_frame.webp',
    },
  ]
    .map((item) => ({
      ...item,
      title: t(`${item.code}.title`),
      content: t(`${item.code}.media-content`),
      tags: t(`${item.code}.media-tags`)
        .split('\n')
        .map((li) => li),
    }))
    .concat([
      {
        code: 'more',
        title: t('more.title'),
        content: t('more.media-content'),
        href: '',
        color: '',
        homeImgSrc: '',
        homeVideoSrc: '',
        homeVideoPoster: '',
        tags: [],
      },
    ]);

  const shouldShowVideoList = [
    'flux-video-ai',
    'dream-ai-video',
    'wan-ai-video',
    'ai-action-figure-video-generator',
    'ghibli-style-video-generator',
  ];

  return (
    <section className='flex w-full max-w-pc flex-col items-center gap-3 px-3 lg:px-0'>
      <SectionHeader title={t('title')} content={t('content')} />
      <div className='grid grid-cols-1 gap-5 lg:grid-cols-2'>
        {list.map((el, idx, arr) =>
          idx + 1 !== arr.length ? (
            <ToolMediaCard
              key={el.code}
              href={el.href}
              title={el.title}
              content={el.content}
              tags={el.tags}
              videoSrc={shouldShowVideoList.includes(el.code) ? el.homeVideoSrc : ''}
              videoPosterSrc={shouldShowVideoList.includes(el.code) ? el.homeVideoPoster : ''}
              imageSrc={el.homeImgSrc || ''}
            />
          ) : (
            <ToolText key={el.code} title={el.title} content={el.content} />
          ),
        )}
      </div>
    </section>
  );
}
