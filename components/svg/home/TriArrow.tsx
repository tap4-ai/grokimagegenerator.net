export default function TriArrow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={20} height={21} viewBox='0 0 20 21' fill='none' {...props}>
      <path d='M2 6L10.0031 14L18 6' stroke='white' strokeLinecap='round' />
      <path d='M2 12L10.0031 20L18 12' stroke='white' strokeLinecap='round' />
      <path d='M2 1L10.0031 9L18 1' stroke='white' strokeLinecap='round' />
    </svg>
  );
}
