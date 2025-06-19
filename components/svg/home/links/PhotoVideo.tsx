export default function PhotoVideo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={117} height={83} viewBox='0 0 117 83' fill='none' {...props}>
      <g filter='url(#filter0_f_17_1317)'>
        <path d='M44 52H72.5L100.5 67H16L44 52Z' fill='url(#paint0_linear_17_1317)' fillOpacity={0.7} />
      </g>
      <g filter='url(#filter1_d_17_1317)'>
        <path
          d='M26 7.05263C26 4.26214 28.2474 2 31.0196 2H61.1374C63.9097 2 66.1571 4.26214 66.1571 7.05263V43.6842C66.1571 46.4747 63.9097 48.7369 61.1374 48.7369H31.0196C28.2474 48.7369 26 46.4747 26 43.6842V7.05263Z'
          fill='url(#paint1_linear_17_1317)'
        />
        <path
          d='M63.6472 15.1998V41.6469C63.6472 44.1673 61.6807 46.2105 59.255 46.2105H32.9019C30.4762 46.2105 28.5098 44.1673 28.5098 41.6469V28.5427C30.5981 26.7506 33.2761 25.674 36.1961 25.674C36.8175 25.674 37.4279 25.7228 38.024 25.8168C40.7614 20.3107 46.291 10.8421 52.6667 10.8421C56.8852 10.8421 60.7332 12.4899 63.6472 15.1998Z'
          fill='black'
        />
        <path
          d='M38.549 13.3684C38.549 15.4613 36.8635 17.1579 34.7843 17.1579C32.7051 17.1579 31.0195 15.4613 31.0195 13.3684C31.0195 11.2755 32.7051 9.57892 34.7843 9.57892C36.8635 9.57892 38.549 11.2755 38.549 13.3684Z'
          fill='black'
        />
        <path
          d='M44.8223 27.4737C44.8223 25.2646 46.6131 23.4737 48.8223 23.4737H85.9989C88.2081 23.4737 89.9989 25.2646 89.9989 27.4737V44.4155C89.9989 47.4998 87.7516 50 84.9793 50H49.8419C47.0696 50 44.8223 47.4998 44.8223 44.4155V27.4737Z'
          fill='url(#paint2_linear_17_1317)'
        />
        <path
          d='M73.1885 39.0779C73.9892 38.5853 73.9892 37.4147 73.1885 36.9222L65.5558 32.2271C64.7196 31.7127 63.6465 32.3185 63.6465 33.3049V42.6951C63.6465 43.6816 64.7196 44.2873 65.5558 43.7729L73.1885 39.0779Z'
          fill='black'
        />
      </g>
      <defs>
        <filter
          id='filter0_f_17_1317'
          x={0}
          y={36}
          width={116.5}
          height={47}
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity={0} result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur stdDeviation={8} result='effect1_foregroundBlur_17_1317' />
        </filter>
        <filter
          id='filter1_d_17_1317'
          x={22}
          y={2}
          width={71.998}
          height={56}
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity={0} result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
          <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_17_1317' />
          <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_17_1317' result='shape' />
        </filter>
        <linearGradient id='paint0_linear_17_1317' x1={59.75} y1={52} x2={59.75} y2={67} gradientUnits='userSpaceOnUse'>
          <stop stopColor='#FF00DD' stopOpacity={0.7} />
          <stop offset={1} stopColor='#E2FF50' stopOpacity={0.2} />
        </linearGradient>
        <linearGradient
          id='paint1_linear_17_1317'
          x1={27.2549}
          y1={2}
          x2={70.9956}
          y2={42.0882}
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#FF00DD' />
          <stop offset={1} stopColor='#E2FF50' />
        </linearGradient>
        <linearGradient
          id='paint2_linear_17_1317'
          x1={46.234}
          y1={23.4737}
          x2={67.2896}
          y2={61.7237}
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#FF00DD' />
          <stop offset={1} stopColor='#E2FF50' />
        </linearGradient>
      </defs>
    </svg>
  );
}
