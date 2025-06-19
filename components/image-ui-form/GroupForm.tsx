import type { ComponentProps } from 'react';
import dynamic from 'next/dynamic';

import ImageContenxtProvider, { ImageFormType } from './image-context-provider';
import ImageDisplay from './image-display';
import ImageForm from './image-form';
import ImageHistoryPc from './ImageHistoryPc';

const ImageHistoryMobile = dynamic(() => import('./ImageHistoryMobile'), { ssr: true });

export default function GroupForm({
  submitBtnId,
  formType,
  slotNode,
  slotNodeFunc,
  styleName,
  moreFormSchema,
  defaultValues,
  allowUploadImage,
  showFluxModel,
  formatPrompt,
  showResolution = true,
  showOptimizePromptBtn = true,
  showPromptInput = true,
  slotNodeAfter,
  imageFormLabel,
  slotNodeFuncAfterInput,
  onResetAll,
  redirectToImageToImage = false,
}: {
  submitBtnId: string;
  formType: ImageFormType;
  slotNode?: ComponentProps<typeof ImageForm>['slotNode'];
  slotNodeFunc?: ComponentProps<typeof ImageForm>['slotNodeFunc'];
  styleName?: ComponentProps<typeof ImageForm>['styleName'];
  moreFormSchema?: ComponentProps<typeof ImageForm>['moreFormSchema'];
  defaultValues?: ComponentProps<typeof ImageForm>['defaultValues'];
  allowUploadImage?: ComponentProps<typeof ImageForm>['allowUploadImage'];
  showFluxModel?: ComponentProps<typeof ImageForm>['showFluxModel'];
  formatPrompt?: ComponentProps<typeof ImageForm>['formatPrompt'];
  showResolution?: ComponentProps<typeof ImageForm>['showResolution'];
  showOptimizePromptBtn?: ComponentProps<typeof ImageForm>['showOptimizePromptBtn'];
  showPromptInput?: ComponentProps<typeof ImageForm>['showPromptInput'];
  slotNodeAfter?: ComponentProps<typeof ImageForm>['slotNodeAfter'];
  imageFormLabel?: ComponentProps<typeof ImageForm>['imageFormLabel'];
  slotNodeFuncAfterInput?: ComponentProps<typeof ImageForm>['slotNodeFuncAfterInput'];
  onResetAll?: ComponentProps<typeof ImageForm>['onResetAll'];
  redirectToImageToImage?: boolean;
}) {
  return (
    <div className='flex w-full flex-col gap-5'>
      <ImageContenxtProvider imageFormType={formType}>
        <div className='flex flex-col gap-5 rounded-2xl lg:max-h-[864px] lg:min-h-[752px] lg:flex-row lg:bg-color-5 lg:p-5'>
          <ImageHistoryMobile />
          <ImageForm
            submitBtnId={submitBtnId}
            slotNode={slotNode}
            styleName={styleName}
            moreFormSchema={moreFormSchema}
            defaultValues={defaultValues}
            allowUploadImage={allowUploadImage}
            formatPrompt={formatPrompt}
            showResolution={showResolution}
            showOptimizePromptBtn={showOptimizePromptBtn}
            showPromptInput={showPromptInput}
            showFluxModel={showFluxModel}
            slotNodeFunc={slotNodeFunc}
            slotNodeAfter={slotNodeAfter}
            imageFormLabel={imageFormLabel}
            slotNodeFuncAfterInput={slotNodeFuncAfterInput}
            onResetAll={onResetAll}
          />
          <ImageDisplay redirectToImageToImage={redirectToImageToImage} />
          {/* <ImageDisplay showImageToImage={showImageToImage} /> */}
          <ImageHistoryPc />
        </div>
      </ImageContenxtProvider>
    </div>
  );
}
