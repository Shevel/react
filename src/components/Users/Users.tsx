import React from 'react';
import { User } from './User';
import { Paginator } from '../common/Paginator/Paginator';
import styles from './Users.module.css';
import '../../assets/styles/buttons.css';
import { UserType } from '../../types/types';

type UsersPropsType = {
  currentPage: number
  onPageChanged: (pageNumber: number) => void
  totalUsersCount: number | null
  pageSize: number
  users: Array<UserType>
  followingInProgress: Array<number>
  unfollow: (userId: number) => void
  follow: (userId: number) => void
}

export const Users: React.FC<UsersPropsType> = ({ currentPage, onPageChanged, totalUsersCount, pageSize, users, ...props }) => {
  return (
    <div className={styles.users}>
      <Paginator
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
      />
      {
        users.map((user) => {
          return <User
            key={user.id}
            user={user}
            follow={props.follow}
            unfollow={props.unfollow}
            followingInProgress={props.followingInProgress} />
        })
      }
    </div>
  )
}