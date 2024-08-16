/* eslint-disable react/jsx-props-no-spreading */
export default function Order(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={20} height={21} fill='none' {...props}>
      <path
        fill='#fff'
        fillOpacity={0.7}
        d='M7.537 19h5.87a4.542 4.542 0 0 0 4.537-4.537V7.537A4.543 4.543 0 0 0 13.406 3H7.537A4.543 4.543 0 0 0 3 7.537v6.926A4.543 4.543 0 0 0 7.537 19ZM4.397 7.537a3.145 3.145 0 0 1 3.14-3.14h5.87a3.145 3.145 0 0 1 3.14 3.14v6.926a3.145 3.145 0 0 1-3.14 3.14h-5.87a3.145 3.145 0 0 1-3.14-3.14V7.537Zm3.093 1.97h5.906c.335 0 .609-.312.609-.698 0-.386-.273-.698-.61-.698H7.49c-.336 0-.609.312-.609.698 0 .386.273.698.61.698Zm0 3.392h3.268c.336 0 .608-.312.608-.698 0-.386-.272-.698-.608-.698H7.49c-.336 0-.609.312-.609.698 0 .386.273.698.61.698Z'
      />
    </svg>
  );
}
