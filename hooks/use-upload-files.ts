import { createSignedUrl } from '@/network/image/client';
import useloginExpireDialogStore from '@/store/useloginExpireDialogStore';
import useUserInfoStore from '@/store/useUserInfoStore';

import { FileType } from '@/lib/utils/fileUtils';
import { fetchWithRetry } from '@/lib/utils/promiseUtils';

const useUploadFiles = () => {
  const auth = useUserInfoStore((state) => state.auth);
  const setOpenLoginExpireDialog = useloginExpireDialogStore((state) => state.setOpen);

  const uploadFilesToStorageThroughBackEnd = async (files: FileType[]): Promise<string[]> => {
    if (files.length === 0) {
      return [];
    }
    if (auth && auth.expire_date < Date.now()) {
      setOpenLoginExpireDialog(true);
      throw new Error('401');
    }
    // Get signed URLs
    const signedUrlResult = await createSignedUrl(files.map((file) => file.type));

    if (signedUrlResult.code === 401) {
      setOpenLoginExpireDialog(true);
      throw new Error('401');
    }

    // Upload files
    // const storeResults = await Promise.all(
    await Promise.all(
      signedUrlResult.rows.map((obj, index) => {
        const file = files[index];
        return fetchWithRetry(obj.signedUrl, {
          method: 'PUT',
          body: file.data,
          headers: {
            'Content-Type': file.type,
          },
        });
      }),
    );

    // Generate final URLs
    return signedUrlResult.rows.map((el) => el.url);
    // return storeResults.map(
    //   (item) =>
    //     `https://${process.env.NEXT_PUBLIC_R2_IMAGE_DOMAIN}${item.url.split('r2.cloudflarestorage.com')[1].split('?')[0]}`,
    // );
  };

  return uploadFilesToStorageThroughBackEnd;
};

export default useUploadFiles;
