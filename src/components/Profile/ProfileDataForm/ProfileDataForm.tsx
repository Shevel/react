import React from 'react';
import { InjectedFormProps, reduxForm } from "redux-form";
import { createField, GetStringKeys, Input, Textarea } from '../../common/FormControls/FormControls';
import '../../../assets/styles/buttons.css';
import { ProfileType } from '../../../types/types';
import { Button } from 'antd';

type PropsType = {
  profile: ProfileType;
}
type ProfileTypeKeys = GetStringKeys<ProfileType>;

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({ handleSubmit, profile, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div ><b>Full Name:</b>{createField<ProfileTypeKeys>('Full Name', 'fullName', [], Input, { type: 'text' })}</div>
      <div ><b>Looking for a job:</b>{createField<ProfileTypeKeys>('', 'lookingForAJob', [], Input, { type: 'checkbox' })}</div>
      <div ><b>My skills:</b>{createField<ProfileTypeKeys>('My skills', 'lookingForAJobDescription', [], Textarea, { type: 'text' })}</div>
      <div ><b>About me:</b>{createField<ProfileTypeKeys>('About me', 'aboutMe', [], Textarea, { type: 'text' })}</div>
      {error && <div>
        <span>{error}</span>
      </div>}
      {
        Object.keys(profile.contacts).map(key => {
          return (
            <div key={key}>
              <b>{key}</b>{createField(key, 'contacts.' + key, [], Input, { type: 'text' })}
            </div>
          )
        })
      }
      <div><Button type='primary' onClick={handleSubmit}>Save</Button></div>
    </form>
  )
}

const ProfileDataReduxForm = reduxForm<ProfileType, PropsType>({ form: "profile" })(ProfileDataForm);
export default ProfileDataReduxForm;