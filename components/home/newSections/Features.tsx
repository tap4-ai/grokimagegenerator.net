export default function Features({
  title,
  description,
  features,
}: {
  title: string;
  description?: string;
  features: {
    title: string;
    description: string;
  }[];
}) {
  return (
    <div className='container-centered container-py'>
      <div className='mb-8 space-y-1'>
        <h2 className='text-center text-[32px] leading-[36px] font-semibold tracking-[0.06em] text-white capitalize lg:text-[48px] lg:leading-[54px] lg:tracking-[0.04em]'>
          {title}
        </h2>
        {description && (
          <p className='text-center text-base leading-6 font-normal tracking-[0.04em] text-[#B8B8B8] capitalize lg:text-base lg:leading-6 lg:tracking-[0.04em] lg:capitalize'>
            {description}
          </p>
        )}
      </div>
      <div className='grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-8'>
        {features.map((feature) => (
          <div className='rounded-[12px] bg-[#202020] p-8' key={feature.title}>
            <p className='text-[20px] leading-[28px] font-semibold tracking-[0.06em] text-white capitalize lg:text-[24px] lg:leading-[36px]'>
              {feature.title}
            </p>
            <p className='text-[14px] leading-[21px] font-normal tracking-[0.02em] text-white/70 capitalize lg:text-[14px] lg:leading-[21px]'>
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
