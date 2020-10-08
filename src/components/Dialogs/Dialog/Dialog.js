import React from 'react';
import styles from './../Dialogs.module.css';
import { NavLink } from 'react-router-dom';

export const Dialog = (props) => {
  const path = `/dialogs/${props.path}`;
  return (
    <div className={`${styles.dialog} ${styles.active}`}>
      <NavLink to={path}>{props.name}</NavLink>
    </div>
  )
}