import Box from '@/components/Box';

import UrlContentItem from './UrlContentItem';

export default function UrlItem({
  dataList,
}: {
  dataList: {
    title: string;
    value: string;
  }[];
}) {
  return (
    <Box className='mt-px flex flex-col items-center gap-2 rounded-b-xl bg-dark-gray lg:flex-row'>
      {dataList.map((item) => (
        <UrlContentItem key={item.title} title={item.title} content={item.value} />
      ))}
    </Box>
  );
}
