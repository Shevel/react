import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../utils/objectsHelper";
const SET_USERS = "SET_USERS";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";
const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_USERS_TOTAL_COUNT = "SET_USERS_TOTAL_COUNT";

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
        users: updateObjectInArray(state.users, action.userID, 'id', { followed: true }),
      }

    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userID, 'id', { followed: false }),
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
          : state.followingInProgress.filter((id) => id !== action.userId),
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
};

export const getUsersThunk = (currentPage, pageSize) => async (dispatch) => {
  dispatch(toggleIsFetching(true));
  const data = await usersAPI.getUsers(currentPage, pageSize)
  dispatch(toggleIsFetching(false));
  dispatch(setUsers(data.items));
  dispatch(setCurrentPage(currentPage));
  // dispatch(setUsersTotalCount(data.totalCount));
};

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
  dispatch(toggleIsFollowing(true, userId));
  const response = await apiMethod(userId)
  if (!response.data.resultCode) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleIsFollowing(false, userId));
}

export const follow = (userId) => async (dispatch) => {
  followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);
};

export const unfollow = (userId) => async (dispatch) => {
  followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
};

export const followSuccess = (userID) => {
  // Utils
  return { type: FOLLOW, userID };
};

export const unfollowSuccess = (userID) => {
  // Utils
  return { type: UNFOLLOW, userID };
};

export const setUsers = (users) => {
  // Utils
  return { type: SET_USERS, users };
};

export const setCurrentPage = (currentPage) => {
  // Utils
  return { type: SET_CURRENT_PAGE, currentPage };
};

export const setUsersTotalCount = (totalUsersCount) => {
  // Utils
  return { type: SET_USERS_TOTAL_COUNT, totalUsersCount };
};

export const toggleIsFetching = (isFetching) => {
  // Utils
  return { type: TOGGLE_IS_FETCHING, isFetching };
};
export const toggleIsFollowing = (isFetching, userId) => {
  // Utils
  return { type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId };
};
