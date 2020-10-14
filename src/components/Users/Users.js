import React from 'react';
import { User } from './User';
import { Paginator } from '../common/Paginator/Paginator';
import styles from './Users.module.css';
import '../../assets/styles/buttons.css';

export const Users = (props) => {
  return (
    <div className={styles.users}>
      <Paginator
        currentPage={props.currentPage}
        onPageChanged={props.onPageChanged}
        totalUsersCount={props.totalUsersCount}
        pageSize={props.pageSize}
      />
      {
        props.users.map((user) => {
          return <User key={user.id} user={user} {...props} />
        })
      }
    </div>
  )
}