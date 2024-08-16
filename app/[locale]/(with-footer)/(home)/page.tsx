/* eslint-disable react/jsx-no-target-blank */

import Faq from '@/components/Faq';
import CoreFeaturesSection from '@/components/home/sections/CoreFeaturesSection';
import OuterLinks from '@/components/home/sections/OuterLinks';
import ToolsSection from '@/components/home/sections/ToolsSection';
import TwitterSction from '@/components/home/sections/TwitterSction';
import VortexSection from '@/components/home/sections/VortexSection';

// const ScrollToTop = dynamic(() => import('@/components/page/ScrollToTop'), { ssr: false });

export default async function Page() {
  return (
    <div className='relative w-full bg-opacity-60 bg-[url("/images/home/home-section.jpg")] bg-contain bg-no-repeat'>
      <div className='mx-auto mt-20 flex w-full flex-1 flex-col gap-16'>
        <VortexSection />
        <ToolsSection />
        <CoreFeaturesSection />
        <TwitterSction />
        <Faq />
        <OuterLinks />
        {/* <ScrollToTop /> */}
      </div>
    </div>
  );
}
