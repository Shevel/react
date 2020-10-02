const SET_USERS = 'SET_USERS';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT';

const initialState = {
  users: [],
  totalUsersCount: 50,
  pageSize: 7,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userID) {
            return {
              ...user,
              followed: true,
            }
          }
          return user;
        })
      };

    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userID) {
            return {
              ...user,
              followed: false,
            }
          }
          return user;
        })
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      }
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      }
    case TOGGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id !== action.userId),
      }
    case SET_USERS:
      return {
        ...state,
        users: [...action.users],
      }
    case SET_USERS_TOTAL_COUNT:
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      }
    default:
      return state;
  }
}

export const follow = (userID) => { // Utils
  return { type: FOLLOW, userID }
}

export const unfollow = (userID) => { // Utils
  return { type: UNFOLLOW, userID }
}

export const setUsers = (users) => { // Utils
  return { type: SET_USERS, users }
}

export const setCurrentPage = (currentPage) => { // Utils
  return { type: SET_CURRENT_PAGE, currentPage }
}

export const setUsersTotalCount = (totalUsersCount) => { // Utils
  return { type: SET_USERS_TOTAL_COUNT, totalUsersCount }
}

export const toggleIsFetching = (isFetching) => { // Utils
  return { type: TOGGLE_IS_FETCHING, isFetching }
}
export const toggleIsFollowing = (isFetching, userId) => { // Utils
  return { type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId }
}