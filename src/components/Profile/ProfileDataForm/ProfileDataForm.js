import React from 'react';
import { reduxForm } from "redux-form";
import { createField, Input, Textarea } from '../../common/FormControls/FormControls';
import '../../../assets/styles/buttons.css';

let ProfileDataForm = ({ handleSubmit, profile, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div ><b>Full Name:</b>{createField('Full Name', 'fullName', [], Input)}</div>
      <div ><b>Looking for a job:</b>{createField('', 'lookingForAJob', [], Input, { type: 'checkbox' })}</div>
      <div ><b>My skills:</b>{createField('My skills', 'lookingForAJobDescription', [], Textarea)}</div>
      <div ><b>About me:</b>{createField('About me', 'aboutMe', [], Textarea)}</div>
      {error && <div>
        <span>{error}</span>
      </div>}
      {
        Object.keys(profile.contacts).map(key => {
          return (
            <div key={key}>
              <b>{key}</b>{createField(key, 'contacts.' + key, [], Input)}
            </div>
          )
        })
      }
      <div><button className='btn'>Save</button></div>
    </form>
  )
}

export default ProfileDataForm = reduxForm({ form: "profile" })(ProfileDataForm);