import { CircleChevronRight } from 'lucide-react';

export default function BlogItem({ src, title, content }: { src: string; title: string; content: string }) {
  return (
    <figure className='group flex h-[88px] items-center gap-x-5 rounded-lg bg-[#2C2D36] p-3 hover:cursor-pointer hover:opacity-80 lg:h-[120px] lg:p-5'>
      <img
        src={src}
        width={138}
        height={138}
        title={title}
        alt={title}
        className='size-16 rounded-2xl bg-white/40 lg:size-20'
      />
      <div className='h-full flex-1 overflow-hidden group-hover:text-white'>
        <h2 className='truncate text-base font-bold lg:text-base'>{title}</h2>
        <p className='mt-1 line-clamp-2 text-xs font-normal leading-[13px] text-white/40 group-hover:text-white lg:leading-5'>
          {content}
        </p>
      </div>
      <CircleChevronRight className='h-5 w-5 group-hover:text-white' />
    </figure>
  );
}
