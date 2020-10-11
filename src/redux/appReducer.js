import { getAuthUserData } from "./authReducer";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

const initialState = {
  initialized: false,
};

export const appReducer = (state = initialState, action) => {
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
export const initializedSuccess = () => {
  return { type: INITIALIZED_SUCCESS };
};

export const initApp = () => {
  return (dispatch) => {
    let promise = dispatch(getAuthUserData());
    promise.then(() => {
      dispatch(initializedSuccess());
    })
  };
};