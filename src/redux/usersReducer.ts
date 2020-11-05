import { UserType } from '../types/types';
import { usersAPI } from '../api/userApi';
import { updateObjectInArray } from '../utils/objectsHelper';
import { InferActionsType, BaseThunkType } from './redux-store';
import { Dispatch } from 'redux';
import { ResponseType, ResultCode } from '../api/api';

type initialStateType = typeof initialState;
export type FilterType = typeof initialState.filter;

const initialState = {
  users: [] as Array<UserType>,
  totalUsersCount: null as number | null,
  pageSize: 7,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>, // array of usersId
  filter: {
    term: '',
    friend: null as null | boolean,
  },
};
type ActionsTypes = InferActionsType<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes>;

export const usersReducer = (
  state = initialState,
  action: ActionsTypes
): initialStateType => {
  switch (action.type) {
    case 'FOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userID, 'id', {
          followed: true,
        }),
      };

    case 'UNFOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userID, 'id', {
          followed: false,
        }),
      };
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case 'TOGGLE_IS_FETCHING':
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case 'TOGGLE_IS_FOLLOWING_PROGRESS':
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };
    case 'SET_USERS':
      return {
        ...state,
        users: [...action.users],
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };
    case 'SET_USERS_TOTAL_COUNT':
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      };
    default:
      return state;
  }
};

export const getUsersThunk = (
  currentPage: number,
  pageSize: number,
  filter: FilterType
): ThunkType => async (dispatch) => {
  dispatch(actions.toggleIsFetching(true));
  dispatch(actions.setCurrentPage(currentPage));
  dispatch(actions.setFilter(filter));

  const data = await usersAPI.getUsers(
    currentPage,
    pageSize,
    filter.term,
    filter.friend
  );
  dispatch(actions.toggleIsFetching(false));

  dispatch(actions.setUsers(data.items));
  dispatch(actions.setUsersTotalCount(data.totalCount));
};
const followUnfollowFlow = async (
  dispatch: Dispatch<ActionsTypes>,
  userId: number,
  apiMethod: (userId: number) => Promise<ResponseType>,
  actionCreator: (userId: number) => ActionsTypes
) => {
  dispatch(actions.toggleIsFollowing(true, userId));
  const response = await apiMethod(userId);
  if (response.resultCode === ResultCode.Success) {
    dispatch(actionCreator(userId));
  }
  dispatch(actions.toggleIsFollowing(false, userId));
};
export const follow = (userId: number): ThunkType => async (dispatch) => {
  followUnfollowFlow(dispatch, userId, usersAPI.follow, actions.followSuccess);
};
export const unfollow = (userId: number): ThunkType => async (dispatch) => {
  followUnfollowFlow(
    dispatch,
    userId,
    usersAPI.unfollow,
    actions.unfollowSuccess
  );
};

export const actions = {
  followSuccess: (userID: number) => {
    return { type: 'FOLLOW', userID } as const;
  },
  unfollowSuccess: (userID: number) => {
    return { type: 'UNFOLLOW', userID } as const;
  },
  setUsers: (users: Array<UserType>) => {
    return { type: 'SET_USERS', users } as const;
  },
  setCurrentPage: (currentPage: number) => {
    return { type: 'SET_CURRENT_PAGE', currentPage } as const;
  },
  setFilter: (filter: FilterType) => {
    return { type: 'SET_FILTER', payload: { ...filter } } as const;
  },
  setUsersTotalCount: (totalUsersCount: number) => {
    return { type: 'SET_USERS_TOTAL_COUNT', totalUsersCount } as const;
  },
  toggleIsFetching: (isFetching: boolean) => {
    return { type: 'TOGGLE_IS_FETCHING', isFetching } as const;
  },
  toggleIsFollowing: (isFetching: boolean, userId: number) => {
    return {
      type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
      isFetching,
      userId,
    } as const;
  },
};
