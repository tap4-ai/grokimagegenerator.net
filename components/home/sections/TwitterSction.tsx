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

const TweeterList: string[] = [
  '1821251289298219235',
  '1819694606499356853',
  '1820822465112686770',
  '1819444885943914688',
  '1819689246795407702',
  '1821163345870729637',
  '1820405546450583948',
  '1820268355636392086',
  '1819834363812385242',
  '1821605619927019974',
  '1821150855921594669',
  '1820605188744290741',
  '1819453183133208877',
  '1819033475762016312',
  '1819049483281596691',
  '1819662646083240037',
];

export default function TwitterSction() {
  const columns = splitArrayIntoColumns(TweeterList, 4);

  return (
    <section className='dark mx-auto grid max-w-pc grid-cols-1 gap-2.5 px-2 lg:grid-cols-4 lg:px-0'>
      {columns.map((col) => (
        // <div className={styles['twitter-card']}>
        <div className='twitter-card-list'>
          {col.map((twitterId) => (
            <Tweet id={twitterId} />
          ))}
        </div>
      ))}
    </section>
  );
}
