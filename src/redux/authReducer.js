import { authAPI } from "../api/api";
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = "auth/SET_USER_DATA";

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
        ...action.payload,
      };
    default:
      return state;
  }
};
export const setAuthUserData = (id, email, login, isAuth) => {
  return { type: SET_USER_DATA, payload: { id, email, login, isAuth } };
};

export const getAuthUserData = () => async (dispatch) => {
  const response = await authAPI.me()
  if (!response.data.resultCode) {
    let { id, email, login } = response.data.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
};

export const login = (email, password, rememberMe) => async (dispatch) => {
  const response = await authAPI.login(email, password, rememberMe)
  if (!response.data.resultCode) {
    dispatch(getAuthUserData());
  } else {
    const message = response.data.messages.length > 0 ? response.data.messages[0] : 'some error';
    dispatch(stopSubmit('login', { _error: message }));
  }
};

export const logout = () => async (dispatch) => {
  const response = await authAPI.logout()
  if (!response.data.resultCode) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};
