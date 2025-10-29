import Button from '../Button/Button';

import styles from './Pagination.module.scss';

interface PaginationProps {
  pages: number;
  pageCallback?: () => void;
  nextLink?: string;
  prevLink?: string;
}

const Pagination = ({
  pages,
  //   nextLink,
  //   prevLink,
  pageCallback,
}: PaginationProps) => {
  const pageNumbers = Array.from(
    { length: pages + 1 },
    (_, index) => index + 1
  );

  console.log(pageNumbers);

  return (
    <div className={styles.pagination__wrapper}>
      <Button text={'prev'} />
      <ul className={styles.pagination__list}>
        {pageNumbers.map((el) => (
          <li
            className={styles.pagination__list_item}
            key={el}
            onClick={pageCallback}
          >
            {el}
          </li>
        ))}
      </ul>
      <Button text={'next'} />
    </div>
  );
};

export default Pagination;
