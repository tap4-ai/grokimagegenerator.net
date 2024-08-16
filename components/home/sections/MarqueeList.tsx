/* eslint-disable react/jsx-props-no-spreading */
import Marquee from '@/components/magicui/marquee';

const imageList = Array.from({ length: 14 }, (_, idx) => ({ id: idx, imgUrl: `/home/list/${idx + 1}.jpg` }));

const firstRow = imageList.slice(0, imageList.length / 2);
const secondRow = imageList.slice(imageList.length / 2);

function Card({ imgUrl }: { imgUrl: string }) {
  return <img className='h-[240px] rounded-xl' alt='' src={imgUrl} />;
}

export default function MarqueeList() {
  return (
    <div className='relative z-20 flex w-full flex-col items-center justify-center overflow-hidden lg:shadow-xl'>
      <Marquee pauseOnHover className='[--duration:40s]'>
        {firstRow.map((review) => (
          <Card key={review.id} imgUrl={review.imgUrl} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className='[--duration:40s]'>
        {secondRow.map((review) => (
          <Card key={review.id} imgUrl={review.imgUrl} />
        ))}
      </Marquee>
      <div className='pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-black' />
      <div className='pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-black' />
    </div>
  );
}
