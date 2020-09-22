import React from 'react';
import styles from './Users.module.css';
import * as axios from 'axios';
import noavatar from '../../assets/image/noavatar.jpg';
export const Users = (props) => {
  if (props.users.length === 0) {
    axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
      props.setUsers(response.data.items);
      console.log(response.data)
    })
  }
  return (
    <div className={styles.users}>
      {
        props.users.map((user) => {
          return (
            <div key={user.id} className={styles.user}>
              <span className={styles.user_avaBlock}>
                <div>
                  <img className={styles.avatar} src={user.photos.small ? user.photos.small : noavatar} alt='avatar' />
                </div>
                <div>
                  {
                    user.followed
                      ? <button className={styles.unfollow} onClick={() => { props.unfollow(user.id) }}>UnFollow</button>
                      : <button className={styles.follow} onClick={() => { props.follow(user.id) }}>Follow</button>
                  }
                </div>
              </span>
              <span className={styles.user_info}>
                <span className={styles.person}>
                  <div>{user.name}</div>
                  <div>{user.status}</div>
                </span>
                <span className={styles.location}>
                  <div>{'user.location.city'}</div>
                  <div>{'user.location.country'}</div>
                </span>
              </span>
            </div>
          )
        })
      }
    </div>
  )
}