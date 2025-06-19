'use client';

import { useState } from 'react';
import { likeBlog } from '@/network/blog/client';
import useGlobalLoginStore from '@/store/useGlobalLoginStore';
import useUserInfoStore from '@/store/useUserInfoStore';
import { ThumbsUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { tryCatch } from '@/lib/utils/promiseUtils';

export default function LikeButton({ nameId, likeCount }: { nameId: string; likeCount: number }) {
  const t = useTranslations('blog.like');
  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState(likeCount);
  const userInfo = useUserInfoStore((state) => state.userInfo);
  const openLogin = useGlobalLoginStore((state) => state.setOpen);

  const handleLike = async () => {
    if (!userInfo) {
      openLogin(true);
      return;
    }

    const [err, res] = await tryCatch(likeBlog({ nameId, action: isLiked ? 'down' : 'up' }));
    if (err) {
      console.error(err);
      toast.error(t('error'));
      return;
    }
    if (res.code !== 200) {
      toast.error(res?.msg || t('error'));
      return;
    }

    setCount((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked(!isLiked);
    toast.success(res?.msg || t('success'));
  };

  return (
    <button type='button' disabled={isLiked} className='relative flex h-6 items-end gap-1' onClick={handleLike}>
      <ThumbsUp className='size-6' />
      <span className='absolute -bottom-1 left-7'>{count}</span>
    </button>
  );
}
