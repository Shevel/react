import { ThunkAction } from 'redux-thunk';
import { getAuthUserData } from './authReducer';
import { AppStateType, InferActionsType } from './redux-store';

export type InitialStateType = {
  initialized: boolean;
};

const initialState: InitialStateType = {
  initialized: false,
};

type ActionsType = InferActionsType<typeof actions>;

export const appReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'INITIALIZED_SUCCESS':
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};
const actions = {
  initializedSuccess: () => {
    return { type: 'INITIALIZED_SUCCESS' } as const;
  },
};

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>;

export const initApp = (): ThunkType => (dispatch) => {
  let promise = dispatch(getAuthUserData());
  promise.then(() => {
    dispatch(actions.initializedSuccess());
  });
};
