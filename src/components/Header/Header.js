import React from 'react';
import Logo from './logo.png';
import s from './Header.module.css';
export const Header = () => {
  return (
    <header className={s.header}>
      <img className={s.logo} src={Logo} alt='logo' />
    </header>
  )
}