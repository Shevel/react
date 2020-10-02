import React from 'react';
import Logo from './logo.png';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';
export const Header = ({ isAuth, login, email }) => {
  return (
    <header className={s.header}>
      <img className={s.logo} src={Logo} alt='logo' />
      <div>
        {
          isAuth ?
            <div className={s.login_info}>
              <p className={s.login_name}>{`Login: ${login}`}</p>
              <span className={s.login_email}>{`Email: ${email}`}</span>
            </div>
            : <NavLink className={s.login} to='/login'>Login</NavLink>
        }

      </div>
    </header>
  )
}