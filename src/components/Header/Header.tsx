import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Layout, Col, Row, Avatar } from 'antd';

import Logo from './logo.png';
import s from './Header.module.css';
import { logout } from '../../redux/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import { getIsAuth, getLogin } from '../../redux/authSelectors';

import '../../assets/styles/buttons.css';
import '../../assets/styles/buttons.css';

type PropsType = {};

const Header: React.FC<PropsType> = () => {
  const { Header } = Layout;
  const isAuth = useSelector(getIsAuth);
  const login = useSelector(getLogin);
  const dispatch = useDispatch();
  const logoutCallback = () => {
    dispatch(logout());
  };
  return (
    <Header>
      <Row justify='space-between' align='middle'>
        {isAuth ? (
          <>
            <Col>
              <img className={s.logo} src={Logo} alt='logo' />
            </Col>
            <Col flex='align(-self): center'>
              <div className={s.login_block}>
                <div className={s.login_info}>
                  <Avatar className={s.login_name}>{login?.slice(0, 1)}</Avatar>
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
              <img className={s.logo} src={Logo} alt='logo' />
            </Col>
            <Col>
              <NavLink className={s.login} to='/login'>
                <Button type='primary'>Login</Button>
              </NavLink>
            </Col>
          </>
        )}
      </Row>
    </Header>
  );
};
export default Header;