import { formatTime } from '@/lib/utils/timeUtils';
import Box from '@/components/Box';

export default function TimeItem({ time, type }: { time: number; type: React.ReactNode }) {
  return (
    <Box className='flex h-11 items-center justify-between rounded-t-xl bg-dark-gray px-3 text-xs text-white/40'>
      <div>{formatTime(time, 'YYYY-MM-DD')}</div>
      <div>{type}</div>
    </Box>
  );
}
