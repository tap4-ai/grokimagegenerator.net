export default function LabelSection({ title, content }: { title: string; content: string }) {
  return (
    <div className='flex w-full flex-col items-center gap-3 rounded-xl border border-main-gray p-3 text-center lg:p-10'>
      <h2 className='text-xl font-semibold lg:text-32'>{title}</h2>
      <p className='text-xs text-white/70 lg:text-lg'>{content}</p>
    </div>
  );
}
