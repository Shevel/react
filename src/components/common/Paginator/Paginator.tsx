import React, { useState } from 'react';
import styles from './Paginator.module.css';
import '../../../assets/styles/buttons.css';
import clNames from 'classnames';

type PaginatorPropsType = {
  totalItemsCount: number | null
  pageSize: number
  onPageChanged: (pageNumber: number) => void
  currentPage: number
  portionSize?: number
}

export const Paginator: React.FC<PaginatorPropsType> = ({ totalItemsCount, pageSize, onPageChanged, currentPage, portionSize = 7 }) => {

  const pagesCount = Math.ceil(totalItemsCount as number / pageSize);
  const pages: Array<number> = [];
  for (let i = 1; i < pagesCount; i++) {
    pages.push(i);
  }
  const portionCount = Math.ceil(pagesCount / portionSize);
  const [portionNumber, setPortionNumber] = useState(1);
  // const [portionNumber, setPortionNumber] = useState<number>(1);
  const leftLimit = (portionNumber - 1) * portionSize + 1;
  const rightLimit = portionNumber * portionSize;

  return (
    <div className={styles.pages}>
      {
        portionNumber > 1 &&
        <button
          className={clNames(styles.paginator_btn, 'btn')}
          onClick={() => { setPortionNumber(portionNumber - 1) }}
        >prev</button>
      }
      {
        pages.filter(filteringPage => filteringPage >= leftLimit && filteringPage <= rightLimit)
          .map(page => {
            return (
              <div className={styles.page_container}>
                <p
                  key={page}
                  className={clNames({ [styles.selected]: currentPage === page }, styles.pagination_item)}
                  onClick={() => { onPageChanged(page) }}
                >
                  {page}
                </p>
              </div>)
          })
      }
      {
        portionCount > portionNumber &&
        <button
          className={clNames(styles.paginator_btn, 'btn')}
          onClick={() => { setPortionNumber(portionNumber + 1) }}
        >next</button>
      }
    </div>
  )
}