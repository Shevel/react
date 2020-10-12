import React, { useState, useEffect } from "react";
import styles from "../Profile.module.css";

export const ProfileStatusHooks = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(true);
  };
  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  };
  const onStatusChange = (event) => {
    setStatus(event.currentTarget.value);
  };

  return (
    <>
      {!editMode && (
        <div>
          <span className={styles.status} onClick={activateEditMode}>
            {props.status || "Set status.."}
          </span>
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
