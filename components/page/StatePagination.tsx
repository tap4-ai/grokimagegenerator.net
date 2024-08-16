'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Pagination from 'rc-pagination';

import { cn } from '@/lib/utils';

type BasePaginationProps = {
  currentPage: number;
  pageSize: number;
  onChange: (page: number) => void;
  total: number;
  className?: string;
};

function ButtonTag({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <button
      type='button'
      className={cn('size-8 rounded-lg bg-main-black p-px hover:cursor-pointer hover:text-white', className)}
    >
      <span className='flex-xy-center size-full flex-1 rounded-lg bg-dark-gray'>{children}</span>
    </button>
  );
}

function itemRender({
  page,
  type,
  element,
  currentPage,
}: {
  page: number;
  type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next';
  element: React.ReactNode;
  currentPage: number;
}) {
  if (type === 'page') {
    return <ButtonTag className={page === currentPage ? 'bg-white' : ''}>{page}</ButtonTag>;
  }
  if (type === 'prev') {
    return (
      <ButtonTag>
        <ChevronLeft className='h-4 w-4' />
      </ButtonTag>
    );
  }
  if (type === 'next') {
    return (
      <ButtonTag>
        <ChevronRight className='h-4 w-4' />
      </ButtonTag>
    );
  }
  if (type === 'jump-prev' || type === 'jump-next') {
    return <div>...</div>;
  }
  return element;
}

export default function StatePagination({ currentPage, pageSize, onChange, total, className }: BasePaginationProps) {
  return (
    <Pagination
      className={cn('[&>li]:flex-xy-center flex gap-3 text-xs text-white', className)}
      pageSize={pageSize}
      current={currentPage}
      onChange={onChange}
      total={total}
      showLessItems
      itemRender={(page, type, element) => itemRender({ page, type, element, currentPage })}
      locale={{
        next_page: 'next',
        prev_page: 'prev',
      }}
      prevIcon={<ChevronLeft className='h-4 w-4' />}
      nextIcon={<ChevronRight className='h-4 w-4' />}
    />
  );
}
