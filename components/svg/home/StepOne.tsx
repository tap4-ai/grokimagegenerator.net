/* eslint-disable react/jsx-props-no-spreading */
export default function StepOne(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={88} height={197} fill='none' {...props}>
      <path fill='url(#a)' fillOpacity={0.2} d='M88 0v212H50.143V44.868L0 61.712V30.638L83.714 0H88Z' />
      <defs>
        <linearGradient id='a' x1={44} x2={44} y1={0} y2={212} gradientUnits='userSpaceOnUse'>
          <stop stopColor='#fff' />
          <stop offset={0.938} stopColor='#141516' />
        </linearGradient>
      </defs>
    </svg>
  );
}
