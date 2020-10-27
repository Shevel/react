import React from 'react';
import { connect } from 'react-redux';
import { follow, unfollow, getUsersThunk } from '../../redux/usersReducer';
import { Users } from './Users';
import { Preloader } from '../common/Preloader/Preloader';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import {
  getUsers,
  getPageSize,
  getTotalUsersCount,
  getCurrentPage,
  getIsFetching,
  getFollowingInProgress
} from '../../redux/usersSelectors';
import { UserType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';

type MapStatePropsType = {
  users: Array<UserType>
  pageSize: number
  totalUsersCount: number | null
  currentPage: number
  isFetching: boolean
  followingInProgress: Array<number>
}
type MapDispatchPropsType = {
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  getUsersThunk: (currentPage: number, pageSize: number) => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType;

export class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    const { currentPage, pageSize } = this.props;
    this.props.getUsersThunk(currentPage, pageSize);
  }

  onPageChanged = (pageNumber: number) => {
    const { pageSize } = this.props;
    this.props.getUsersThunk(pageNumber, pageSize);
  }
  render() {
    return (
      <>
        { this.props.isFetching ? <Preloader /> : null}
        <Users
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          users={this.props.users}
          totalUsersCount={this.props.totalUsersCount}
          followingInProgress={this.props.followingInProgress}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
        />
      </>)
  }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  }
}

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, null, AppStateType>(mapStateToProps, {
    follow,
    unfollow,
    getUsersThunk,
  }),
  withAuthRedirect
)(UsersContainer)
