import React from "react";
import Logo from "./logo.png";
import s from "./Header.module.css";
import "../../assets/styles/buttons.css";
import "../../assets/styles/buttons.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIsAuth, getLogin } from "../../redux/authSelectors";
import { logout } from "../../redux/authReducer";
import { Button, Layout, Col, Row } from "antd";

type PropsType = {}
export const Header: React.FC<PropsType> = () => {
  const { Header } = Layout;
  const isAuth = useSelector(getIsAuth);
  const login = useSelector(getLogin);
  const dispatch = useDispatch();
  const logoutCallback = () => {
    dispatch(logout());
  }
  return (
    <Header>
      <Row justify="space-between">
        {isAuth ? (
          <>
            <Col>
              <img className={s.logo} src={Logo} alt="logo" />
            </Col>
            <Col>
              <div className={s.login_block}>
                <div className={s.login_info}>
                  <span className={s.login_name}>{`Login: ${login}`}</span>
                </div>
                <Button type='primary' onClick={logoutCallback}>
                  Logout
            </Button>
              </div>
            </Col>
          </>
        ) : (
            <>
              <Col>
                <img className={s.logo} src={Logo} alt="logo" />
              </Col>
              <Col>
                <NavLink className={s.login} to="/login">
                  <Button type='primary'>Login</Button>
                </NavLink>
              </Col>
            </>
          )}
      </Row>
    </Header >
  );
};
