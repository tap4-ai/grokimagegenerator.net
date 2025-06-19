import LinkBtn from '../new-section/link-btn';
import SectionWrapper from '../section-wrapper';

export default function StartNow({
  title,
  description,
  href,
  hrefTitle,
  imgSrc,
}: {
  title: string;
  description: string;
  href: string;
  hrefTitle: string;
  imgSrc: string;
}) {
  return (
    <SectionWrapper className='bg-card-black'>
      <div className='flex flex-col items-center gap-5 lg:flex-row'>
        <div className='flex max-w-[743px] flex-col gap-3'>
          <h2 className='text-2xl font-semibold lg:text-6xl'>{title}</h2>
          <p className='opacity-70'>{description}</p>
          <LinkBtn href={href} className='w-fit'>
            {hrefTitle}
          </LinkBtn>
        </div>
        <img
          src={imgSrc}
          alt={title}
          className='w-full max-w-[749px]'
          loading='lazy'
          decoding='async'
          fetchPriority='low'
        />
      </div>
    </SectionWrapper>
  );
}
