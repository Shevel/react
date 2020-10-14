import React from 'react';
import { connect } from 'react-redux';
import { follow, unfollow, setCurrentPage, getUsersThunk } from '../../redux/usersReducer';
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

export class UsersContainer extends React.Component {

  componentDidMount() {
    const { currentPage, pageSize } = this.props;
    this.props.getUsersThunk(currentPage, pageSize);
  }

  onPageChanged = (pageNumber) => {
    const { pageSize } = this.props;
    this.props.getUsersThunk(pageNumber, pageSize);
  }
  render() {
    return (
      <>
        { this.props.isFetching ? <Preloader /> : null}
        <Users {...this.props} onPageChanged={this.onPageChanged} />
      </>
    )
  }
}

const mapStateToProps = (state) => {
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
  connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    getUsersThunk,
  }),
  withAuthRedirect
)(UsersContainer)
