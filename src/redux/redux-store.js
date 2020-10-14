import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

window.__store__ = store;