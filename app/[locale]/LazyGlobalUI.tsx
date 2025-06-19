'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// const GlobalLoginDialog = dynamic(() => import('@/components/auth/GlobalLoginDialog'), { ssr: false });
// const LogoutDialog = dynamic(() => import('@/components/dialog/LogoutDialog'), { ssr: false });
// const LoginExpireDialog = dynamic(() => import('@/components/dialog/LoginExpireDialog'), { ssr: false });
// const InsufficientCreditsDialog = dynamic(() => import('@/components/dialog/InsufficientCreditsDialog'), {
//   ssr: false,
// });
const TopLoadingBar = dynamic(() => import('@/components/top-loading-bar'), { ssr: false });
const CookieConsentDialog = dynamic(() => import('@/components/dialog/CookieConsentDialog'), { ssr: false });

export default function LazyGlobalUI() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <>
      {/* <GlobalLoginDialog />
      <LoginExpireDialog />
      <LogoutDialog /> */}
      {/* <InsufficientCreditsDialog /> */}
      <CookieConsentDialog />
      <TopLoadingBar />
    </>
  );
}
