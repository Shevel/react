import React from "react";
import Logo from "./logo.png";
import s from "./Header.module.css";
import "../../assets/styles/buttons.css";
import "../../assets/styles/buttons.css";
import { NavLink } from "react-router-dom";
type PropsType = {
  isAuth: boolean
  login: string | null
  email: string | null
  logout: () => void
}
export const Header: React.FC<PropsType> = (props) => {
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
            <button className="btn" onClick={props.logout}>
              Logout
            </button>
          </div>
        ) : (
            <NavLink className={s.login} to="/login">
              <button className='btn'>Login</button>
            </NavLink>
          )}
      </div>
    </header>
  );
};
