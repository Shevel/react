import { usersAPI } from '../api/api';

const ADD_POST = 'ADD_POST';
const UPDATE_POST_TEXT = 'UPDATE_POST_TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

const initialState = {
  postsData: [
    { id: 1, string: 'Ho-ho-ho!', likesCount: 5 },
    { id: 2, string: 'Cooooool! What\'s up?', likesCount: 7 },
    { id: 3, string: 'Yo!!', likesCount: 9 },
  ],
  newPostText: '',
  profile: null,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        postsData: [{
          id: state.postsData.length + 1,
          string: state.newPostText,
          likesCount: 0,
        }, ...state.postsData],
        newPostText: '',
      }

    case UPDATE_POST_TEXT:
      return {
        ...state,
        newPostText: action.newText,
      }
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      }

    default:
      return state;
  }
}

export const newPost = () => {
  return { type: ADD_POST }
}

export const updateTextPost = (text) => {
  return { type: UPDATE_POST_TEXT, newText: text }
}

export const setUserProfile = (profile) => {
  return { type: SET_USER_PROFILE, profile }
}
export const getUserProfile = (userId) => {
  return (dispatch) => {
    usersAPI.getProfile(userId)
      .then((response) => {
        dispatch(setUserProfile(response.data));
      })
  }
}
