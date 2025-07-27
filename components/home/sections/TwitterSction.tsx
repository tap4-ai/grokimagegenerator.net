import { Tweet } from 'react-tweet';

import './twitter.css';

function splitArrayIntoColumns<T>(array: T[], numColumns: number): T[][] {
  const columns: T[][] = Array.from({ length: numColumns }, () => []);
  array.forEach((item, index) => {
    const columnIndex = index % numColumns;
    columns[columnIndex].push(item);
  });
  return columns;
}

export default function TwitterSction({
  title,
  description,
  tweetIds,
}: {
  title: string;
  description: string;
  tweetIds: string[];
}) {
  const columns = splitArrayIntoColumns(tweetIds, 4);

  return (
    <div className='container-centered container-py'>
      <div className='mb-4 md:mb-8'>
        <h2 className='text-center text-[32px] leading-[36px] font-semibold tracking-[0.06em] text-white capitalize md:text-[48px] md:leading-[54px] md:tracking-[0.04em]'>
          {title}
        </h2>
        <p className='mt-1 text-center text-base leading-6 font-normal tracking-[0.04em] text-[#b8b8b8] capitalize md:text-center md:text-base md:leading-6 md:tracking-[0.04em] md:capitalize'>
          {description}
        </p>
      </div>

      <div className='dark grid grid-cols-1 gap-2.5 px-2 lg:grid-cols-4 lg:px-0'>
        {columns.map((col, index) => (
          <div key={index} className='twitter-card-list'>
            {col.map((twitterId) => (
              <Tweet key={twitterId} id={twitterId} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
