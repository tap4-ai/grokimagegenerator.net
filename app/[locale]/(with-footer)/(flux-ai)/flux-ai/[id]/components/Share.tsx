'use client';

import { usePathname } from 'next/navigation';
import useGlobalLoginStore from '@/store/useGlobalLoginStore';
import useLocalRedirectUrlStore from '@/store/useLocalRedirectUrlStore';
// import useLoginDialogStore from '@/store/useLoginDialogStore';
import useUserInfoStore from '@/store/useUserInfoStore';
import { Download, Facebook, Twitter } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FacebookShareButton, TwitterShareButton } from 'react-share';

import { downloadFile } from '@/lib/utils/fileUtils';
import { Separator } from '@/components/ui/separator';
import CopyBtn from '@/components/CopyBtn';

function Span({ children }: { children: React.ReactNode }) {
  return <span className='flex flex-col items-center gap-1 hover:opacity-70'>{children}</span>;
}

function Text({ children }: { children: React.ReactNode }) {
  return <span className='text-xs font-normal capitalize'>{children}</span>;
}

export default function Share({
  shareUrl,
  downloadUrl,
  imageName,
}: {
  shareUrl: string;
  downloadUrl: string;
  imageName: string;
}) {
  const t = useTranslations('Common.share');
  const pathname = usePathname();

  const userInfo = useUserInfoStore((state) => state.userInfo);
  const setLocalRedirectUrl = useLocalRedirectUrlStore((state) => state.setLocalRedirectUrl);
  // const updateLoginDialog = useLoginDialogStore((state) => state.updateStore);
  const openLoginDialog = useGlobalLoginStore((state) => state.setOpen);

  const onDownload = () => {
    if (!userInfo) {
      // updateLoginDialog({ open: true, cbUrl: pathname });
      openLoginDialog(true);
      setLocalRedirectUrl(pathname);
      return;
    }
    downloadFile(downloadUrl, imageName);
  };

  return (
    <div className='flex flex-col items-center gap-2.5 rounded-lg border-[0.5px] border-white/70 px-9 py-4 text-white/70'>
      <div className='flex gap-11'>
        <button type='button' onClick={onDownload}>
          <Span>
            <Download />
            <Text>{t('download')}</Text>
          </Span>
        </button>
        <TwitterShareButton url={shareUrl}>
          <Span>
            <Twitter />
            <Text>{t('twitter')}</Text>
          </Span>
        </TwitterShareButton>
        <FacebookShareButton url={shareUrl}>
          <Span>
            <Facebook />
            <Text>{t('facebook')}</Text>
          </Span>
        </FacebookShareButton>
      </div>
      <div className='flex items-center gap-[10px]'>
        <Separator className='w-10 bg-white/70' />
        <p className='text-[13px] font-normal capitalize'>{t('linkSharing')}</p>
        <Separator className='w-10 bg-white/70' />
      </div>
      <div className='relative w-full'>
        <input
          type='text'
          disabled
          defaultValue={shareUrl}
          className='w-full overflow-hidden rounded border border-main-gray bg-transparent px-5 py-3 pe-10 shadow-sm sm:text-sm'
        />
        <span className='absolute inset-y-0 end-0 grid w-10 place-content-center'>
          <CopyBtn content={shareUrl} />
        </span>
      </div>
    </div>
  );
}
