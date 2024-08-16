export default function LoadingList() {
  const list = Array.from({ length: 24 }, (_, idx) => idx);

  return (
    <ul className='mx-auto grid w-full max-w-pc animate-pulse grid-cols-2 gap-3 px-3 lg:grid-cols-6 lg:gap-5 lg:px-0'>
      {list.map((item) => (
        <li key={item} className='h-80 w-full rounded-lg bg-main-gray' />
      ))}
    </ul>
  );
}
