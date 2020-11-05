import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AppStateType } from '../redux/redux-store';

const mapStateToPropsForRedirect = (state: AppStateType) => {
  return {
    isAuth: state.auth.isAuth,
  };
};
type MapPropsType = {
  isAuth: boolean
}
type DispatchPropsType = {
}
export function withAuthRedirect<WCP>(Component: React.ComponentType<WCP>) {
  const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    const { isAuth, ...restProps } = props;
    if (!props.isAuth) { return <Redirect to="/login" />; }
    return <Component {...restProps as WCP} />;
  }
  const ConnectedAuthRedirectComponent = connect<MapPropsType, DispatchPropsType, WCP, AppStateType>(mapStateToPropsForRedirect, {})(
    RedirectComponent
  );

  return ConnectedAuthRedirectComponent;
};
