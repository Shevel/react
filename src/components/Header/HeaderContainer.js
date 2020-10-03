import React from "react";
import { Header } from "./Header";
import { connect } from "react-redux";
import { setAuthUserData } from "../../redux/authReducer";
import { isAuthThunk } from "../../redux/authReducer";

class HeaderContainer extends React.Component {
  componentDidMount() {
    this.props.isAuthThunk();
  }
  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
  email: state.auth.email,
});

export default connect(mapStateToProps, { setAuthUserData, isAuthThunk })(
  HeaderContainer
);
