import { PhotosType } from './../types/types';
import { stopSubmit } from 'redux-form';
import { profileAPI, ResultCode } from '../api/api';
import { PostType, ProfileType } from '../types/types';
import { AppStateType } from './redux-store';
import { ThunkAction } from 'redux-thunk';
const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

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
type ActionTypes =
  | NewPostType
  | DeletePostType
  | SetStatusType
  | SetUserProfileType
  | SaveMainAvatarSuccessType;

export const profileReducer = (
  state = initialState,
  action: ActionTypes
): InitialStateType => {
  switch (action.type) {
    case ADD_POST:
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

    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };

    case DELETE_POST:
      return {
        ...state,
        postsData: state.postsData.filter((post) => post.id !== action.id),
      };

    case SAVE_PHOTO_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          photos: action.photos,
        } as ProfileType,
      };

    case SET_STATUS:
      return {
        ...state,
        status: action.status,
      };

    default:
      return state;
  }
};
type NewPostType = {
  type: typeof ADD_POST;
  postMessage: string;
};
export const newPost = (postMessage: string): NewPostType => {
  return { type: ADD_POST, postMessage };
};
type DeletePostType = {
  type: typeof DELETE_POST;
  id: number;
};
export const deletePost = (id: number): DeletePostType => {
  return { type: DELETE_POST, id };
};
type SetStatusType = {
  type: typeof SET_STATUS;
  status: string;
};
export const setStatus = (status: string): SetStatusType => {
  return { type: SET_STATUS, status };
};
type SetUserProfileType = {
  type: typeof SET_USER_PROFILE;
  profile: ProfileType;
};
export const setUserProfile = (profile: ProfileType): SetUserProfileType => {
  return { type: SET_USER_PROFILE, profile };
};
type SaveMainAvatarSuccessType = {
  type: typeof SAVE_PHOTO_SUCCESS;
  photos: PhotosType;
};
export const saveMainAvatarSuccess = (
  photos: PhotosType
): SaveMainAvatarSuccessType => {
  return { type: SAVE_PHOTO_SUCCESS, photos };
};
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;
export const getUserProfile = (userId: number | null): ThunkType => async (
  dispatch
) => {
  const profile = await profileAPI.getProfile(userId as number);
  dispatch(setUserProfile(profile));
};
export const getStatus = (userId: number): ThunkType => async (dispatch) => {
  const status = await profileAPI.getStatus(userId);
  dispatch(setStatus(status));
};
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
  try {
    const response = await profileAPI.updateStatus(status);
    if (response.resultCode === ResultCode.Success) {
      dispatch(setStatus(status));
    }
  } catch (error) {
    alert(error);
  }
};
export const saveMainAvatar = (file: string): ThunkType => async (dispatch) => {
  const response = await profileAPI.saveMainAvatar(file);
  if (response.resultCode === ResultCode.Success) {
    dispatch(saveMainAvatarSuccess(response.data));
  }
};
export const saveProfile = (profile: ProfileType): ThunkType => async (
  dispatch: any,
  getState
) => {
  const profileData = await profileAPI.saveProfile(profile);
  if (profileData.resultCode === ResultCode.Success) {
    const userId = getState().auth.id;
    dispatch(getUserProfile(userId));
  } else {
    dispatch(stopSubmit('profile', { _error: profileData.messages[0] }));
    return Promise.reject(profileData.messages[0]);
  }
};
