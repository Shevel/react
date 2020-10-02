import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Users.module.css';
import noavatar from '../../assets/image/noavatar.jpg';
import * as axios from 'axios';

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
                          props.toggleIsFollowing(true, user.id);
                          axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`, {
                            withCredentials: true,
                            headers: {
                              'API-KEY': '85b7e368-d428-421d-a380-f8e707aa4267',
                            },
                          })
                            .then(response => {
                              if (response.data.resultCode === 0) {
                                props.unfollow(user.id);
                              }
                              props.toggleIsFollowing(false, user.id);
                            });

                        }}>UnFollow</button>
                      : <button
                        disabled={props.followingInProgress.some(id => id === user.id)}
                        className={styles.follow}
                        onClick={() => {
                          props.toggleIsFollowing(true, user.id);
                          axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`, {}, {
                            withCredentials: true,
                            headers: {
                              'API-KEY': '85b7e368-d428-421d-a380-f8e707aa4267',
                            },
                          })
                            .then(response => {
                              if (response.data.resultCode === 0) {
                                props.follow(user.id);
                              }
                              props.toggleIsFollowing(false, user.id);
                            });

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