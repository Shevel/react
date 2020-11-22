import React from 'react';
import 'antd/dist/antd.css';
import { Provider, connect } from 'react-redux';
import { AppStateType, store } from './redux/redux-store';
import { Preloader } from './components/common/Preloader/Preloader';
import { Header } from './components/Header/Header';
import { BrowserRouter, Link, Route, Switch, withRouter } from 'react-router-dom';
import { Redirect } from 'react-router'
import { LoginPage } from './components/LoginPage/LoginPage';
import { News } from './components/News/News';
import { Music } from './components/Music/Music';
import { Settings } from './components/Settings/Settings';
import { compose } from 'redux';
import { initApp } from './redux/appReducer';
import { withSuspense } from './hoc/withSuspense';
import { UsersPage } from './components/Users/UsersPage';

import { Layout } from 'antd';
import { Navbar } from './components/Navbar/Navbar';

const { Content, Footer } = Layout;

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
      <Layout>
        <Header />
        <Content style={{ padding: '0 50px' }}>
          <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
            <Navbar />
            <Content style={{ padding: '0 50px', minHeight: 280 }}>
              <Switch>
                <Route exact path='/' render={() => <Redirect to='/login' />} />
                <Route path='/dialogs' render={() => <SuspendedDialogs />} />
                <Route path='/profile/:userId?' render={() => <SuspendedProfile />} />
                <Route path='/users' render={() => <UsersPage />} />
                <Route path='/login' render={() => <LoginPage />} />
                <Route path='/news' component={News} />
                <Route path='/music' component={Music} />
                <Route path='/settings' component={Settings} />
                <Route path='*' render={() => <div>404 not found</div>} />
              </Switch>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>2020 Created by Vladislav Shevel</Footer>
      </Layout>
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