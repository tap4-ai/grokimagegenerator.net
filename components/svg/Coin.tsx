/* eslint-disable react/jsx-props-no-spreading */
export default function Coin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={69} height={69} fill='none' {...props}>
      <g filter='url(#a)'>
        <ellipse cx={34.5} cy={34.5} fill='#AA9E3D' rx={21.75} ry={22.5} />
      </g>
      <g filter='url(#b)'>
        <ellipse cx={33} cy={34.5} fill='#BDAB0D' rx={20.25} ry={22.5} />
      </g>
      <path
        stroke='#FFE600'
        strokeWidth={0.5}
        d='M53 34.5c0 12.314-8.978 22.25-20 22.25S13 46.814 13 34.5s8.978-22.25 20-22.25 20 9.936 20 22.25Z'
      />
      <path
        fill='#FFE600'
        d='m40.102 39.489.01-8.148c-.05-1.925-.95-2.906-2.699-2.943-1.758.033-2.655 1.012-2.693 2.936l-.01 8.148c.033 1.942.928 2.923 2.686 2.943 1.749-.015 2.651-.994 2.706-2.936Zm-8.147.148.01-8.477c.02-1.776.588-3.142 1.706-4.098 1.047-.948 2.295-1.421 3.745-1.42 1.495.002 2.764.478 3.809 1.429 1.062.96 1.61 2.327 1.643 4.102l-.01 8.477c-.038 1.767-.589 3.128-1.654 4.085-1.047.948-2.317 1.43-3.811 1.446-1.45-.02-2.698-.505-3.743-1.455-1.115-.96-1.68-2.323-1.695-4.09ZM24.011 28.698l-2.731 2 .003-2.926 2.732-1.987 2.755.003-.023 19.222-2.756-.004.02-16.308Z'
      />
      <defs>
        <filter
          id='a'
          width={67.5}
          height={69}
          x={0.75}
          y={0}
          colorInterpolationFilters='sRGB'
          filterUnits='userSpaceOnUse'
        >
          <feFlood floodOpacity={0} result='BackgroundImageFix' />
          <feColorMatrix in='SourceAlpha' result='hardAlpha' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' />
          <feOffset />
          <feGaussianBlur stdDeviation={6} />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix values='0 0 0 0 1 0 0 0 0 0.900047 0 0 0 0 0.000472005 0 0 0 0.5 0' />
          <feBlend in2='BackgroundImageFix' result='effect1_dropShadow_6639_129382' />
          <feBlend in='SourceGraphic' in2='effect1_dropShadow_6639_129382' result='shape' />
        </filter>
        <filter
          id='b'
          width={40.5}
          height={45}
          x={12.75}
          y={12}
          colorInterpolationFilters='sRGB'
          filterUnits='userSpaceOnUse'
        >
          <feFlood floodOpacity={0} result='BackgroundImageFix' />
          <feBlend in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feColorMatrix in='SourceAlpha' result='hardAlpha' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' />
          <feOffset />
          <feGaussianBlur stdDeviation={0.5} />
          <feComposite in2='hardAlpha' k2={-1} k3={1} operator='arithmetic' />
          <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.7 0' />
          <feBlend in2='shape' result='effect1_innerShadow_6639_129382' />
        </filter>
      </defs>
    </svg>
  );
}
