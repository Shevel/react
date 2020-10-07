import React from 'react';
// import s from './Profile.module.css';
import { MyPostsContainer } from './MyPosts/MyPostsContainer';
import { ProfileInfo } from './ProfileInfo/ProfileInfo';


export const Profile = ({ profile, status, updateStatus }) => {
  return (
    <div>
      <ProfileInfo profile={profile} status={status} updateStatus={updateStatus} />
      <MyPostsContainer />
    </div>
  )
}