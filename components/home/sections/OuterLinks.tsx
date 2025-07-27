import { Link } from '@/i18n/navigation';
import { SquareArrowOutUpRight } from 'lucide-react';

import { HOME_OUTER_LINKS, UTM_SOURCE } from '@/lib/constants';

export default function OuterLinks() {
  return (
    <ul className='no-scrollbar max-w-pc mx-auto flex w-full items-center gap-5 overflow-x-auto px-3 text-white/70 lg:px-0'>
      {HOME_OUTER_LINKS.map((item) => (
        <Link
          key={item.href}
          href={`${item.href}?UTM_SOURCE=${UTM_SOURCE}`}
          target='_blank'
          className='flex shrink-0 items-center gap-0.5 hover:underline'
        >
          {item.name}
          <SquareArrowOutUpRight className='size-4' />
        </Link>
      ))}
    </ul>
  );
}
