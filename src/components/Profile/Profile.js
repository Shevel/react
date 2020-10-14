import React from 'react';
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