/* eslint-disable react/jsx-props-no-spreading */
export default function Triangle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={20} height={17} fill='none' {...props}>
      <path
        fill='#141516'
        fillOpacity={0.7}
        stroke='#4B4B4B'
        d='M10.431 15.281a.5.5 0 0 1-.862 0L1.317 1.254A.5.5 0 0 1 1.748.5h16.504a.5.5 0 0 1 .43.754L10.432 15.28Z'
      />
    </svg>
  );
}
