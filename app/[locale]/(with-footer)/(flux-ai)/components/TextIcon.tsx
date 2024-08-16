import { ChevronRight } from 'lucide-react';

export default function TextIcon({ title }: { title: string }) {
  return (
    <div className='flex h-[38px] shrink-0 items-center rounded-lg text-sm font-semibold text-white/40 lg:pl-3'>
      {title}
      <ChevronRight className='size-4' />
    </div>
  );
}
