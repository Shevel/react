import { profileAPI } from "../api/api";

const ADD_POST = "ADD_POST";
const DELETE_POST = "DELETE_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const SAVE_PHOTO_SECCESS = "SAVE_PHOTO_SECCESS";

const initialState = {
  postsData: [
    { id: 1, string: "Ho-ho-ho!", likesCount: 5 },
    { id: 2, string: "Cooooool! What's up?", likesCount: 7 },
    { id: 3, string: "Yo!!", likesCount: 9 },
  ],
  profile: null,
  status: "",
};

export const profileReducer = (state = initialState, action) => {
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

    case SAVE_PHOTO_SECCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          photos: action.photos 
        },
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

export const newPost = (postMessage) => {
  return { type: ADD_POST, postMessage };
};

export const deletePost = (id) => {
  return { type: DELETE_POST, id };
};

export const setStatus = (status) => {
  return { type: SET_STATUS, status };
};
export const setUserProfile = (profile) => {
  return { type: SET_USER_PROFILE, profile };
};

export const saveMainAvatarSeccess = (photos) => {
  return { type: SAVE_PHOTO_SECCESS, photos };
};

export const getUserProfile = (userId) => async (dispatch) => {
  const response = await profileAPI.getProfile(userId);
  dispatch(setUserProfile(response.data));
};
export const getStatus = (userId) => async (dispatch) => {
  const response = await profileAPI.getStatus(userId);
  dispatch(setStatus(response.data));
};
export const updateStatus = (status) => async (dispatch) => {
  const response = await profileAPI.updateStatus(status);
  if (!response.data.resultCode) {
    dispatch(setStatus(status));
  }
};
export const saveMainAvatar = (file) => async (dispatch) => {
  const response = await profileAPI.saveMainAvatar(file);
  if (!response.data.resultCode) {
    dispatch(saveMainAvatarSeccess(response.data.data.photos));
  }
};
