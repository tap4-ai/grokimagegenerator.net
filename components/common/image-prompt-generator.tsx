'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { getImage } from '@/network/generation/client';
import { generateImage } from '@/network/generation/genImage';
import useDefaultModalStore from '@/store/useDefaultModalStore';
import type { FluxAIImageStoreForGenerator } from '@/store/useFluxAIImageStore';
import type { JanusProImageStoreForGenerator } from '@/store/useJanusProImageStore';
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';
import { Crown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
// import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';

const getAspectRatioDimensions = (ratio: { width: number; height: number }) => {
  const baseWidth = 1024;
  const height = Math.round((baseWidth * ratio.height) / ratio.width);
  return `${baseWidth}x${height}`;
};

type StoreOperations = (JanusProImageStoreForGenerator | FluxAIImageStoreForGenerator) & {
  storeName: string;
};

export default function ImagePromptGenerator({
  hrefs,
  className,
  storeOperations,
  aspectRatioOptions,
  platform,
  modelName,
}: {
  hrefs: { highQuality: string; generate: string };
  className?: string;
  storeOperations: StoreOperations;
  aspectRatioOptions: { value: string; iconWidth: string; iconHeight: string }[];
  platform: number;
  modelName: string;
}) {
  const { prompt: defaultPrompt } = useDefaultModalStore();
  const { prompt, aspectRatio, setPrompt, setAspectRatio, addHistory, updateHistory, history, storeName } =
    storeOperations;
  useEffect(() => {
    if (defaultPrompt) {
      setPrompt(defaultPrompt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultPrompt]);
  const isGenerating = history.some((item) => item.status === 'await');
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const turnstileTokenRef = useRef<string | null>(null);
  const [showTurnstile, setShowTurnstile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const generateBtnRef = useRef<HTMLButtonElement>(null);
  const t = useTranslations('components.image-form');
  const aspectRatioValue = `${aspectRatio.width}:${aspectRatio.height}`;
  const selectedAspectRatio = aspectRatioOptions.find((r) => r.value === aspectRatioValue);
  // Calculate dimensions for 16:9 at 1024 width as base

  const pollImageStatus = useCallback(
    async (key: string) => {
      let attempts = 0;
      const maxAttempts = 60;

      // 智能间隔策略：开始快速轮询，逐渐增加间隔
      const getPollingInterval = (attemptCount: number) => {
        if (attemptCount <= 5) return 2000; // 前5次：2秒
        if (attemptCount <= 15) return 5000; // 6-15次：5秒
        return 8000; // 16次以上：8秒
      };

      const poll = async () => {
        if (attempts >= maxAttempts) {
          return;
        }

        try {
          const result = await getImage(key);
          const { data } = result;
          console.log(result, 'get Image result');
          if (data.imageResponseVo?.url) {
            updateHistory(key, {
              imageUrl: data.imageResponseVo.url,
              status: data.status,
            });
            return;
          }
          if (data.status === 'failed') {
            updateHistory(key, {
              status: data.status,
            });
            return;
          }
          attempts += 1;
          // 使用智能间隔继续轮询
          const interval = getPollingInterval(attempts);
          setTimeout(poll, interval);
        } catch (error) {
          console.error('轮询错误:', error);
          // 出错时稍微延长间隔再重试
          attempts += 1;
          setTimeout(poll, 3000);
        }
      };

      poll();
    },
    [updateHistory],
  );

  const handleGenerate = async () => {
    const token = turnstileTokenRef.current;
    if (isGenerating) {
      toast.error(t('generate-wait'));
      return;
    }

    if (!token) {
      setShowTurnstile(true);
      turnstileRef.current?.execute();
      return;
    }

    try {
      setIsSubmitting(true);
      const browserFingerprint = await import('@thumbmarkjs/thumbmarkjs');
      browserFingerprint.setOption('logging', false);

      const fingerprint = await browserFingerprint.getFingerprint();

      const result = await generateImage({
        ...aspectRatio,
        prompt,
        browserFingerprint: fingerprint,
        turnstileToken: token,
        platform,
        modelName,
      });

      console.log(result);

      if (result) {
        setPrompt('');
        addHistory({
          prompt,
          aspectRatio,
          key: result.key,
          status: result.status,
          createTimestamp: Date.now(),
        });
        setTimeout(() => {
          const hamsterLoading = document.getElementById('hamster-loading-for-scroll');
          if (hamsterLoading) {
            hamsterLoading.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 50);
        pollImageStatus(result.key);
        toast.success(t('generate-success'));
      } else {
        toast.error(t('generate-error'));
      }
    } catch (error) {
      console.error('generate image error:', error);
      toast.error(t('generate-error'));
    } finally {
      setIsSubmitting(false);
      turnstileTokenRef.current = null;
      turnstileRef.current?.reset();
    }
  };

  const handleTurnstileSuccess = (token: string) => {
    turnstileTokenRef.current = token;
    setTimeout(() => {
      setShowTurnstile(false);
      generateBtnRef.current?.click();
    }, 800);
  };

  const handleTurnstileError = (error?: string) => {
    console.error('Turnstile verification error:', error);
    turnstileTokenRef.current = null;
  };

  useEffect(() => {
    const str = window.localStorage.getItem(storeName);
    let data: { state: any } | null = null;
    try {
      data = JSON.parse(str!);
    } catch (error) {
      console.error('parse state error:', error);
    }
    if (data) {
      data.state.history?.forEach((item: any) => {
        if (item.status === 'await') {
          pollImageStatus(item.key);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={cn('container-centered', className)}>
        <div className='space-y-[26px] rounded-xl bg-[#202020] p-[18px]'>
          {/* Prompt Section */}
          <div className='focus-within:ring-ring/50 rounded-lg bg-[#2c2c2c] p-3 shadow-xs transition-[box-shadow] focus-within:ring-[3px]'>
            <div className='space-y-1'>
              {/* <Label
                htmlFor='prompt'
                className='block text-sm font-normal tracking-[0.36px] text-[#b8b8b8] md:text-base'
              >
                {t('input-label')}
              </Label> */}
              <textarea
                id='prompt'
                placeholder={t('input-label')}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className='field-sizing-content h-[200px] w-full resize-none border-none bg-transparent p-0 font-sans text-base font-normal text-[#b8b8b8] placeholder:text-base placeholder:font-normal placeholder:text-[#b8b8b8] focus:ring-0 focus:outline-none md:h-[280px] md:text-xl md:placeholder:text-xl'
              />
            </div>
          </div>

          {/* Bottom Controls */}
          <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
            {/* Aspect Ratio Selector */}
            <div className='w-full md:w-[325px]'>
              <Select
                value={aspectRatioValue}
                onValueChange={(value) => {
                  const [width, height] = value.split(':').map(Number);
                  setAspectRatio({ width, height });
                }}
              >
                <SelectTrigger className='h-12 w-full rounded-lg border border-white/10 bg-[#434343] px-2 py-1 text-white select-none focus:ring-0 focus:outline-none'>
                  <div className='flex w-full items-center gap-1.5'>
                    <div
                      className='flex-shrink-0 rounded-[2px] bg-white/70'
                      style={{
                        width: selectedAspectRatio?.iconWidth,
                        height: selectedAspectRatio?.iconHeight,
                      }}
                    />
                    <span className='text-[14px] leading-[21px] font-normal tracking-[0.56px] text-white/70'>
                      {aspectRatioValue}
                    </span>
                    <span className='text-[14px] leading-[21px] font-normal tracking-[0.56px] text-white/40'>
                      _ {getAspectRatioDimensions(aspectRatio)}
                    </span>
                  </div>
                </SelectTrigger>
                <SelectContent className='border-white/10 bg-[#434343] text-white'>
                  {aspectRatioOptions.map((ratio) => {
                    const [width, height] = ratio.value.split(':').map(Number);
                    const dimensions = getAspectRatioDimensions({ width, height });
                    return (
                      <SelectItem
                        key={ratio.value}
                        value={ratio.value}
                        className='text-white hover:bg-white/10 focus:bg-white/10'
                      >
                        <div className='flex items-center gap-1'>
                          <div
                            className='flex-shrink-0 rounded-[2px] bg-white/70'
                            style={{
                              width: ratio.iconWidth,
                              height: ratio.iconHeight,
                            }}
                          />
                          <span className='text-[14px] leading-[21px] font-normal tracking-[0.56px] text-white/70'>
                            {ratio.value}
                          </span>
                          <span className='text-[14px] leading-[21px] font-normal tracking-[0.56px] text-white/40'>
                            _ {dimensions}
                          </span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col gap-3 md:flex-row md:items-center md:gap-3'>
              {/* Higher Quality Button */}
              <Link
                href={hrefs.highQuality}
                rel='nofollow'
                className='order-2 flex items-center gap-3 text-white transition-colors hover:text-white/80 md:order-1'
              >
                <Crown className='size-8 shrink-0' />
                <span className='text-[16px] leading-[24px] font-semibold underline'>
                  {t('high-quality-generation')}
                </span>
              </Link>

              {/* Generate Button */}
              <Button
                ref={generateBtnRef}
                onClick={handleGenerate}
                disabled={!prompt.trim() || isSubmitting}
                className='order-1 h-12 cursor-pointer rounded-lg bg-[#1677ff] px-8 py-3 text-[16px] leading-[24px] font-semibold text-white hover:bg-[#1677ff]/90 disabled:cursor-not-allowed disabled:opacity-50 md:order-2'
              >
                {t('generate')}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Turnstile 验证 */}
      <div
        className={cn(
          'fixed inset-0 z-999 flex items-center justify-center bg-black/50',
          showTurnstile ? 'flex' : 'hidden',
        )}
      >
        <Turnstile
          ref={turnstileRef}
          onBeforeInteractive={() => {
            console.log('onBeforeInteractive');
            turnstileTokenRef.current = null;
          }}
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
          onSuccess={handleTurnstileSuccess}
          onError={handleTurnstileError}
          onExpire={handleTurnstileError}
          options={{
            theme: 'dark',
            size: 'normal',
            execution: 'execute',
          }}
          scriptOptions={{
            defer: true,
          }}
        />
      </div>
    </>
  );
}
