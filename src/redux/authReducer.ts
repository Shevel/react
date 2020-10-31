import { ResultCode, ResultCodeForCaptcha } from './../api/api';
import { authAPI, securityAPI } from '../api/api';
import { stopSubmit } from 'redux-form';
import { AppStateType, InferActionsType } from './redux-store';
import { ThunkAction } from 'redux-thunk';

type InitialStateType = {
  id: null | number;
  email: null | string;
  login: null | string;
  isFetching: boolean;
  isAuth: boolean;
  captchaURL: null | string;
};
type ActionTypes = InferActionsType<typeof actions>;

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
    case 'SET_USER_DATA':
    case 'SET_CAPTCHA':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
const actions = {
  setAuthUserData: (
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
  ) => {
    return {
      type: 'SET_USER_DATA',
      payload: { id, email, login, isAuth },
    } as const;
  },
  setCaptcha: (captchaURL: string | null) => {
    return { type: 'SET_CAPTCHA', payload: { captchaURL } } as const;
  },
};

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;
export const getAuthUserData = (): ThunkType => async (dispatch) => {
  const meData = await authAPI.me();
  if (meData.resultCode === ResultCode.Success) {
    let { id, email, login } = meData.data;
    dispatch(actions.setAuthUserData(id, email, login, true));
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
    dispatch(actions.setCaptcha(null));
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
  dispatch(actions.setCaptcha(captchaURL));
};
export const logout = (): ThunkType => async (dispatch) => {
  const logoutData = await authAPI.logout();
  if (logoutData.resultCode === ResultCode.Success) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
};
