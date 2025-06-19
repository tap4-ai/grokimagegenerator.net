/* eslint-disable react/jsx-props-no-spreading */
export default function Play(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={45} height={45} fill='none' {...props}>
      <g filter='url(#a)'>
        <circle cx={22.5} cy={22.5} r={22.5} fill='#fff' fillOpacity={0.1} />
        <circle cx={22.5} cy={22.5} r={22} stroke='#fff' strokeOpacity={0.2} />
      </g>
      <path
        fill='#fff'
        fillOpacity={0.79}
        d='M30.921 24.578c1.334-.77 1.334-2.695 0-3.464l-11.998-6.922c-1.333-.77-3 .193-3 1.732v13.844c0 1.54 1.667 2.502 3 1.732l11.998-6.922Z'
      />
      <defs>
        <filter
          id='a'
          width={69}
          height={69}
          x={-12}
          y={-12}
          colorInterpolationFilters='sRGB'
          filterUnits='userSpaceOnUse'
        >
          <feFlood floodOpacity={0} result='BackgroundImageFix' />
          <feGaussianBlur in='BackgroundImageFix' stdDeviation={6} />
          <feComposite in2='SourceAlpha' operator='in' result='effect1_backgroundBlur_419_13195' />
          <feBlend in='SourceGraphic' in2='effect1_backgroundBlur_419_13195' result='shape' />
        </filter>
      </defs>
    </svg>
  );
}
