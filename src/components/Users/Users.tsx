import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as queryString from 'querystring';

import {
  FilterType,
  follow,
  getUsersThunk,
  unfollow
} from '../../redux/usersReducer';
import {
  getCurrentPage,
  getFollowingInProgress,
  getPageSize,
  getTotalUsersCount,
  getUsers,
  getUsersFilter
} from '../../redux/usersSelectors';
import User from './User';
import Paginator from '../common/Paginator/Paginator';
import UsersSearchForm from './UsersSearchForm/UsersSearchForm';

import notFound from '../../assets/image/icon-404.png';
import styles from './Users.module.css';
import '../../assets/styles/buttons.css';

type UsersPropsType = {};

export const Users: React.FC<UsersPropsType> = () => {
  const users = useSelector(getUsers);
  const totalUsersCount = useSelector(getTotalUsersCount);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const filter = useSelector(getUsersFilter);
  const followingInProgress = useSelector(getFollowingInProgress);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const parsed = queryString.parse(history.location.search.substr(1)) as {
      term: string;
      page: string;
      friend: string;
    };
    let actualPage = currentPage;
    let actualFilter = filter;
    if (parsed.page) {
      actualPage = Number(parsed.page);
    }
    if (parsed.term) {
      actualFilter = { ...actualFilter, term: parsed.term as string };
    }
    if (parsed.friend) {
      actualFilter = {
        ...actualFilter,
        friend:
          parsed.friend === 'null'
            ? null
            : parsed.friend === 'true'
            ? true
            : false
      };
    }
    debugger;
    dispatch(getUsersThunk(actualPage, pageSize, actualFilter));
  }, []);

  useEffect(() => {
    debugger;
    history.push({
      pathname: '/users',
      search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
    });
  }, [filter, currentPage]);

  const onPageChanged = (pageNumber: number) => {
    dispatch(getUsersThunk(pageNumber, pageSize, filter));
  };

  const onFilterChanged = (filter: FilterType) => {
    dispatch(getUsersThunk(1, pageSize, filter));
  };

  const subscribe = (userId: number) => {
    dispatch(follow(userId));
  };

  const unsubscribe = (userId: number) => {
    dispatch(unfollow(userId));
  };

  return (
    <div className={styles.users}>
      <div style={{ marginBottom: 15 }}>
        <UsersSearchForm onFilterChanged={onFilterChanged} />
      </div>
      {users.length ? (
        users.map((user) => {
          return (
            <User
              key={user.id}
              user={user}
              follow={subscribe}
              unfollow={unsubscribe}
              followingInProgress={followingInProgress}
            />
          );
        })
      ) : (
        <div style={{ textAlign: 'center', fontSize: 24 }}>
          <p>
            <b>Not found users</b>
          </p>
          <img src={notFound} width='400' alt='not found' />
        </div>
      )}
      <Paginator
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
      />
    </div>
  );
};
