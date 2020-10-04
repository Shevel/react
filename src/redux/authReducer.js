import { authAPI } from "../api/api";
const SET_USER_DATA = "SET_USER_DATA";

const initialState = {
  id: null,
  email: null,
  login: null,
  isFetching: false,
  isAuth: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.data,
        isAuth: true,
      };
    default:
      return state;
  }
};

export const getAuthUserData = () => {
  return (dispatch) => {
    authAPI.me().then((response) => {
      if (response.data.resultCode === 0) {
        let { id, email, login } = response.data.data;
        dispatch(setAuthUserData(id, email, login));
      }
    });
  };
};

export const setAuthUserData = (id, email, login) => {
  // Utils
  return { type: SET_USER_DATA, data: { id, email, login } };
};
