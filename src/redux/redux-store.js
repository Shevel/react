import { createStore, combineReducers, applyMiddleware } from 'redux';
import { profileReducer } from './profileReducer';
import { dialogsReducer } from './dialogsReducer';
import { sidebarReducer } from './sidebarReducer';
import { usersReducer } from './usersReducer';
import { authReducer } from './authReducer';
import { appReducer } from './appReducer';
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware from 'redux-thunk';


const reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  form: formReducer,
});

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;