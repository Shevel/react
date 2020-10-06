import React from 'react';
import defaultAvatar from '../../../assets/image/noavatar.jpg';
import s from '../Profile.module.css';
import { Preloader } from '../../common/Preloader/Preloader';
import { ProfileStatus } from '../ProfileStatus/ProfileStatus';

export const ProfileInfo = ({ profile }) => {
  if (!profile) {
    return <Preloader />
  }
  return (
    <div>
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
          <ProfileStatus status='Hello my Friends!' />
          <p className={s.about}>{`"${profile.aboutMe}"`}</p>
          <input id='lookingForaJob' type='checkbox' readOnly checked={profile.lookingForAJob} />
          <label htmlFor='lookingForaJob'>Looking for a Job</label>
        </div>
      </div>
    </div>
  )
}