export default function Heading({ title, description }: { title: string; description: string }) {
  return (
    <div className='mx-auto flex max-w-5xl flex-col items-center gap-2 text-balance text-center'>
      <h1 className='text-4xl font-semibold text-color-main lg:text-5xl'>{title}</h1>
      <h2 className='text-sm lg:text-lg'>{description}</h2>
    </div>
  );
}
