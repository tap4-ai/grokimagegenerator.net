export default function ModelsSection({
  title,
  description,
  models,
}: {
  title: string;
  description: string;
  models: {
    title: string;
    description: string;
  }[];
}) {
  return (
    <div className='container-centered container-py'>
      <h2 className='mb-1 text-center text-[32px] leading-[36px] font-semibold text-white capitalize lg:text-[48px] lg:leading-[54px] lg:tracking-[0.04em]'>
        {title}
      </h2>
      <p className='mb-8 text-center text-base leading-6 font-normal tracking-[0.04em] text-[#fff] capitalize lg:text-base lg:leading-6 lg:tracking-[0.04em] lg:capitalize'>
        {description}
      </p>
      <div className='grid grid-cols-1 gap-5 rounded-[36px] bg-[#202020] p-10 md:grid-cols-2'>
        {models.map((model) => (
          <div
            className='flex min-h-[240px] flex-col justify-between rounded-[12px] bg-[#2c2c2c] p-8'
            key={model.title}
          >
            <p className='text-sm font-normal text-[#b8b8b8] capitalize'>{model.description}</p>
            <p className='w-fit rounded-[4px] bg-[#202020] p-[12px_20px] text-[18px] leading-[27px] font-normal tracking-[0.02em] text-white capitalize'>
              {model.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
