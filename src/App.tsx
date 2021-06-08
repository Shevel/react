import React from 'react';
import { Layout } from 'antd';
import { compose } from 'redux';
import { Redirect } from 'react-router';
import { Provider, connect } from 'react-redux';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';

import {
  Chat,
  News,
  Music,
  Navbar,
  Header,
  Settings,
  LoginPage,
  Preloader,
  UsersPage,
} from './components';
import { initApp } from './redux/appReducer';
import { withSuspense } from './hoc/withSuspense';
import { AppStateType, store } from './redux/redux-store';

import { ROUTES } from './constant/routes';

import 'antd/dist/antd.css';

const { Content, Footer } = Layout;
const {
  CHAT,
  NEWS,
  MUSIC,
  LOGIN,
  USERS,
  DIALOGS,
  PROFILE,
  SETTINGS,
  NOT_FOUND,
  MY_PROFILE,
} = ROUTES;

const DialogsContainer = React.lazy(
  () => import('./components/Dialogs/DialogsContainer')
);
const ProfileContainer = React.lazy(
  () => import('./components/Profile/ProfileContainer')
);

const SuspendedProfile = withSuspense(ProfileContainer);
const SuspendedDialogs = withSuspense(DialogsContainer);

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initApp: () => void;
};

class App extends React.Component<MapPropsType & DispatchPropsType> {
  catchAllUnhandledErrors = (event: PromiseRejectionEvent) => {
    alert('Some Error in App (unhandledrejection).');
  };

  componentDidMount() {
    this.props.initApp();
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  }
  componentWillUnmount() {
    window.removeEventListener(
      'unhandledrejection',
      this.catchAllUnhandledErrors
    );
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header />
        <Content>
          <Layout className='site-layout-background'>
            <Navbar />
            <Content
              style={{
                padding: '20px 80px',
                minHeight: 'calc(100vh - 64px)',
                maxWidth: 1100,
                margin: 'auto'
              }}
            >
              <Switch>
                <Route exact path='/' render={() => <Redirect to={MY_PROFILE} />} />
                <Route path={CHAT} component={Chat} />
                <Route path={DIALOGS} render={() => <SuspendedDialogs />} />
                <Route path={PROFILE} render={() => <SuspendedProfile />} />
                <Route path={USERS} render={() => <UsersPage />} />
                <Route path={LOGIN} render={() => <LoginPage />} />
                <Route path={NEWS} component={News} />
                <Route path={MUSIC} component={Music} />
                <Route path={SETTINGS} component={Settings} />
                <Route
                  path={NOT_FOUND}
                  render={() => <div>404 not found</div>}
                />
              </Switch>
            </Content>
          </Layout>
        </Content>
        <Footer
          style={{ textAlign: 'center', background: '#001529', color: '#fff' }}
        >
          2021 Created by Vladislav Shevel
        </Footer>
      </Layout>
    );
  }
}
const mapStateToProps = (state: AppStateType) => {
  return {
    initialized: state.app.initialized
  };
};

const AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initApp })
)(App);

const MainApplication: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};

export default MainApplication;
