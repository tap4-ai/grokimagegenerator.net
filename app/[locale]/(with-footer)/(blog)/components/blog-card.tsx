import { getTranslations } from 'next-intl/server';

import { formatDate } from '@/lib/utils/timeUtils';
import { Link } from '@/i18n/navigation';

import LikeButton from './like-button';

export default async function BlogCard({
  nameId,
  href,
  imgSrc,
  title,
  description,
  time,
  likeCount,
}: {
  nameId: string;
  href: string;
  imgSrc: string;
  title: string;
  description: string;
  time: number;
  likeCount: number;
}) {
  const t = await getTranslations('blog.card');

  return (
    <div className='flex flex-col gap-3 rounded-[24px] bg-[#2C2C2D] p-8'>
      <Link href={href}>
        <img
          src={imgSrc}
          alt={title}
          loading='lazy'
          decoding='async'
          className='h-[161px] w-full rounded-2xl bg-black lg:h-[200px]'
        />
        <div className='mt-5 flex flex-col gap-3'>
          <h3 className='text-lg font-semibold'>{title}</h3>
          <p className='line-clamp-3 opacity-70'>{description}</p>
        </div>
      </Link>
      <div className='h-px w-full bg-[#414142]' />
      <div className='flex flex-col gap-2'>
        <div>
          {t('time')}: {formatDate(time)}
        </div>
        <LikeButton nameId={nameId} likeCount={likeCount} />
      </div>
    </div>
  );
}
