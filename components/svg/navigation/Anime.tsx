/* eslint-disable react/jsx-props-no-spreading */
export default function Anime(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={36} height={37} fill='none' {...props}>
      <rect width={35} height={35} x={0.5} y={1} fill='#FDDDFE' fillOpacity={0.4} stroke='url(#a)' rx={17.5} />
      <path
        stroke='url(#b)'
        strokeLinecap='round'
        d='M13.072 11.5c-2.776 5.207-6.186 15.479 2.379 14.91 10.706-.71 11.301-4.97 10.112-7.81-1.19-2.84-7.138-10.65-10.112-4.97-2.974 5.68-1.784 12.07 5.353 8.52 7.138-3.55-2.379-7.81-2.974-5.68-.476 1.704.992 3.077 1.785 3.55'
      />
      <defs>
        <linearGradient id='a' x1={-10} x2={51} y1={37.5} y2={-0.5} gradientUnits='userSpaceOnUse'>
          <stop stopColor='#F32FF7' />
          <stop offset={0.455} stopColor='#fff' />
          <stop offset={1} stopColor='#4EE794' />
        </linearGradient>
        <linearGradient id='b' x1={0.5} x2={34.5} y1={30.5} y2={1.5} gradientUnits='userSpaceOnUse'>
          <stop stopColor='#F32FF7' />
          <stop offset={0.455} stopColor='#fff' />
          <stop offset={1} stopColor='#4EE794' />
        </linearGradient>
      </defs>
    </svg>
  );
}
