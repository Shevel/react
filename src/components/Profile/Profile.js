import React from "react";
import { MyPostsContainer } from "./MyPosts/MyPostsContainer";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";

export const Profile = ({
  profile,
  status,
  updateStatus,
  isOwner,
  saveMainAvatar,
  saveProfile
}) => {
  return (
    <div>
      <ProfileInfo
        isOwner={isOwner}
        profile={profile}
        status={status}
        updateStatus={updateStatus}
        saveMainAvatar={saveMainAvatar}
        saveProfile={saveProfile}
      />
      <MyPostsContainer />
    </div>
  );
};
