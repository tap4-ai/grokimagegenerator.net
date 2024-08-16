/* eslint-disable react/jsx-props-no-spreading */
export default function Credits(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={16} height={16} fill='none' {...props}>
      <circle cx={8} cy={8} r={8} fill='url(#a)' />
      <g filter='url(#b)'>
        <circle cx={8} cy={8} r={6} fill='url(#c)' />
      </g>
      <defs>
        <linearGradient id='a' x1={22.4} x2={-8} y1={1.6} y2={17.6} gradientUnits='userSpaceOnUse'>
          <stop stopColor='#4EE794' />
          <stop offset={0.455} stopColor='#fff' />
          <stop offset={1} stopColor='#F32FF7' />
        </linearGradient>
        <linearGradient id='c' x1={18.8} x2={-4} y1={3.2} y2={15.2} gradientUnits='userSpaceOnUse'>
          <stop stopColor='#4EE794' />
          <stop offset={0.455} stopColor='#fff' />
          <stop offset={1} stopColor='#F32FF7' />
        </linearGradient>
        <filter id='b' width={12} height={12} x={2} y={2} colorInterpolationFilters='sRGB' filterUnits='userSpaceOnUse'>
          <feFlood floodOpacity={0} result='BackgroundImageFix' />
          <feBlend in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feColorMatrix in='SourceAlpha' result='hardAlpha' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' />
          <feMorphology in='SourceAlpha' radius={0.1} result='effect1_innerShadow_257_10552' />
          <feOffset />
          <feGaussianBlur stdDeviation={0.7} />
          <feComposite in2='hardAlpha' k2={-1} k3={1} operator='arithmetic' />
          <feColorMatrix values='0 0 0 0 0.394148 0 0 0 0 0.698665 0 0 0 0 0.561632 0 0 0 1 0' />
          <feBlend in2='shape' result='effect1_innerShadow_257_10552' />
        </filter>
      </defs>
    </svg>
  );
}
