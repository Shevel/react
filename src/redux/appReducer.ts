import { getAuthUserData } from './authReducer';
import { InferActionsType, BaseThunkType } from './redux-store';

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

type ThunkType = BaseThunkType<ActionsType, void>;

export const initApp = (): ThunkType => (dispatch) => {
  let promise = dispatch(getAuthUserData());
  promise.then(() => {
    dispatch(actions.initializedSuccess());
  });
};
