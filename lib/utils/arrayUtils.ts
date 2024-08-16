/* eslint-disable import/prefer-default-export */
export function generateColumns<T>(data: T[], numColumns: number): T[][] {
  const columns: T[][] = Array.from({ length: numColumns }, () => []);

  data.forEach((item, index) => {
    const columnIndex = index % numColumns;
    columns[columnIndex].push(item);
  });

  return columns;
}
