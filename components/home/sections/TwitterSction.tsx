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
  '1824768830629196156',
  '1825286773200597399',
  '1823632385172193627',
  '1825321903189299265',
  '1819689246795407702',
  '1824894208836321499',
  '1820405546450583948',
  '1824125206987936068',
  '1826285315721396676',
  '1824844724597117080',
  '1826114308985463143',
  '1825241908433608928',
  '1824929245388513665',
  '1826033978954121435',
  '1826655434394271813',
  '1824699361835520353',
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
