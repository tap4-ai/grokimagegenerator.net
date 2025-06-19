import useSWR, { mutate } from 'swr';

import { removeEmptyProperties } from '@/lib/utils/objectUtils';
import { ImageFormType } from '@/components/image-ui-form/image-context-provider';

import { fetcher } from '../clientFetch';
import { ImageResponseVo } from '../generation/client';
import { ResponseRows } from '../type';

const imageHistoryKey = '/image/myList';

export type FilterType = ImageFormType | 'not-flux';

function getModelNameList(filter?: FilterType): string[] | null {
  switch (filter) {
    case 'not-flux':
      return [];

    default:
      return null;
  }
}

const useUserImageHistory = (pageNum: number, pageSize: number, filter?: FilterType) => {
  const { data, ...rest } = useSWR<ResponseRows<ImageResponseVo[]>>(
    [imageHistoryKey, removeEmptyProperties({ pageNum, pageSize, modelNameList: getModelNameList(filter) })],
    fetcher,
  );

  return { data: data?.rows, total: data?.total, ...rest };
};

export const refreshImageHistory = () => {
  mutate((key) => Array.isArray(key) && key[0]?.startsWith(imageHistoryKey), undefined, {
    revalidate: true,
  });
};

export default useUserImageHistory;
