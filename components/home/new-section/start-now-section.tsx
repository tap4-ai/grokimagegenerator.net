import LinkBtn from './link-btn';
import LinkBtn2 from './link-btn2';

export default function StartNowSection({
  title,
  href,
  href2,
  hrefTitle,
  hrefTitle2,
}: {
  title: string;
  href: string;
  href2?: string;
  hrefTitle: string;
  hrefTitle2?: string;
}) {
  return (
    <div className='container-centered container-py relative flex h-[443px] flex-col items-center justify-center gap-5 lg:h-[600px]'>
      <img
        src='https://cdn.videoweb.ai/grokimagegenerator/home/background/background.webp'
        alt='bg-pc'
        loading='lazy'
        fetchPriority='low'
        className='absolute inset-0 -z-10 size-full'
      />
      <h2 className='text-[32px] font-semibold text-white lg:text-[54px]'>{title}</h2>
      <div className='flex flex-col items-center gap-4 lg:flex-row'>
        <LinkBtn href={href}>{hrefTitle}</LinkBtn>
        {href2 && <LinkBtn2 href={href2}>{hrefTitle2}</LinkBtn2>}
      </div>
    </div>
  );
}
