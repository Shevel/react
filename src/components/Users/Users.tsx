import React from 'react';
import User from './User';
import Paginator from '../common/Paginator/Paginator';
import styles from './Users.module.css';
import '../../assets/styles/buttons.css';
import { UserType } from '../../types/types';
import UsersSearchForm from './UsersSearchForm/UsersSearchForm';
import { FilterType } from '../../redux/usersReducer';

type UsersPropsType = {
  currentPage: number
  totalUsersCount: number | null
  pageSize: number
  users: Array<UserType>
  followingInProgress: Array<number>
  onPageChanged: (pageNumber: number) => void
  onFilterChanged: (filter: FilterType) => void
  unfollow: (userId: number) => void
  follow: (userId: number) => void
}

export const Users: React.FC<UsersPropsType> = ({ currentPage, onPageChanged, onFilterChanged, totalUsersCount, pageSize, users, ...props }) => {
  return (
    <div className={styles.users}>
      <div>
        <UsersSearchForm onFilterChanged={onFilterChanged} />
      </div>
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
