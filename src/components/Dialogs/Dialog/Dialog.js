import React from 'react';
import s from './../Dialogs.module.css';
import { NavLink } from 'react-router-dom';

export const Dialog = (props) => {
  const path = `/dialogs/${props.path}`;
  return (
    <div className={`${s.dialog} ${s.active}`}>
      <NavLink to={path}>{props.name}</NavLink>
    </div>
  )
}