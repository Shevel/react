import React from 'react';
import Img from '../profile.jpeg';
import defaultAvatar from '../../../assets/image/noavatar.jpg';
import s from '../Profile.module.css';
import { Preloader } from '../../common/Preloader/Preloader';

export const ProfileInfo = ({ profile }) => {
  if (!profile) {
    return <Preloader />
  }
  return (
    <div>
      <img className={s.img} src={Img} alt='info' />
      <div className={s.profile}>
        {
          profile.photos.large ?
            <img className={s.avatar} src={profile.photos.large} alt='ava' />
            : profile.photos.small ?
              <img className={s.avatar} src={profile.photos.small} alt='ava' />
              : <img className={s.avatar} src={defaultAvatar} alt='ava' />
        }
        <div className={s.info}>
          <p className={s.avatar__name}>{profile.fullName}</p>
          <p className={s.status}>{`"${profile.aboutMe}"`}</p>
          <input id='lookingForaJob' type='checkbox' readOnly checked={profile.lookingForAJob} />
          <label htmlFor='lookingForaJob'>Looking for a Job</label>
        </div>
      </div>
    </div>
  )
}