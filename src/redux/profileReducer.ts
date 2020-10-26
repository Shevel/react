import { stopSubmit } from 'redux-form';
import { profileAPI } from '../api/api';
import { PostType, ProfileType } from '../types/types';
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

export const profileReducer = (
  state = initialState,
  action: any
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
export const setUserProfile = (profile: ProfileType) => {
  return { type: SET_USER_PROFILE, profile };
};
type SaveMainAvatarSuccessType = {
  type: typeof SAVE_PHOTO_SUCCESS;
  photos: string;
};
export const saveMainAvatarSuccess = (
  photos: string
): SaveMainAvatarSuccessType => {
  return { type: SAVE_PHOTO_SUCCESS, photos };
};

export const getUserProfile = (userId: number) => async (dispatch: any) => {
  const response = await profileAPI.getProfile(userId);
  dispatch(setUserProfile(response.data));
};
export const getStatus = (userId: number) => async (dispatch: any) => {
  const response = await profileAPI.getStatus(userId);
  dispatch(setStatus(response.data));
};
export const updateStatus = (status: string) => async (dispatch: any) => {
  try {
    const response = await profileAPI.updateStatus(status);
    if (!response.data.resultCode) {
      dispatch(setStatus(status));
    }
  } catch (error) {
    console.log(error);
  }
};
export const saveMainAvatar = (file: string) => async (dispatch: any) => {
  const response = await profileAPI.saveMainAvatar(file);
  if (!response.data.resultCode) {
    dispatch(saveMainAvatarSuccess(response.data.data.photos));
  }
};
export const saveProfile = (profile: ProfileType) => async (
  dispatch: any,
  getState: any
) => {
  const response = await profileAPI.saveProfile(profile);
  if (!response.data.resultCode) {
    const userId = getState().auth.id;
    dispatch(getUserProfile(userId));
  } else {
    dispatch(stopSubmit('profile', { _error: response.data.messages[0] }));
    return Promise.reject(response.data.messages[0]);
  }
};
