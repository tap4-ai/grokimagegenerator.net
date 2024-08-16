/* eslint-disable react/jsx-props-no-spreading */
export default function Text2Image(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={36} height={37} fill='none' {...props}>
      <rect width={35} height={35} x={0.5} y={1} fill='#FDDDFE' fillOpacity={0.4} stroke='url(#a)' rx={17.5} />
      <path
        fill='url(#b)'
        d='m11.808 10.5-.109.003a1.805 1.805 0 0 0-1.694 1.665l-.005.136v12.389l.003.109a1.805 1.805 0 0 0 1.665 1.693l.136.005h12.389l.109-.003a1.805 1.805 0 0 0 1.693-1.666l.005-.135V12.307l-.003-.109a1.805 1.805 0 0 0-1.665-1.693l-.136-.005H11.808Zm3.378 9.658 3.67 3.303.054.045.065.04a.566.566 0 0 0 .551-.013l.082-.057 2.477-2.126.141-.004 2.599 1.949.045.09v1.318l-.006.077a.674.674 0 0 1-.577.583l-.09.007H11.797l-.077-.006a.674.674 0 0 1-.584-.577l-.006-.09v-.938l.035-.083 3.869-3.517h.151v-.001Zm9.01-8.528c.341 0 .622.253.667.583l.007.09v9.388l-.18.09-2.214-1.66-.06-.04-.068-.035a.565.565 0 0 0-.512.04l-.073.054-2.44 2.09-.148-.002-3.681-3.313-.063-.05a.565.565 0 0 0-.625-.012l-.077.059-3.599 3.27.001-9.884.006-.077a.674.674 0 0 1 .576-.583l.092-.007h12.391Zm-7.429 1.968-.067.004a.566.566 0 0 0-.498.471l-.006.083.003.066.012.066.021.068a.565.565 0 0 0 .442.365l.087.007h1.8l.113.112v3.034l.003.068c.028.257.227.46.473.498l.084.006.06-.003.071-.012a.565.565 0 0 0 .433-.464l.006-.086v-3.04l.113-.113h1.795l.068-.003a.565.565 0 0 0 .021-1.12l-.083-.007h-4.95Z'
      />
      <defs>
        <linearGradient id='a' x1={-10} x2={51} y1={37.5} y2={-0.5} gradientUnits='userSpaceOnUse'>
          <stop stopColor='#F32FF7' />
          <stop offset={0.455} stopColor='#fff' />
          <stop offset={1} stopColor='#4EE794' />
        </linearGradient>
        <linearGradient id='b' x1={-1.5} x2={39} y1={34} y2={-2} gradientUnits='userSpaceOnUse'>
          <stop stopColor='#F32FF7' />
          <stop offset={0.455} stopColor='#fff' />
          <stop offset={1} stopColor='#4EE794' />
        </linearGradient>
      </defs>
    </svg>
  );
}
