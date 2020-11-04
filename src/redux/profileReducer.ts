import { PhotosType } from './../types/types';
import { stopSubmit, FormAction } from 'redux-form';
import { profileAPI } from '../api/profileApi';
import { PostType, ProfileType } from '../types/types';
import { InferActionsType, BaseThunkType } from './redux-store';
import { ResultCode } from '../api/api';

type InitialStateType = typeof initialState;
const initialState = {
  postsData: [
    { id: 1, string: 'Ho-ho-ho!', likesCount: 5 },
    { id: 2, string: "Cool! What's up?", likesCount: 7 },
    { id: 3, string: 'Yo!!', likesCount: 9 },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: '',
};

type ActionTypes = InferActionsType<typeof actions>;
type ThunkType = BaseThunkType<ActionTypes | FormAction>;

export const profileReducer = (
  state = initialState,
  action: ActionTypes
): InitialStateType => {
  switch (action.type) {
    case 'ADD_POST':
      return {
        ...state,
        postsData: [
          {
            id: state.postsData.length + 1,
            string: action.postMessage,
            likesCount: 0,
          },
          ...state.postsData,
        ],
      };

    case 'SET_USER_PROFILE':
      return {
        ...state,
        profile: action.profile,
      };

    case 'DELETE_POST':
      return {
        ...state,
        postsData: state.postsData.filter((post) => post.id !== action.id),
      };

    case 'SAVE_PHOTO_SUCCESS':
      return {
        ...state,
        profile: {
          ...state.profile,
          photos: action.photos,
        } as ProfileType,
      };

    case 'SET_STATUS':
      return {
        ...state,
        status: action.status,
      };

    default:
      return state;
  }
};
export const actions = {
  newPost: (postMessage: string) => {
    return { type: 'ADD_POST', postMessage } as const;
  },
  deletePost: (id: number) => {
    return { type: 'DELETE_POST', id } as const;
  },
  setStatus: (status: string) => {
    return { type: 'SET_STATUS', status } as const;
  },
  setUserProfile: (profile: ProfileType) => {
    return { type: 'SET_USER_PROFILE', profile } as const;
  },
  saveMainAvatarSuccess: (photos: PhotosType) => {
    return { type: 'SAVE_PHOTO_SUCCESS', photos } as const;
  },
};

export const getUserProfile = (userId: number): ThunkType => async (
  dispatch
) => {
  const profile = await profileAPI.getProfile(userId);
  dispatch(actions.setUserProfile(profile));
};
export const getStatus = (userId: number): ThunkType => async (dispatch) => {
  const status = await profileAPI.getStatus(userId);
  dispatch(actions.setStatus(status));
};
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
  try {
    const response = await profileAPI.updateStatus(status);
    if (response.resultCode === ResultCode.Success) {
      dispatch(actions.setStatus(status));
    }
  } catch (error) {
    alert(error);
  }
};
export const saveMainAvatar = (file: File): ThunkType => async (dispatch) => {
  const response = await profileAPI.saveMainAvatar(file);
  if (response.resultCode === ResultCode.Success) {
    dispatch(actions.saveMainAvatarSuccess(response.data));
  }
};
export const saveProfile = (profile: ProfileType): ThunkType => async (
  dispatch,
  getState
) => {
  const profileData = await profileAPI.saveProfile(profile);
  if (profileData.resultCode === ResultCode.Success) {
    const userId = getState().auth.id;
    if (userId) {
      dispatch(getUserProfile(userId));
    } else {
      throw new Error('userid cant be null');
    }
  } else {
    dispatch(stopSubmit('profile', { _error: profileData.messages[0] }));
    return Promise.reject(profileData.messages[0]);
  }
};
