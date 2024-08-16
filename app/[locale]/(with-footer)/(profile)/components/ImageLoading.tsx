export default function ImageLoading() {
  const list = Array.from({ length: 12 }, (_, idx) => idx);

  return (
    <div className='flex h-full animate-pulse flex-col items-center justify-between gap-3 px-3 lg:px-0'>
      <div className='grid w-full grid-cols-2 gap-3 lg:grid-cols-6'>
        {list.map((num) => (
          <div key={num} className='h-52 rounded-lg bg-main-gray lg:h-72' />
        ))}
      </div>
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
