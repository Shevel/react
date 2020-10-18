import React from "react";
import defaultAvatar from "../../../assets/image/noavatar.jpg";
import s from "../Profile.module.css";
import { Preloader } from "../../common/Preloader/Preloader";
import { ProfileStatusHooks } from "../ProfileStatus/ProfileStatusHooks";

export const ProfileInfo = ({
  profile,
  status,
  updateStatus,
  isOwner,
  saveMainAvatar,
}) => {
  const onAvaSelected = (e) => {
    if (e.target.files.length) {
      saveMainAvatar(e.target.files[0]);
    }
  };

  if (!profile) {
    return <Preloader />;
  }
  return (
    <>
      <div className={s.profile}>
        <div className={s.ava_block}>
          <img
            className={s.avatar}
            src={profile.photos.large || profile.photos.small || defaultAvatar}
            alt="ava"
          />
          {isOwner && (
            <input
              className={s.upload_ava}
              onChange={onAvaSelected}
              type="file"
            />
          )}
        </div>

        <div className={s.info}>
          <p className={s.avatar__name}>{profile.fullName}</p>
          <ProfileStatusHooks status={status} updateStatus={updateStatus} />
          <p className={s.about}>{`About me:"${profile.aboutMe}"`}</p>
        </div>
      </div>
    </>
  );
};
