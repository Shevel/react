import { authAPI, securityAPI } from '../api/api';
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'auth/SET_USER_DATA';
const SET_CAPTCHA = 'auth/SET_CAPTCHA';

type InitialStateType = {
  id: null | number;
  email: null | string;
  login: null | string;
  isFetching: boolean;
  isAuth: boolean;
  captchaURL: null | string;
};

const initialState: InitialStateType = {
  id: null,
  email: null,
  login: null,
  isFetching: false,
  isAuth: false,
  captchaURL: null,
};

export const authReducer = (
  state = initialState,
  action: any
): InitialStateType => {
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

type SetAuthUserDataActionPayloadType = {
  id: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
};
type SetAuthUserDataAvtionType = {
  type: typeof SET_USER_DATA;
  payload: SetAuthUserDataActionPayloadType;
};
export const setAuthUserData = (
  id: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
): SetAuthUserDataAvtionType => {
  return { type: SET_USER_DATA, payload: { id, email, login, isAuth } };
};
type SetCaptchaActionType = {
  type: typeof SET_CAPTCHA;
  payload: { captchaURL: string | null };
};

export const setCaptcha = (captchaURL: string | null): SetCaptchaActionType => {
  return { type: SET_CAPTCHA, payload: { captchaURL } };
};

export const getAuthUserData = () => async (dispatch: any) => {
  const response = await authAPI.me();
  if (!response.data.resultCode) {
    let { id, email, login } = response.data.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
};

export const login = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string
) => async (dispatch: any) => {
  const response = await authAPI.login(email, password, rememberMe, captcha);
  if (!response.data.resultCode) {
    dispatch(getAuthUserData());
    dispatch(setCaptcha(null));
  } else {
    if (response.data.resultCode === 10) {
      dispatch(getCaptchaUrl());
    }
    const message =
      response.data.messages.length > 0
        ? response.data.messages[0]
        : 'some error';
    dispatch(stopSubmit('login', { _error: message }));
  }
};

export const getCaptchaUrl = () => async (dispatch: any) => {
  const response = await securityAPI.getCaptchaUrl();
  const captchaURL = response.data.url;
  dispatch(setCaptcha(captchaURL));
};

export const logout = () => async (dispatch: any) => {
  const response = await authAPI.logout();
  if (!response.data.resultCode) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};
