'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AsyncGenerationImageResult, generateImageAsyncApi, getResult, ImageResponseVo } from '@/network/generation';
import { ResponseData } from '@/network/serverFetch';
import useDefaultModalStore from '@/store/useDefaultModalStore';
import useGlobalLoginStore from '@/store/useGlobalLoginStore';
import useInsufficientCreditsDialogStore from '@/store/useInsufficientCreditsDialogStore';
import useloginExpireDialogStore from '@/store/useloginExpireDialogStore';
import usePricingDialogStore from '@/store/usePricingDialogStore';
import useUserInfoStore from '@/store/useUserInfoStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { IMAGE_RESOLUTION_LIST, IMAGE_STYLE_LIST, TATTOO_MODAL } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { showConfettiFireworks } from '@/lib/utils/uiUtils';
import useUpdateUserInfo from '@/hooks/useUpdateUserInfo';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import AgSwitch from '@/components/AgSwitch';
import Spinning from '@/components/Spinning';
import Credits from '@/components/svg/Credits';

import FormRadioGroup from './FormRadioGroup';
import TextIcon from './TextIcon';

function SubmitBtn({
  className,
  disabled,
  // credit,
  loading,
  label,
  credit,
}: {
  className: string;
  disabled: boolean;
  // credit: number;
  loading?: boolean;
  label: string;
  credit: number;
}) {
  return (
    <button
      type='submit'
      disabled={disabled}
      className={cn(
        'group flex h-10 cursor-pointer items-center justify-center gap-1 rounded-lg bg-gradient-main text-sm font-bold text-black hover:opacity-80',
        disabled && 'cursor-not-allowed',
        className,
      )}
    >
      {loading ? (
        <Spinning className='size-5' />
      ) : (
        <>
          {label}
          <Credits />
          {credit}
        </>
      )}
    </button>
  );
}

// 轮询结果，返回非等待状态，可能是success，也可能是failed
export const pollResult = async (
  id: string,
  authorization: string,
  time: number = 1000,
  timeOut: number = 120 * 1000,
): Promise<ResponseData<AsyncGenerationImageResult>> => {
  // TODO 还可以用race优化
  let times = Math.floor(timeOut / time);
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (times === 0) {
        reject(new Error('timeOut'));
        return;
      }
      times -= 1;
      getResult(id, authorization).then((res) => {
        if (res.code === 200) {
          if (['failed', 'success'].includes(res.data?.status as string)) {
            // 查到结果
            clearInterval(interval);
            resolve(res);
          }
        }
        // TODO其它状态码处理
      });
    }, time); // 每秒轮询一次接口B
  });
};

const BaseFormSchema = z.object({
  prompt: z.string(),
  isPublic: z.boolean().optional(),
  isEnhancePrompt: z.boolean().optional(),
  resolution: z.string(),
  style: z.string(),
});

