import { UserType } from '../types/types';
import { usersAPI } from '../api/api';
import { updateObjectInArray } from '../utils/objectsHelper';
const SET_USERS = 'SET_USERS';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT';

type initialStateType = typeof initialState;

const initialState = {
  users: [] as Array<UserType>,
  totalUsersCount: null as number | null,
  pageSize: 7,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>, // array of usersId
};

export const usersReducer = (
  state = initialState,
  action: any
): initialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userID, 'id', {
          followed: true,
        }),
      };

    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userID, 'id', {
          followed: false,
        }),
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case TOGGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };
    case SET_USERS:
      return {
        ...state,
        users: [...action.users],
      };
    case SET_USERS_TOTAL_COUNT:
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      };
    default:
      return state;
  }
};

export const getUsersThunk = (currentPage: number, pageSize: number) => async (
  dispatch: any
) => {
  dispatch(toggleIsFetching(true));
  const data = await usersAPI.getUsers(currentPage, pageSize);
  dispatch(toggleIsFetching(false));
  dispatch(setUsers(data.items));
  dispatch(setCurrentPage(currentPage));
  dispatch(setUsersTotalCount(data.totalCount));
};

const followUnfollowFlow = async (
  dispatch: any,
  userId: number,
  apiMethod: any,
  actionCreator: any
) => {
  dispatch(toggleIsFollowing(true, userId));
  const response = await apiMethod(userId);
  if (!response.data.resultCode) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleIsFollowing(false, userId));
};

export const follow = (userId: number) => async (dispatch: any) => {
  followUnfollowFlow(
    dispatch,
    userId,
    usersAPI.follow.bind(usersAPI),
    followSuccess
  );
};

export const unfollow = (userId: number) => async (dispatch: any) => {
  followUnfollowFlow(
    dispatch,
    userId,
    usersAPI.unfollow.bind(usersAPI),
    unfollowSuccess
  );
};
type FollowSuccessType = {
  type: typeof FOLLOW;
  userID: number;
};
export const followSuccess = (userID: number): FollowSuccessType => {
  // Utils
  return { type: FOLLOW, userID };
};
type UnfollowSuccessType = {
  type: typeof UNFOLLOW;
  userID: number;
};
export const unfollowSuccess = (userID: number): UnfollowSuccessType => {
  // Utils
  return { type: UNFOLLOW, userID };
};
type SetUsersType = {
  type: typeof SET_USERS;
  users: Array<UserType>;
};
export const setUsers = (users: Array<UserType>): SetUsersType => {
  // Utils
  return { type: SET_USERS, users };
};
type SetCurrentPageType = {
  type: typeof SET_CURRENT_PAGE;
  currentPage: number;
};
export const setCurrentPage = (currentPage: number): SetCurrentPageType => {
  // Utils
  return { type: SET_CURRENT_PAGE, currentPage };
};
type SetUsersTotalCountType = {
  type: typeof SET_USERS_TOTAL_COUNT;
  totalUsersCount: number;
};
export const setUsersTotalCount = (
  totalUsersCount: number
): SetUsersTotalCountType => {
  // Utils
  return { type: SET_USERS_TOTAL_COUNT, totalUsersCount };
};
type ToggleIsFetchingType = {
  type: typeof TOGGLE_IS_FETCHING;
  isFetching: boolean;
};
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => {
  // Utils
  return { type: TOGGLE_IS_FETCHING, isFetching };
};
type ToggleIsFollowingType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS;
  isFetching: boolean;
  userId: number;
};
export const toggleIsFollowing = (
  isFetching: boolean,
  userId: number
): ToggleIsFollowingType => {
  // Utils
  return { type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId };
};
