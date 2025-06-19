export default function FluxImage(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={112} height={79} viewBox='0 0 112 79' fill='none' {...props}>
      <g clipPath='url(#clip0_3_6364)'>
        <g filter='url(#filter0_f_3_6364)'>
          <path d='M42 52H70.5L98.5 67H14L42 52Z' fill='url(#paint0_linear_3_6364)' fillOpacity={0.7} />
        </g>
        <path
          d='M32 6.6722C32 4.09181 34.0918 2 36.6722 2H75.3278C77.9082 2 80 4.09182 80 6.67221V45.3278C80 47.9082 77.9082 50 75.3278 50H36.6722C34.0918 50 32 47.9082 32 45.3278V6.6722Z'
          fill='url(#paint1_linear_3_6364)'
        />
        <path
          d='M76 27.2319V42.3934C76 44.3853 74.2568 46 72.1065 46H39.8935C37.7432 46 36 44.3853 36 42.3934V32.8967C38.3774 31.5677 41.4259 30.7692 44.75 30.7692C45.4574 30.7692 46.1523 30.8054 46.8309 30.8751C49.9471 26.7916 56.242 24 63.5 24C68.3022 24 72.6828 25.2221 76 27.2319Z'
          fill='black'
        />
        <path
          d='M48.6293 20.3147C48.6293 22.6976 46.6976 24.6293 44.3147 24.6293C41.9317 24.6293 40 22.6976 40 20.3147C40 17.9317 41.9317 16 44.3147 16C46.6976 16 48.6293 17.9317 48.6293 20.3147Z'
          fill='black'
        />
        <path
          d='M72.4318 14H76V12.6793L75.2239 12.2621V7.76919L76 7.35197V6.03129H72.4318V7.35284L73.2174 7.77005V12.2612L72.4318 12.6784V14Z'
          fill='black'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M67.1746 14L67.5721 12.2269H69.3868L69.7749 14H71.9415L69.6229 6H67.3084L65 14H67.1746ZM68.3721 7.99968L68.3714 8.00295C68.3717 8.00178 68.3719 8.00085 68.3721 7.99968ZM68.3726 7.99734L68.3734 7.99376L68.3736 7.99311C68.3733 7.99452 68.373 7.99593 68.3726 7.99734ZM68.5695 8.98146C68.539 8.86382 68.5085 8.7419 68.4781 8.61569C68.4511 8.74399 68.4218 8.86622 68.3903 8.98229L68.0386 10.3807H68.929L68.5695 8.98146Z'
          fill='black'
        />
      </g>
      <defs>
        <filter
          id='filter0_f_3_6364'
          x={-2}
          y={36}
          width={116.5}
          height={47}
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity={0} result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur stdDeviation={8} result='effect1_foregroundBlur_3_6364' />
        </filter>
        <linearGradient id='paint0_linear_3_6364' x1={57.75} y1={52} x2={57.75} y2={67} gradientUnits='userSpaceOnUse'>
          <stop stopColor='#FF00DD' stopOpacity={0.7} />
          <stop offset={1} stopColor='#E2FF50' stopOpacity={0.2} />
        </linearGradient>
        <linearGradient id='paint1_linear_3_6364' x1={33.5} y1={2} x2={78.5} y2={50} gradientUnits='userSpaceOnUse'>
          <stop stopColor='#FF00DD' />
          <stop offset={1} stopColor='#E2FF50' />
        </linearGradient>
        <clipPath id='clip0_3_6364'>
          <rect width={112} height={79} fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}
