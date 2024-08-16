import { Minus } from 'lucide-react';

import CopyBtn from '@/components/CopyBtn';

type Props = {
  title: string;
  content: string;
};

export default function Prompt({ title, content }: Props) {
  return (
    <div className='font-roboto flex flex-col gap-2 text-white/70'>
      <div className='flex gap-3'>
        <h3 className='flex items-center gap-1 capitalize'>
          <Minus /> {title}
        </h3>
        <CopyBtn content={content} />
      </div>
      <textarea
        defaultValue={content}
        disabled
        className='h-[168px] cursor-text resize-none overflow-y-auto rounded-lg border-[0.5px] border-main-gray bg-black p-4 text-xs font-normal tracking-wide text-white/70 lg:h-[353px]'
      />
    </div>
  );
}
