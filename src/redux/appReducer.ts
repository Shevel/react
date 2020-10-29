import { ThunkAction } from 'redux-thunk';
import { getAuthUserData } from './authReducer';
import { AppStateType } from './redux-store';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

export type InitialStateType = {
  initialized: boolean;
};

const initialState: InitialStateType = {
  initialized: false,
};

type ActionsType = initializedSuccessActionType;

export const appReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

type initializedSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS;
};
export const initializedSuccess = (): initializedSuccessActionType => {
  return { type: INITIALIZED_SUCCESS };
};

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>;

export const initApp = (): ThunkType => (dispatch) => {
  let promise = dispatch(getAuthUserData());
  promise.then(() => {
    dispatch(initializedSuccess());
  });
};
