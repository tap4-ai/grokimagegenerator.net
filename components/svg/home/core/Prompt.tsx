/* eslint-disable react/jsx-props-no-spreading */
export default function Prompt(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={65} height={64} fill='none' {...props}>
      <path
        fill='url(#a)'
        d='M55.51 28.995c.41.41.64.965.64 1.545v.05c.383 1.756.564 3.55.54 5.347a28.092 28.092 0 0 1-33.568 27.525 28.098 28.098 0 0 1-14.38-7.675 28.082 28.082 0 0 1-6.118-30.585A28.088 28.088 0 0 1 28.536 7.83c1.711-.091 3.426.046 5.1.408v.13a2.084 2.084 0 0 1 1.64 2.047 2.121 2.121 0 0 1-2.128 2.127h-.182v.051a15.099 15.099 0 0 0-4.371-.306c-13.647 0-23.658 10-23.658 23.65 0 13.649 9.982 23.657 23.636 23.657s23.665-10.008 23.665-23.657a25.068 25.068 0 0 0-.285-4.501 2.682 2.682 0 0 1-.174-.896 2.185 2.185 0 0 1 3.731-1.545Z'
      />
      <path
        fill='url(#b)'
        d='M28.522 26.876h-.248c-5.384.153-8.743 3.482-8.743 9.06 0 5.58 3.475 9.069 9.064 9.069 5.588 0 9.07-3.49 9.07-9.068v-.102a2.184 2.184 0 0 1 3.732-1.545c.41.41.64.965.64 1.545v.233a13.493 13.493 0 0 1-8.423 12.389 13.505 13.505 0 0 1-14.677-3.017 13.494 13.494 0 0 1 9.636-22.985v.051a2.186 2.186 0 1 1-.051 4.37Z'
      />
      <path
        fill='url(#c)'
        d='m52.114 12.418 12.386 1.05-.022.007-3.38 3.328-8.991 8.959H41.076L27.655 38.144l-2.375-3.43 12.386-11.29V12.382l8.962-7.925L51.057 0l1.056 12.418Z'
      />
      <defs>
        <linearGradient id='a' x1={-19.107} x2={74.097} y1={76.139} y2={8.625} gradientUnits='userSpaceOnUse'>
          <stop stopColor='#F32FF7' />
          <stop offset={0.455} stopColor='#fff' />
          <stop offset={1} stopColor='#4EE794' />
        </linearGradient>
        <linearGradient id='b' x1={-19.107} x2={74.097} y1={76.139} y2={8.625} gradientUnits='userSpaceOnUse'>
          <stop stopColor='#F32FF7' />
          <stop offset={0.455} stopColor='#fff' />
          <stop offset={1} stopColor='#4EE794' />
        </linearGradient>
        <linearGradient id='c' x1={-19.107} x2={74.097} y1={76.139} y2={8.625} gradientUnits='userSpaceOnUse'>
          <stop stopColor='#F32FF7' />
          <stop offset={0.455} stopColor='#fff' />
          <stop offset={1} stopColor='#4EE794' />
        </linearGradient>
      </defs>
    </svg>
  );
}
