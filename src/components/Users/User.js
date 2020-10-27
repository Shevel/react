import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Users.module.css';
import '../../assets/styles/buttons.css';
import noavatar from '../../assets/image/noavatar.jpg';

export const User = ({ user, unfollow, follow, followingInProgress }) => {
  return (
    <div className={styles.user}>
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
                disabled={followingInProgress.some(id => id === user.id)}
                className={`${styles.unfollow} btn`}
                onClick={() => {
                  unfollow(user.id);
                }}>UnFollow</button>
              : <button
                disabled={followingInProgress.some(id => id === user.id)}
                className={`${styles.follow} btn`}
                onClick={() => {
                  follow(user.id);
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
          <>{'Default_Country'}</>
        </span>
      </span>
    </div>
  )
}