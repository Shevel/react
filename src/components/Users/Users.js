import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Users.module.css';
import noavatar from '../../assets/image/noavatar.jpg';

export const Users = (props) => {

  const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  const pages = [...Array(pagesCount).keys()].map((i) => i = i + 1);

  return (
    <div className={styles.users}>
      <div className={styles.pages}>
        {
          pages.map(page =>
            <p
              key={page}
              className={props.currentPage === page ? styles.selected : null}
              onClick={() => { props.onPageChanged(page) }}
            >
              {page}
            </p>)
        }
      </div>
      {
        props.users.map((user) => {
          return (
            <div key={user.id} className={styles.user}>
              <span className={styles.user_avaBlock}>
                <div>
                  <NavLink to={`/profile/${user.id}`}>
                    <img className={styles.avatar} src={user.photos.small ? user.photos.small : noavatar} alt='avatar' />
                  </NavLink>
                </div>
                <div>
                  {
                    user.followed
                      ? <button
                        disabled={props.followingInProgress.some(id => id === user.id)}
                        className={styles.unfollow}
                        onClick={() => {
                          props.unfollow(user.id);
                        }}>UnFollow</button>
                      : <button
                        disabled={props.followingInProgress.some(id => id === user.id)}
                        className={styles.follow}
                        onClick={() => {
                          props.follow(user.id);
                        }}>Follow</button>
                  }
                </div>
              </span>
              <span className={styles.user_info}>
                <span className={styles.person}>
                  <div className={styles.name}>{user.name}</div>
                  <div className={styles.status}>{user.status}</div>
                </span>
                <span className={styles.location}>
                  <div>{'Default_City'}</div>
                  <div>{'Default_Country'}</div>
                </span>
              </span>
            </div>
          )
        })
      }
    </div >
  )
}