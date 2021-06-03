import React from 'react';
import { useSelector } from 'react-redux';
import { Users } from './Users';
import { getIsFetching } from '../../redux/usersSelectors';
import { Preloader } from '../index';


type UserPagePropsType = {}

const UsersPage: React.FC<UserPagePropsType> = (props) => {
  const isFetching = useSelector(getIsFetching);
  return (
    <>
      { isFetching ? <Preloader /> : null}
      <Users />
    </>
  )
}

export default UsersPage;