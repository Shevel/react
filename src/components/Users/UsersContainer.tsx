import React from 'react';
import { connect } from 'react-redux';
import { follow, unfollow, getUsersThunk, FilterType } from '../../redux/usersReducer';
import { Users } from './Users';
import Preloader from '../common/Preloader/Preloader';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import {
  getUsers,
  getPageSize,
  getTotalUsersCount,
  getCurrentPage,
  getIsFetching,
  getFollowingInProgress,
  getUsersFilter
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
  filter: FilterType
}
type MapDispatchPropsType = {
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  getUsersThunk: (currentPage: number, pageSize: number, filter: FilterType) => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType;

export class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    const { currentPage, pageSize, filter } = this.props;
    this.props.getUsersThunk(currentPage, pageSize, filter);
  }

  onPageChanged = (pageNumber: number) => {
    const { pageSize, filter } = this.props;
    this.props.getUsersThunk(pageNumber, pageSize, filter);
  }
  onFilterChanged = (filter: FilterType) => {
    const { pageSize } = this.props;
    this.props.getUsersThunk(1, pageSize, filter);
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
          onFilterChanged={this.onFilterChanged}
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
    filter: getUsersFilter(state),
  }
}

export default compose<React.ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, null, AppStateType>(mapStateToProps, {
    follow,
    unfollow,
    getUsersThunk,
  }),
  withAuthRedirect
)(UsersContainer)
