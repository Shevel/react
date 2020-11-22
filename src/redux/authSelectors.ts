import { AppStateType } from './redux-store';

export const getIsAuth = (state: AppStateType) => {
  return state.auth.isAuth;
};
export const getLogin = (state: AppStateType) => {
  return state.auth.login;
};
export const getEmail = (state: AppStateType) => {
  return state.auth.email;
};
