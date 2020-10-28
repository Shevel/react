import React from 'react';
import styles from './../Dialogs.module.css';
import { NavLink } from 'react-router-dom';

type DialogPropsType = {
  path: number
  name: string
}

export const Dialog: React.FC<DialogPropsType> = ({ path, name }) => {
  const fullPath = `/dialogs/${path}`;
  return (
    <div className={`${styles.dialog} ${styles.active}`}>
      <NavLink to={fullPath}>{name}</NavLink>
    </div>
  )
}