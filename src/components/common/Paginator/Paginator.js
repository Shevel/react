import React from 'react';
import styles from './Paginator.module.css';
import '../../../assets/styles/buttons.css';

export const Paginator = ({ totalUsersCount, pageSize, onPageChanged, currentPage }) => {

  const pagesCount = Math.ceil(totalUsersCount / pageSize);
  const pages = [...Array(pagesCount).keys()].map((i) => i = i + 1);

  return (
    <div className={styles.pages}>
      {
        pages.map(page => {
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
    </div>
  )
}