import React from 'react';
import { useSelector } from 'react-redux';
import { Users } from './Users';
import { getIsFetching } from '../../redux/usersSelectors';
import { Preloader } from '../common/Preloader/Preloader';


type UserPagePropsType = {}

export const UsersPage: React.FC<UserPagePropsType> = (props) => {
  const isFetching = useSelector(getIsFetching);
  return (
    <>
      { isFetching ? <Preloader /> : null}
      <Users />
    </>
  )
}