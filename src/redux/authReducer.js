import { authAPI, securityAPI } from "../api/api";
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = "auth/SET_USER_DATA";
const SET_CAPTCHA = "auth/SET_CAPTCHA";

const initialState = {
  id: null,
  email: null,
  login: null,
  isFetching: false,
  isAuth: false,
  captchaURL: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
    case SET_CAPTCHA:
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
export const setCaptcha = (captchaURL) => {
  return { type: SET_CAPTCHA, payload: { captchaURL } };
};

export const getAuthUserData = () => async (dispatch) => {
  const response = await authAPI.me()
  if (!response.data.resultCode) {
    let { id, email, login } = response.data.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
};

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
  const response = await authAPI.login(email, password, rememberMe, captcha);
  if (!response.data.resultCode) {
    dispatch(getAuthUserData());
    dispatch(setCaptcha(null));
  } else {
    if (response.data.resultCode === 10) {
      dispatch(getCaptchaUrl());
    }
    const message = response.data.messages.length > 0 ? response.data.messages[0] : 'some error';
    dispatch(stopSubmit('login', { _error: message }));
  }
};


export const getCaptchaUrl = () => async (dispatch) => {
  const response = await securityAPI.getCaptchaUrl();
  const captchaURL = response.data.url;
  dispatch(setCaptcha(captchaURL))
};

export const logout = () => async (dispatch) => {
  const response = await authAPI.logout()
  if (!response.data.resultCode) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};
