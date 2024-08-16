/* eslint-disable react/jsx-props-no-spreading */
export default function Image(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={20} height={21} fill='none' {...props}>
      <path
        fill='#fff'
        fillOpacity={0.4}
        d='M14.336 13.71a.667.667 0 0 0 .75-.978l-.667-1.155a.667.667 0 0 0-.91-.244l-4.042 2.334-1-1.732a.667.667 0 0 0-.91-.244l-1.732 1a.667.667 0 0 0 .666 1.154l1.155-.666 1 1.732a.667.667 0 0 0 .91.244l4.042-2.334.333.578a.667.667 0 0 0 .405.31ZM7.72 9.78a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28Z'
      />
      <path
        fill='#fff'
        fillOpacity={0.4}
        fillRule='evenodd'
        d='M2 10.5a8 8 0 1 0 16 0 8 8 0 0 0-16 0Zm1.333 0a6.667 6.667 0 1 1 13.333 0 6.667 6.667 0 0 1-13.333 0Z'
        clipRule='evenodd'
      />
    </svg>
  );
}
