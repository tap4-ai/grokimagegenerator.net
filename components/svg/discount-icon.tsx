/* eslint-disable react/jsx-props-no-spreading */
export default function DiscountIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={66} height={45} viewBox='0 0 66 45' fill='none' {...props}>
      <path
        d='M66 20.3077C66 9.09206 56.9079 0 45.6923 0H14.5C6.49187 0 0 6.49187 0 14.5C0 22.5081 6.49187 29 14.5 29H47.5C57.7188 29 66 34.2812 66 44.5V20.3077Z'
        fill='url(#paint0_linear_3753_47811)'
      />
      <defs>
        <linearGradient id='paint0_linear_3753_47811' x1={33} y1={0} x2={33} y2={47.5} gradientUnits='userSpaceOnUse'>
          <stop stopColor='#FFBC3F' />
          <stop offset={1} stopColor='#FE7E7E' />
        </linearGradient>
      </defs>
    </svg>
  );
}
