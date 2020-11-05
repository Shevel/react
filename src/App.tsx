import React from 'react';
import './App.css';
import { Provider, connect } from 'react-redux';
import { AppStateType, store } from './redux/redux-store';
import { Preloader } from './components/common/Preloader/Preloader';
import HeaderContainer from './components/Header/HeaderContainer';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import { Redirect } from 'react-router'
import { Navbar } from './components/Navbar/Navbar';
import { LoginPage } from './components/LoginPage/LoginPage';
import { News } from './components/News/News';
import { Music } from './components/Music/Music';
import { Settings } from './components/Settings/Settings';
import { compose } from 'redux';
import { initApp } from './redux/appReducer';
import { withSuspense } from './hoc/withSuspense';
import { UsersPage } from './components/Users/UsersPage';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

const SuspendedProfile = withSuspense(ProfileContainer);
const SuspendedDialogs = withSuspense(DialogsContainer);

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initApp: () => void
}

class App extends React.Component<MapPropsType & DispatchPropsType> {
  catchAllUnhandledErrors = (event: PromiseRejectionEvent) => {
    alert('Some Error in App (unhandledrejection).');
  }

  componentDidMount() {
    this.props.initApp();
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  }
  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Switch>
            <Route exact path='/' render={() => <Redirect to='/profile' />} />
            <Route path='/dialogs' render={() => <SuspendedDialogs />} />
            <Route path='/profile/:userId?' render={() => <SuspendedProfile />} />
            <Route path='/users' render={() => <UsersPage />} />
            <Route path='/login' render={() => <LoginPage />} />
            <Route path='/news' component={News} />
            <Route path='/music' component={Music} />
            <Route path='/settings' component={Settings} />
            <Route path='*' render={() => <div>404 NOT FOUND</div>} />
          </Switch>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state: AppStateType) => {
  return {
    initialized: state.app.initialized,
  }
}

const AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initApp }))(App);

const MainApplication: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store} >
        <AppContainer />
      </Provider>
    </BrowserRouter>
  )
}

export default MainApplication;