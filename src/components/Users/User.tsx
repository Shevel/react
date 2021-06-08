import React from 'react';
import { NavLink } from 'react-router-dom';

import { UserType } from '../../types/types';
import noavatar from '../../assets/image/noavatar.jpg';

import styles from './Users.module.css';
import '../../assets/styles/buttons.css';

type PropsType = {
  user: UserType;
  unfollow: (userId: number) => void;
  follow: (userId: number) => void;
  followingInProgress: Array<number>;
};

const User: React.FC<PropsType> = ({
  user, 
  follow,
  unfollow,
  followingInProgress
}) => {
  return (
    <div className={styles.user}>
      <span className={styles.user_avaBlock}>
        <div style={{ textAlign: "center" }}>
          <NavLink to={`/profile/${user.id}`}>
            <img
              className={styles.avatar}
              src={
                user && user.photos && user.photos.small !== null
                  ? user.photos.small
                  : noavatar
              }
              alt='avatar'
            />
          </NavLink>
        </div>
        <div style={{ textAlign: "center" }}>
          {user.followed ? (
            <button
              disabled={followingInProgress.some((id) => id === user.id)}
              className={`${styles.unfollow} btn`}
              onClick={() => {
                unfollow(user.id);
              }}
            >
              UnFollow
            </button>
          ) : (
            <button
              disabled={followingInProgress.some((id) => id === user.id)}
              className={`${styles.follow} btn`}
              onClick={() => {
                follow(user.id);
              }}
            >
              Follow
            </button>
          )}
        </div>
      </span>
      <span className={styles.user_info}>
        <span className={styles.person}>
          <div className={styles.name}>{user.name}</div>
          <div className={styles.status}>{user.status}</div>
        </span>
      </span>
    </div>
  );
};

export default User;
