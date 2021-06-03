import React from "react";

import { ProfileType } from "../../types/types";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

type PropsType = {
  profile: ProfileType | null
  status: string
  isOwner: boolean
  updateStatus: (status: string) => void
  saveMainAvatar: (file: File) => void
  saveProfile: (formData: ProfileType) => Promise<void>
}
export const Profile: React.FC<PropsType> = ({
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
