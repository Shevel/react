import { ResultCode, ResultCodeForCaptcha } from './../api/api';
import { authAPI, securityAPI } from '../api/api';
import { stopSubmit } from 'redux-form';
import { AppStateType } from './redux-store';
import { ThunkAction } from 'redux-thunk';

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
type ActionTypes = SetCaptchaActionType | SetAuthUserDataActionType;
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
  action: ActionTypes
): InitialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
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
export type SetAuthUserDataActionType = {
  type: typeof SET_USER_DATA;
  payload: SetAuthUserDataActionPayloadType;
};
export const setAuthUserData = (
  id: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
): SetAuthUserDataActionType => {
  return { type: SET_USER_DATA, payload: { id, email, login, isAuth } };
};
type SetCaptchaActionType = {
  type: typeof SET_CAPTCHA;
  payload: { captchaURL: string | null };
};
export const setCaptcha = (captchaURL: string | null): SetCaptchaActionType => {
  return { type: SET_CAPTCHA, payload: { captchaURL } };
};
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;
export const getAuthUserData = (): ThunkType => async (dispatch) => {
  const meData = await authAPI.me();
  if (meData.resultCode === ResultCode.Success) {
    let { id, email, login } = meData.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
};
export const login = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string
): ThunkType => async (dispatch: any) => {
  const loginData = await authAPI.login(email, password, rememberMe, captcha);
  if (loginData.resultCode === ResultCode.Success) {
    dispatch(getAuthUserData());
    dispatch(setCaptcha(null));
  } else {
    if (loginData.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
      dispatch(getCaptchaUrl());
    }
    const message =
      loginData.messages.length > 0 ? loginData.messages[0] : 'some error';
    dispatch(stopSubmit('login', { _error: message }));
  }
};
export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const captchaURL = await securityAPI.getCaptchaUrl();
  dispatch(setCaptcha(captchaURL));
};
export const logout = (): ThunkType => async (dispatch) => {
  const logoutData = await authAPI.logout();
  if ((logoutData.resultCode = ResultCode.Success)) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};
