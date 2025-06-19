/* eslint-disable react/jsx-props-no-spreading */
export default function EllipseB(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={420} height={75} viewBox='0 0 420 75' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <g filter='url(#filter0_f_1243_16845)'>
        <ellipse cx={210.5} cy={124} rx={258.5} ry={84} fill='currentColor' fillOpacity={0.7} />
      </g>
      <defs>
        <filter
          id='filter0_f_1243_16845'
          x={-88}
          y={0}
          width={597}
          height={248}
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity={0} result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur stdDeviation={20} result='effect1_foregroundBlur_1243_16845' />
        </filter>
      </defs>
    </svg>
  );
}
