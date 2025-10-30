import Button from '../Button/Button';
import { visiblePages } from './models/utils/visible-pages';

import styles from './Pagination.module.scss';

interface PaginationProps {
  pages: number;
  pageCallback: (number: number) => void;
  currentPage: number;
}

const Pagination = ({ pages, pageCallback, currentPage }: PaginationProps) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      pageCallback(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pages) {
      pageCallback(currentPage + 1);
    }
  };

  const pagesForRender = visiblePages(currentPage, pages);

  return (
    <div className="container">
      <div className={styles.pagination__wrapper}>
        <Button
          text={'prev'}
          callback={handlePrev}
          disabled={currentPage === 1}
        />
        <ul className={styles.pagination__list}>
          {pagesForRender.map((el, index) =>
            el !== '...' ? (
              <li
                className={
                  el === currentPage
                    ? `${styles.pagination__list_item} ${styles.active}`
                    : `${styles.pagination__list_item}`
                }
                key={el}
                onClick={() => pageCallback(el)}
              >
                {el}
              </li>
            ) : (
              <li
                key={`${index}${el}`}
                className={styles.pagination__list_item}
              >
                {el}
              </li>
            )
          )}
        </ul>
        <Button
          text={'next'}
          callback={handleNext}
          disabled={currentPage === pages}
        />
      </div>
    </div>
  );
};

export default Pagination;
