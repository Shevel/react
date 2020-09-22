import React from 'react';
import Img from '../profile.jpeg';
import s from '../Profile.module.css';

export const ProfileInfo = () => {
  return (
    <div>
      <img className={s.img} src={Img} alt='info'/>
      <div className={s.descriptionBlock}>ava + description</div>
    </div>
  )
}