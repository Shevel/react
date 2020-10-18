import React from 'react';
import './App.css';
import { Provider, connect } from 'react-redux';
import { store } from './redux/redux-store';
import { Preloader } from './components/common/Preloader/Preloader';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import { HashRouter, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import { News } from './components/News/News';
import { Music } from './components/Music/Music';
import { Settings } from './components/Settings/Settings';
import { compose } from 'redux';
import { initApp } from './redux/appReducer';
import { withSuspense } from './hoc/withSuspense';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

class App extends React.Component {

  componentDidMount() {
    this.props.initApp();
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
          <Route path='/dialogs' render={withSuspense(DialogsContainer)} />
          <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)} />
          <Route path='/users' render={() => <UsersContainer />} />
          <Route path='/login' render={() => <Login />} />
          <Route path='/news' component={News} />
          <Route path='/music' component={Music} />
          <Route path='/settings' component={Settings} />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized,
  }
}

const AppContainer = compose(connect(mapStateToProps, { initApp }))(App);

const MainApplication = (props) => {
  return (
    <HashRouter>
      <Provider store={store} >
        <AppContainer />
      </Provider>
    </HashRouter>
  )
}

export default MainApplication;