export default function GenerateForm({
  formType,
  styleName,
  showEnhanceBtn = false,
  slotNode,
  defaultValues,
  moreFormSchema,
  formatPrompt,
}: {
  formType: 'text2image' | 'medal' | 'anime';
  styleName: string;
  showEnhanceBtn?: boolean;
  formatPrompt?: (val: string, keywords: string[]) => string;
  slotNode?: React.ReactNode;
  defaultValues?: object;
  moreFormSchema?: z.ZodObject<any>;
}) {
  const t = useTranslations('flux-ai.form');
  const router = useRouter();
  const CompoundFormSchema = moreFormSchema ? BaseFormSchema.merge(moreFormSchema) : BaseFormSchema;

  const auth = useUserInfoStore((state) => state.auth);
  const userInfo = useUserInfoStore((state) => state.userInfo);

  // const updateLoginDialogStore = useLoginDialogStore((state) => state.updateStore);
  const openLoginDialog = useGlobalLoginStore((state) => state.setOpen);
  const setOpenPricingDialogStore = usePricingDialogStore((state) => state.setOpen);

  const defaultPrompt = useDefaultModalStore((state) => state.prompt);
  const defaultStyle = useDefaultModalStore((state) => state.style);
  const setOpenInsufficientCreditsDialog = useInsufficientCreditsDialogStore((state) => state.setOpen);
  const setOpenLoginExpireDialog = useloginExpireDialogStore((state) => state.setOpen);
  const { updateUserInfo } = useUpdateUserInfo();

  const isPaidUser = !!userInfo?.isValidity;

  const [isGenerating, setIsGenerating] = useState(false);
  const [genImage, setGenImage] = useState<ImageResponseVo>();
  // const [openImageDialog, setOpenImageDialog] = useState(false);

  const form = useForm<z.infer<typeof CompoundFormSchema>>({
    resolver: zodResolver(CompoundFormSchema),
    defaultValues: {
      prompt: defaultPrompt || '',
      isPublic: true,
      isEnhancePrompt: false,
      resolution: IMAGE_RESOLUTION_LIST[0].value,
      style: defaultStyle || IMAGE_STYLE_LIST[0].value,
      ...defaultValues,
    },
  });

  const watchStyle = form.watch('style') as string;
  const selctedStyle = IMAGE_STYLE_LIST.find((item) => item.value === watchStyle)!;

  const onClickImage = () => {
    router.push(`/flux-ai/${genImage?.id}`);
  };

  const onPublicChange = (showPublic: boolean) => {
    if (!userInfo) {
      // updateLoginDialogStore({ open: true, cbUrl: '/' });
      openLoginDialog(true);
      return;
    }

    if (!isPaidUser) {
      setOpenPricingDialogStore(true);
      return;
    }
    form.setValue('isPublic', showPublic);
  };

  const onStyleChange = (value: string) => {
    if (value === IMAGE_STYLE_LIST[0].value) {
      form.setValue('style', value);
      return;
    }

    if (!userInfo) {
      openLoginDialog(true);
      return;
    }

    if (!isPaidUser) {
      setOpenPricingDialogStore(true);
      return;
    }

    form.setValue('style', value);
  };

  const onSubmit = async (formData: z.infer<typeof CompoundFormSchema>) => {
    if (!userInfo) {
      // updateLoginDialogStore({ open: true, cbUrl: '/' });
      openLoginDialog(true);
      return;
    }

    if (!formData.prompt) {
      toast.error(t('noPromptInput'));
      return;
    }

    if (auth && auth.expire_date < new Date().getTime()) {
      setOpenLoginExpireDialog(true);
      return;
    }

    const selectedModal = IMAGE_STYLE_LIST.find((item) => item.value === formData.style);

    if (selectedModal && userInfo.credits < selectedModal?.credit) {
      setOpenPricingDialogStore(true);
      return;
    }

    try {
      const [width, height] = formData.resolution.split(':');
      let prompt = formData.prompt as string;

      if (formatPrompt) {
        if (formType === 'medal') {
          // @ts-ignore
          prompt = formatPrompt(prompt, [formData.shape, formData.material]);
        }
        if (formType === 'anime') {
          // @ts-ignore
          prompt = formatPrompt(prompt, [formData.animeType]);
        }
      }

      setIsGenerating(true);
      const res = await generateImageAsyncApi({
        prompt,
        outputPrompt: formData.prompt,
        aiEnhance: formData.isEnhancePrompt,
        platformType: 25,
        modelName: formData.style,
        width,
        height,
        // site: '',
        styleName,
        isPublic: formData.isPublic ? 1 : 0,
        authorization: auth!.access_token,
      } as any);

      const { code, msg, data } = res;

      if (code !== 200 || data?.status === 'failed' || !data?.key) {
        throw new Error(msg);
      }

      if (res?.code === 401) {
        setOpenLoginExpireDialog(true);
        return;
      }

      // (2) poll to check the image is generated or not
      const pollRes = await pollResult(data?.key, auth!.access_token);
      const { code: pollCode, msg: pollMsg, data: pollResultData } = pollRes;

      if (pollCode !== 200 || pollResultData?.status === 'failed' || !pollResultData?.imageResponseVo) {
        throw new Error(pollMsg);
      }

      setGenImage(pollResultData.imageResponseVo);
      showConfettiFireworks(3000);
      toast.success(pollMsg);

      const latestUserInfo = await updateUserInfo();
      if (latestUserInfo && latestUserInfo.credits < TATTOO_MODAL.credit) {
        setOpenInsufficientCreditsDialog(true);
      }
    } catch (error) {
      toast.error(error as string);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex min-h-[544px] w-full flex-col gap-x-5 space-y-0 rounded-[16px] bg-card-black p-3 lg:min-h-[317px] lg:p-5'
        >
          <div className='flex flex-1 flex-col gap-5 lg:flex-row'>
            <div className='flex flex-1 flex-col gap-5'>
              <FormField
                control={form.control}
                name='prompt'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel htmlFor={field.name} className='relative items-center p-0'>
                      <Textarea
                        onChange={field.onChange}
                        value={field.value}
                        placeholder={t('promptPlaceholder')}
                        className='h-[93px] resize-none rounded-xl border border-main-gray bg-black p-2 text-xs text-white/70 lg:min-h-full lg:p-3 lg:text-base'
                      />
                      <FormMessage />
                    </FormLabel>
                  </FormItem>
                )}
              />
              <div className={cn('flex flex-col gap-5', !showEnhanceBtn && 'gap-0', !!slotNode && 'gap-5')}>
                <div className='flex w-full flex-col gap-5 lg:flex-row lg:items-center lg:gap-3'>
                  {showEnhanceBtn && (
                    <FormItem>
                      <FormField
                        control={form.control}
                        name='isEnhancePrompt'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className='flex h-[38px] w-full cursor-pointer items-center justify-center space-y-0 rounded-lg border border-main-gray bg-black px-3 lg:w-fit'>
                              <div className='text-gradient-main flex items-center justify-center gap-1'>
                                <FormControl>
                                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                {t('optimizePrompt')}
                              </div>
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    </FormItem>
                  )}
                  <div className='flex flex-col-reverse gap-5 lg:hidden'>
                    <SubmitBtn
                      className='uppercase'
                      label={t('generate')}
                      disabled={isGenerating}
                      credit={selctedStyle.credit}
                    />
                    <FormField
                      control={form.control}
                      name='isPublic'
                      render={({ field }) => (
                        <FormItem className='mx-auto flex items-center gap-1 space-y-0 hover:cursor-pointer hover:opacity-80'>
                          <AgSwitch onCheckedChange={onPublicChange} checked={field.value} />
                          <FormLabel
                            htmlFor={field.name}
                            className={cn('text-[#889799] hover:cursor-pointer', field.value && 'text-white')}
                          >
                            {t('public')}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                  <Separator
                    className={cn('hidden h-5 w-px bg-main-gray last:hidden lg:block', !showEnhanceBtn && 'lg:hidden')}
                    orientation='vertical'
                  />
                  {slotNode}
                </div>
                <div className='w-full flex-col gap-5 lg:flex lg:flex-row lg:items-center lg:gap-3'>
                  <div className='flex flex-col lg:flex-row lg:items-center lg:gap-3'>
                    <TextIcon title={t('resolution')} />
                    <FormRadioGroup
                      name='resolution'
                      options={IMAGE_RESOLUTION_LIST.map((item) => ({
                        ...item,
                        icon: (
                          <div
                            style={{
                              width: item.iconWidth,
                              height: item.iconHeight,
                            }}
                            className='rounded-[2px] bg-white/70'
                          />
                        ),
                      }))}
                    />
                  </div>
                  <Separator className='hidden h-5 w-px bg-main-gray lg:block' orientation='vertical' />
                  <div className='flex flex-col lg:flex-row lg:items-center lg:gap-3'>
                    <TextIcon title={t('style')} />
                    <FormRadioGroup name='style' options={IMAGE_STYLE_LIST} onChange={onStyleChange} />
                  </div>
                </div>
              </div>
            </div>
            <div className='flex w-full flex-col gap-5 lg:w-[197px] lg:gap-3'>
              <div className='hidden flex-col gap-5 lg:flex'>
                <SubmitBtn
                  className='uppercase'
                  label={t('generate')}
                  disabled={isGenerating}
                  credit={selctedStyle.credit}
                />
                <FormField
                  control={form.control}
                  name='isPublic'
                  render={({ field }) => (
                    <FormItem className='mx-auto flex items-center gap-1 space-y-0 hover:cursor-pointer hover:opacity-80'>
                      <AgSwitch onCheckedChange={onPublicChange} checked={field.value} />
                      <FormLabel
                        htmlFor={field.name}
                        className={cn('text-[#889799] hover:cursor-pointer', field.value && 'text-white')}
                      >
                        {t('public')}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
              <div
                className={cn(
                  'relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-main-gray bg-black',
                )}
              >
                {!isGenerating && !genImage && <div className='text-xs text-white/40'>{t('imageHere')}</div>}
                {isGenerating && <Spinning />}
                {!isGenerating && genImage && (
                  <button type='button' onClick={onClickImage} className='group relative'>
                    <div className='absolute inset-0 z-10 hidden items-center justify-center gap-1 bg-black bg-opacity-50 text-xl text-white transition-all duration-200 group-hover:flex'>
                      {t('checkDetail')} <CircleArrowRight className='size-5' />
                    </div>
                    <img
                      className='aspect-square overflow-hidden object-contain'
                      src={genImage?.url as string}
                      title={genImage?.title}
                      alt={genImage?.title as string}
                    />
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </Form>
      {/* {genImage && (
        <ImageDialog
          open={openImageDialog}
          setOpen={setOpenImageDialog}
          onClick={onClickImage}
          src={genImage?.url as string}
          title={genImage?.title as string}
        />
      )} */}
    </>
  );
}
