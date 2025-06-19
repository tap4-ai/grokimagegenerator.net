'use client';

import { useFluxAIImageStoreForGenerator } from '@/store/useFluxAIImageStore';

import ImagePromptGenerator from '@/components/common/image-prompt-generator';
import { FLUX_AI, FLUX_AI_ASPECT_RATIOS } from '@/lib/constants';

interface FluxImagePromptGeneratorWrapperProps {
  className?: string;
  hrefs: { highQuality: string; generate: string };
}

export default function FluxImagePromptGeneratorWrapper({ className, hrefs }: FluxImagePromptGeneratorWrapperProps) {
  const storeOperations = useFluxAIImageStoreForGenerator();

  return (
    <ImagePromptGenerator
      platform={FLUX_AI.platform}
      modelName={FLUX_AI.name}
      aspectRatioOptions={FLUX_AI_ASPECT_RATIOS}
      className={className}
      hrefs={hrefs}
      storeOperations={storeOperations}
    />
  );
}
