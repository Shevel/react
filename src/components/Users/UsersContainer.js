import { connect } from 'react-redux';
import { followActionCreator, setUsers, unfollowActionCreator } from '../../redux/usersReducer';
import { Users } from './Users';

const mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    follow: (userID) => {
      dispatch(followActionCreator(userID))
    },
    unfollow: (userID) => {
      dispatch(unfollowActionCreator(userID))
    },
    setUsers: (users) => {
      dispatch(setUsers(users))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);