import React, { useState } from 'react';
import styles from './Paginator.module.css';
import '../../../assets/styles/buttons.css';

export const Paginator = ({ totalItemsCount, pageSize, onPageChanged, currentPage, portionSize = 7 }) => {

  const pagesCount = Math.ceil(totalItemsCount / pageSize);
  const pages = [...Array(pagesCount).keys()].map((i) => i = i + 1);

  const portionCount = Math.ceil(pagesCount / portionSize);
  const [portionNumber, setPortionNumber] = useState(1);
  const leftLimit = (portionNumber - 1) * portionSize + 1;
  const rightLimit = portionNumber * portionSize;

  return (
    <div className={styles.pages}>
      {
        portionNumber > 1 &&
        <button
          className={`${styles.paginator_btn} btn`}
          onClick={() => { setPortionNumber(portionNumber - 1) }}
        >prev</button>
      }
      {
        pages.filter(filteringPage => filteringPage >= leftLimit && filteringPage <= rightLimit)
          .map(page => {
            return (
              <p
                key={page}
                className={currentPage === page ? `${styles.selected} ${styles.pagination_item}` : styles.pagination_item}
                onClick={() => { onPageChanged(page) }}
              >
                {page}
              </p>)
          })
      }
      {
        portionCount > portionNumber &&
        <button
          className={`${styles.paginator_btn} btn`}
          onClick={() => { setPortionNumber(portionNumber + 1) }}
        >next</button>
      }
    </div>
  )
}