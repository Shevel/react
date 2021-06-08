import React from 'react';
import { Button } from 'antd';
import { InjectedFormProps, reduxForm } from 'redux-form';

import {
  createField,
  GetStringKeys,
  Input,
  Textarea
} from '../../common/FormControls/FormControls';
import { ProfileType } from '../../../types/types';

import s from './ProfileDataForm.module.css';
import '../../../assets/styles/buttons.css';

type PropsType = {
  profile: ProfileType;
};

type ProfileTypeKeys = GetStringKeys<ProfileType>;

const ProfileDataForm: React.FC<
  InjectedFormProps<ProfileType, PropsType> & PropsType
> = ({ handleSubmit, profile, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className={s.ProfileDataFormItem}>
        Full Name:
        {createField<ProfileTypeKeys>('Full Name', 'fullName', [], Input, {
          type: 'text'
        })}
      </div>
      <div className={s.LookingJob}>
        Looking for a job:
        <div>
          {createField<ProfileTypeKeys>('', 'lookingForAJob', [], Input, {
            type: 'checkbox'
          })}
        </div>
      </div>
      <div className={s.ProfileDataFormItem}>
        My skills:
        {createField<ProfileTypeKeys>(
          'My skills',
          'lookingForAJobDescription',
          [],
          Textarea,
          { type: 'text', class: s.ProfileDataFormTextarea }
        )}
      </div>
      <div className={s.ProfileDataFormItem}>
        About me:
        {createField<ProfileTypeKeys>('About me', 'aboutMe', [], Textarea, {
          type: 'text',
          class: s.ProfileDataFormTextarea
        })}
      </div>
      {error && (
        <div>
          <span>{error}</span>
        </div>
      )}
      {Object.keys(profile.contacts).map((key) => {
        return (
          <div key={key} style={{ margin: '5px 0' }}>
            <b style={{ textTransform: 'capitalize' }}>{key}:</b>
            {createField(key, 'contacts.' + key, [], Input, { type: 'text' })}
          </div>
        );
      })}
      <div>
        <Button style={{ margin: '5px 0' }} type='primary' onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </form>
  );
};

const ProfileDataReduxForm = reduxForm<ProfileType, PropsType>({
  form: 'profile'
})(ProfileDataForm);
export default ProfileDataReduxForm;
