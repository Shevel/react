import React, { useState } from "react";
import defaultAvatar from "../../../assets/image/noavatar.jpg";
import s from "../Profile.module.css";
import '../../../assets/styles/buttons.css';
import { Preloader } from "../../common/Preloader/Preloader";
import { ProfileStatusHooks } from "../ProfileStatus/ProfileStatusHooks";
import ProfileDataForm from '../ProfileDataForm/ProfileDataForm';
import addIcon from '../../../assets/icon/add.png';
import editIcon from '../../../assets/icon/edit.svg';

export const ProfileInfo = ({ profile, status, updateStatus, isOwner, saveMainAvatar, saveProfile }) => {

  const [editMode, setEditMode] = useState(false);

  const onAvaSelected = (e) => {
    if (e.target.files.length) {
      saveMainAvatar(e.target.files[0]);
    }
  };
  const onSubmit = (formData) => {
    saveProfile(formData).then(() => {
      setEditMode(false);
    })
  };

  if (!profile) {
    return <Preloader />;
  }
  return (
    <>
      <div className={s.profile}>
        <div className={s.ava_block}>
          <div className={s.ava_image}>
            <img
              className={s.avatar}
              src={profile.photos.large || profile.photos.small || defaultAvatar}
              alt="ava"
            />
            {isOwner && (
              <div className={s.ava_uploader}>
                <input className={s.upload_ava} onChange={onAvaSelected} type="file" id='file' />
                <label className={s.ava_label} title='Change and upload avatar' htmlFor="file"
                >Change avatar <img src={addIcon} alt='addIcon' height='20' /></label>
              </div>
            )}
          </div>
        </div>
        <div className={s.info}>
          <div className={s.full_name}>{profile.fullName}</div>
          <ProfileStatusHooks status={status} updateStatus={updateStatus} />
          {editMode
            ? <ProfileDataForm onSubmit={onSubmit} initialValues={profile} profile={profile} />
            : <ProfileData activateEditMode={() => { setEditMode(true) }} profile={profile} isOwner={isOwner} />}
        </div>
      </div>
    </>
  );
};

const ProfileData = ({ profile, isOwner, activateEditMode }) => {
  return (
    <div className={s.profile_data}>
      {isOwner &&
        <button className={`${s.activate_edit_btn} btn`} onClick={activateEditMode}><img width={20} src={editIcon} alt='editIcon' /></button>}
      <div className={s.about_me}><b>About me:</b>{` ${profile.aboutMe}`}</div>
      <div className={s.about_me}><b>My skills:</b>{` ${profile.lookingForAJobDescription}`}</div>
      <label className={s.about_me} htmlFor='lookingForaJob'><b>Looking for a Job</b></label>
      <input id='lookingForaJob' type='checkbox' readOnly checked={profile.lookingForAJob} />
      {
        Object.keys(profile.contacts).map(key => {
          return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
        })
      }
    </div>
  )
}


const Contact = ({ contactTitle, contactValue }) => {
  return (
    <div className={s.contact_value}><b className={s.contact_title}>{contactTitle}</b>: {contactValue}</div>
  )
}