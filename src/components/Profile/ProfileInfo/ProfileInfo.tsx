import React, { useState } from 'react';
import { Tooltip, Button } from 'antd';
import { EditOutlined, FileAddOutlined } from '@ant-design/icons';

import { Preloader } from '../../';
import { ContactsType, ProfileType } from '../../../types/types';
import ProfileDataReduxForm from '../ProfileDataForm/ProfileDataForm';
import { ProfileStatusHooks } from '../ProfileStatus/ProfileStatusHooks';

import defaultAvatar from '../../../assets/image/noavatar.jpg';

import s from '../Profile.module.css';
import '../../../assets/styles/buttons.css';

type PropsType = {
  profile: ProfileType | null;
  status: string;
  updateStatus: (status: string) => void;
  isOwner: boolean;
  saveMainAvatar: (file: File) => void;
  saveProfile: (formData: ProfileType) => Promise<void>;
};
export const ProfileInfo: React.FC<PropsType> = ({
  profile,
  status,
  isOwner,
  updateStatus,
  saveMainAvatar,
  saveProfile
}) => {
  const [editMode, setEditMode] = useState(false);

  const onAvaSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      saveMainAvatar(e.target.files[0]);
    }
  };
  const onSubmit = (formData: ProfileType) => {
    // todo: remove then from this place
    saveProfile(formData).then(() => {
      setEditMode(false);
    });
  };

  if (!profile) {
    return <Preloader />;
  }
  return (
    <>
      <div className={s.profile}>
        <div className={s.info}>
          <div className={s.full_name}>{profile.fullName}</div>
          <ProfileStatusHooks
            status={status}
            updateStatus={updateStatus}
            isOwner={isOwner}
          />
          {editMode ? (
            <ProfileDataReduxForm
              onSubmit={onSubmit}
              initialValues={profile}
              profile={profile}
            />
          ) : (
            <ProfileData
              activateEditMode={() => {
                setEditMode(true);
              }}
              profile={profile}
              isOwner={isOwner}
            />
          )}
        </div>
        <div className={s.ava_block}>
          <div className={s.ava_image}>
            <img
              className={s.avatar}
              src={
                profile.photos?.large || profile.photos?.small || defaultAvatar
              }
              alt='ava'
            />
            {isOwner && (
              <div className={s.ava_uploader}>
                <input
                  className={s.upload_ava}
                  onChange={onAvaSelected}
                  type='file'
                  id='file'
                />
                <Tooltip placement='bottom' title='Change and upload avatar'>
                  <label className={s.ava_label} htmlFor='file'>
                    <FileAddOutlined
                      style={{
                        fontSize: '18px',
                        color: 'lightcyan',
                        marginBottom: 15
                      }}
                    />
                  </label>
                </Tooltip>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
type ProfileDataPropsType = {
  profile: ProfileType;
  isOwner: boolean;
  activateEditMode: () => void;
};
const ProfileData: React.FC<ProfileDataPropsType> = ({
  profile,
  isOwner,
  activateEditMode
}) => {
  return (
    <div className={s.profile_data}>
      {isOwner && (
        <Tooltip placement='left' title='Edit'>
          <Button
            shape='round'
            className={`${s.activate_edit_btn}`}
            onClick={activateEditMode}
            icon={<EditOutlined />}
          />
        </Tooltip>
      )}
      {profile.aboutMe && (
        <div className={s.about_me}>
          <b>About me:</b>
          <i>{` ${profile.aboutMe}`}</i>
        </div>
      )}
      {profile.lookingForAJobDescription !== 'null' && (
        <div className={s.about_me}>
          <b>My skills:</b>
          {` ${profile.lookingForAJobDescription}`}
        </div>
      )}
      <label className={s.about_me} htmlFor='lookingForaJob'>
        <b>Looking for a Job</b>
      </label>
      <input
        id='lookingForaJob'
        type='checkbox'
        readOnly
        checked={profile.lookingForAJob}
      />
      {Object.keys(profile.contacts).map((key) => {
        return (
          <Contact
            key={key}
            contactTitle={key}
            contactValue={profile.contacts[key as keyof ContactsType]}
          />
        );
      })}
    </div>
  );
};
type ContactPropsType = {
  contactTitle: string;
  contactValue: string;
};
const Contact: React.FC<ContactPropsType> = ({
  contactTitle,
  contactValue
}) => {
  return contactValue && contactValue.length ? (
    <div className={s.contact}>
      <div className={s.contact_title}>{`${contactTitle}:`}</div>
      <div className={s.contact_value}>{` ${contactValue}`}</div>
    </div>
  ) : (
    <></>
  );
};
