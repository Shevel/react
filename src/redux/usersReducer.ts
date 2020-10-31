import { UserType } from '../types/types';
import { FollowUnfollowType, ResultCode, usersAPI } from '../api/api';
import { updateObjectInArray } from '../utils/objectsHelper';
import { AppStateType, InferActionsType } from './redux-store';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

type initialStateType = typeof initialState;

const initialState = {
  users: [] as Array<UserType>,
  totalUsersCount: null as number | null,
  pageSize: 7,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>, // array of usersId
};
type ActionsTypes = InferActionsType<typeof actions>;

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
    case 'SET_USERS_TOTAL_COUNT':
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      };
    default:
      return state;
  }
};
type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;
type DispatchType = Dispatch<ActionsTypes>;
export const getUsersThunk = (
  currentPage: number,
  pageSize: number
): ThunkType => async (dispatch) => {
  dispatch(actions.toggleIsFetching(true));
  const data = await usersAPI.getUsers(currentPage, pageSize);
  dispatch(actions.toggleIsFetching(false));
  dispatch(actions.setUsers(data.items));
  dispatch(actions.setCurrentPage(currentPage));
  dispatch(actions.setUsersTotalCount(data.totalCount));
};
const followUnfollowFlow = async (
  dispatch: DispatchType,
  userId: number,
  apiMethod: (userId: number) => Promise<FollowUnfollowType>,
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
    // Utils
    return { type: 'FOLLOW', userID } as const;
  },
  unfollowSuccess: (userID: number) => {
    // Utils
    return { type: 'UNFOLLOW', userID } as const;
  },
  setUsers: (users: Array<UserType>) => {
    // Utils
    return { type: 'SET_USERS', users } as const;
  },
  setCurrentPage: (currentPage: number) => {
    // Utils
    return { type: 'SET_CURRENT_PAGE', currentPage } as const;
  },
  setUsersTotalCount: (totalUsersCount: number) => {
    // Utils
    return { type: 'SET_USERS_TOTAL_COUNT', totalUsersCount } as const;
  },
  toggleIsFetching: (isFetching: boolean) => {
    // Utils
    return { type: 'TOGGLE_IS_FETCHING', isFetching } as const;
  },
  toggleIsFollowing: (isFetching: boolean, userId: number) => {
    // Utils
    return {
      type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
      isFetching,
      userId,
    } as const;
  },
};
