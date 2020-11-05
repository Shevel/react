import React from "react";
import { Header } from "./Header";
import { connect } from "react-redux";
import { logout } from "../../redux/authReducer";
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store";
type PropsType = MapStateProps & MapDispatchProps;
type MapStateProps = {
  isAuth: boolean
  login: string | null
  email: string | null
}
type MapDispatchProps = {
  logout: () => void
}
class HeaderContainer extends React.Component<PropsType> {
  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state: AppStateType): MapStateProps => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
  email: state.auth.email,
});

export default compose<React.ComponentType>(connect<MapStateProps, MapDispatchProps, {}, AppStateType>(mapStateToProps, { logout }))(
  HeaderContainer
);
