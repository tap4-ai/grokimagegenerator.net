export default function FluxVideo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={117} height={83} viewBox='0 0 117 83' fill='none' {...props}>
      <g filter='url(#filter0_f_17_1318)'>
        <path d='M44 52H72.5L100.5 67H16L44 52Z' fill='url(#paint0_linear_17_1318)' fillOpacity={0.7} />
      </g>
      <path
        d='M34 8C34 4.68629 36.6863 2 40 2H76C79.3137 2 82 4.68629 82 8V43.4909C82 47.0858 79.8352 50 77.1647 50H38.8353C36.1648 50 34 47.0858 34 43.491V8Z'
        fill='url(#paint1_linear_17_1318)'
      />
      <path
        d='M66.6504 29.4567C68.4499 28.322 68.4499 25.678 66.6504 24.5433L55.3934 17.445C53.4808 16.239 51 17.6262 51 19.9017V34.0983C51 36.3738 53.4808 37.761 55.3934 36.555L66.6504 29.4567Z'
        fill='black'
      />
      <path
        d='M73.4318 15H77V13.6793L76.2239 13.2621V8.76919L77 8.35197V7.03129H73.4318V8.35284L74.2174 8.77005V13.2612L73.4318 13.6784V15Z'
        fill='black'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M68.1746 15L68.5721 13.2269H70.3868L70.7749 15H72.9415L70.6229 7H68.3084L66 15H68.1746ZM69.3721 8.99968L69.3714 9.00295C69.3717 9.00178 69.3719 9.00085 69.3721 8.99968ZM69.3726 8.99734L69.3734 8.99376L69.3736 8.99311C69.3733 8.99452 69.373 8.99593 69.3726 8.99734ZM69.5695 9.98146C69.539 9.86382 69.5085 9.7419 69.4781 9.61569C69.4511 9.74399 69.4218 9.86622 69.3903 9.98229L69.0386 11.3807H69.929L69.5695 9.98146Z'
        fill='black'
      />
      <defs>
        <filter
          id='filter0_f_17_1318'
          x={0}
          y={36}
          width={116.5}
          height={47}
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity={0} result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur stdDeviation={8} result='effect1_foregroundBlur_17_1318' />
        </filter>
        <linearGradient id='paint0_linear_17_1318' x1={59.75} y1={52} x2={59.75} y2={67} gradientUnits='userSpaceOnUse'>
          <stop stopColor='#FF00DD' stopOpacity={0.7} />
          <stop offset={1} stopColor='#E2FF50' stopOpacity={0.2} />
        </linearGradient>
        <linearGradient id='paint1_linear_17_1318' x1={35.5} y1={2} x2={80.5} y2={50} gradientUnits='userSpaceOnUse'>
          <stop stopColor='#FF00DD' />
          <stop offset={1} stopColor='#E2FF50' />
        </linearGradient>
      </defs>
    </svg>
  );
}
