import React from "react";
import Logo from "./logo.png";
import s from "./Header.module.css";
import { NavLink } from "react-router-dom";

export const Header = (props) => {
  console.log(props)
  return (
    <header className={s.header}>
      <img className={s.logo} src={Logo} alt="logo" />
      <div>
        {props.isAuth ? (
          <div className={s.login_block}>
            <div className={s.login_info}>
              <p className={s.login_name}>{`Login: ${props.login}`}</p>
              <span className={s.login_email}>{`Email: ${props.email}`}</span>
            </div>
            <button className={s.logout_btn} onClick={props.logout}>
              Logout
            </button>
          </div>
        ) : (
          <NavLink className={s.login} to="/login">
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
};
