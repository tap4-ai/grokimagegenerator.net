import LoadingBar from './LoadingBar';

export default function LoadingList({ num, className }: { num: number; className?: string }) {
  const arr = Array.from({ length: num }, (_, idx) => idx);

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center justify-between'>
        <div className='h-9 w-[80px] rounded bg-main-gray' />
        <div className='h-9 w-[232px] rounded-full bg-main-gray' />
      </div>
      <ul className='flex animate-pulse flex-col gap-2'>
        {arr.map((id) => (
          <LoadingBar key={id} className={className} />
        ))}
      </ul>
      <div className='mx-auto flex items-center gap-3'>
        <div className='size-8 rounded-lg bg-main-gray' />
        <div className='size-8 rounded-lg bg-main-gray' />
        <div className='size-8 rounded-lg bg-main-gray' />
        <div className='size-8 rounded-lg bg-main-gray' />
        <div className='size-8 rounded-lg bg-main-gray' />
      </div>
    </div>
  );
}
