import React from 'react';
import styles from './Post.module.css';

export const Post = (props) => {
  return (
    <div className={styles.post}>
      <img src='https://avatars.mds.yandex.net/get-pdb/1352825/a5f8fbd7-515e-49f8-81d6-be55a2daac92/s600' alt='post' />
      {props.message}
      <br />
      <span>Like {props.likesCount}</span>
    </div>
  )
}