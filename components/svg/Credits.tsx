/* eslint-disable react/jsx-props-no-spreading */
export default function Credits(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={16} height={16} viewBox='0 0 16 16' fill='none' {...props}>
      <circle cx={8} cy={8} r={8} fill='#417CF1' />
      <g filter='url(#filter0_i_79_1281)'>
        <circle cx={8} cy={8} r={6} fill='#417CF1' />
      </g>
      <defs>
        <filter
          id='filter0_i_79_1281'
          x={2}
          y={2}
          width={12}
          height={12}
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity={0} result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feMorphology radius={0.1} operator='erode' in='SourceAlpha' result='effect1_innerShadow_79_1281' />
          <feOffset />
          <feGaussianBlur stdDeviation={0.7} />
          <feComposite in2='hardAlpha' operator='arithmetic' k2={-1} k3={1} />
          <feColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0' />
          <feBlend mode='normal' in2='shape' result='effect1_innerShadow_79_1281' />
        </filter>
      </defs>
    </svg>
  );
}
