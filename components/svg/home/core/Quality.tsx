/* eslint-disable react/jsx-props-no-spreading */
export default function Quality(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={65} height={64} fill='none' {...props}>
      <path
        fill='url(#a)'
        d='m34.94 28.168-.916-2.276a2.185 2.185 0 0 0-.872-1.04l-2.083-1.3c-1.518-.944-1.32-3.213.34-3.881l2.276-.917a2.2 2.2 0 0 0 1.04-.87l1.298-2.084c.947-1.519 3.215-1.32 3.884.339l.915 2.277c.174.43.48.793.872 1.038l2.084 1.3c1.518.945 1.32 3.216-.342 3.883l-2.275.917c-.43.173-.794.479-1.04.872l-1.298 2.083c-.947 1.518-3.215 1.318-3.883-.341Z'
      />
      <path
        fill='url(#b)'
        d='m51.364 31.543-.306-.76a.723.723 0 0 0-.29-.345l-.694-.433a.728.728 0 0 1 .114-1.294l.758-.306a.728.728 0 0 0 .347-.29l.433-.694a.729.729 0 0 1 1.294.112l.306.76a.723.723 0 0 0 .29.345l.694.433a.73.73 0 0 1-.113 1.296l-.759.304a.726.726 0 0 0-.346.29l-.434.696a.729.729 0 0 1-1.294-.114Z'
      />
      <path
        fill='url(#c)'
        fillRule='evenodd'
        d='M64.5 32c0-17.673-14.327-32-32-32C14.827 0 .5 14.327.5 32c0 17.673 14.327 32 32 32 17.672 0 32-14.327 32-32ZM5.553 32c0-14.883 12.064-26.947 26.947-26.947S59.447 17.117 59.447 32a26.841 26.841 0 0 1-2.604 11.574l-9.984-10.126a4.246 4.246 0 0 0-5.967 0 4.395 4.395 0 0 0-.097 6.152l8.489 8.61a2.636 2.636 0 0 1 0 3.691 2.548 2.548 0 0 1-3.639 0l-19.01-19.279a4.803 4.803 0 0 0-6.86 0L8.43 44.13A26.834 26.834 0 0 1 5.553 32Z'
        clipRule='evenodd'
      />
      <defs>
        <linearGradient id='a' x1={-49.42} x2={101.62} y1={78.08} y2={-29.44} gradientUnits='userSpaceOnUse'>
          <stop stopColor='#F32FF7' />
          <stop offset={0.455} stopColor='#fff' />
          <stop offset={1} stopColor='#4EE794' />
        </linearGradient>
        <linearGradient id='b' x1={-49.42} x2={101.62} y1={78.08} y2={-29.44} gradientUnits='userSpaceOnUse'>
          <stop stopColor='#F32FF7' />
          <stop offset={0.455} stopColor='#fff' />
          <stop offset={1} stopColor='#4EE794' />
        </linearGradient>
        <linearGradient id='c' x1={-49.42} x2={101.62} y1={78.08} y2={-29.44} gradientUnits='userSpaceOnUse'>
          <stop stopColor='#F32FF7' />
          <stop offset={0.455} stopColor='#fff' />
          <stop offset={1} stopColor='#4EE794' />
        </linearGradient>
      </defs>
    </svg>
  );
}
