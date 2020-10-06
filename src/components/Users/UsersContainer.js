import React from 'react';
import { connect } from 'react-redux';
import { follow, unfollow, setCurrentPage, getUsers } from '../../redux/usersReducer';
import { Users } from './Users';
import { Preloader } from '../common/Preloader/Preloader';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

export class UsersContainer extends React.Component {

  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  onPageChanged = (pageNumber) => {
    console.log(pageNumber);
    this.props.getUsers(pageNumber, this.props.pageSize);
  }
  render() {
    return (
      <>
        {
          this.props.isFetching ? <Preloader /> : null
        }
        <Users
          {...this.props}
          onPageChanged={this.onPageChanged}
        />
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,
  }
}

export default compose(
  connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    getUsers,
  }),
  withAuthRedirect
)(UsersContainer)
