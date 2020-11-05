import React, { useEffect } from 'react';
import User from './User';
import Paginator from '../common/Paginator/Paginator';
import styles from './Users.module.css';
import '../../assets/styles/buttons.css';
import UsersSearchForm from './UsersSearchForm/UsersSearchForm';
import { FilterType, getUsersThunk } from '../../redux/usersReducer';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from '../../redux/usersSelectors';

type UsersPropsType = {}

export const Users: React.FC<UsersPropsType> = () => {
  const users = useSelector(getUsers);
  const totalUsersCount = useSelector(getTotalUsersCount);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const filter = useSelector(getUsersFilter);
  const followingInProgress = useSelector(getFollowingInProgress);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersThunk(currentPage, pageSize, filter));
  }, []);

  const onPageChanged = (pageNumber: number) => {
    dispatch(getUsersThunk(pageNumber, pageSize, filter));
  }

  const onFilterChanged = (filter: FilterType) => {
    dispatch(getUsersThunk(1, pageSize, filter));
  }

  const follow = (userId: number) => {
    dispatch(follow(userId));
  }

  const unfollow = (userId: number) => {
    dispatch(unfollow(userId));
  }

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
            follow={follow}
            unfollow={unfollow}
            followingInProgress={followingInProgress} />
        })
      }
    </div>
  )
}
