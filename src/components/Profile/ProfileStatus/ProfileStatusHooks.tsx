import React, { useState, useEffect } from "react";
import styles from "../Profile.module.css";
type ProfileStatusPropsType = {
  status: string
  isOwner: boolean
  updateStatus: (status: string) => void

}
export const ProfileStatusHooks: React.FC<ProfileStatusPropsType> = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    props.isOwner && setEditMode(true);
  };
  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  };
  const onStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.currentTarget.value);
  };

  return (
    <>
      {!editMode && (
        <div>
          <p className={styles.status} onClick={activateEditMode}>
            {props.status || "Set status.."}
          </p>
        </div>
      )}
      {editMode && (
        <div>
          <input
            autoFocus
            value={status}
            onChange={onStatusChange}
            onBlur={deactivateEditMode}
          />
        </div>
      )}
    </>
  );
};
