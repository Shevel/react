import React from 'react';
import s from './MyPosts.module.css';
import { Post } from './Post/Post';

export const MyPosts = (props) => {

  const onAddPost = () => {
    props.addPost();
  }
  const postElements = props.profilePage.postsData
    .map(post => <Post key={props.profilePage.postsData.length - post.id} message={post.string} likesCount={post.likesCount} />);

  const onChangePost = (e) => {
    const text = e.target.value;
    props.updateNewPostText(text);
  }

  return (
    <div className={s.posts}>
      <h3>My Posts</h3>
      <div className={s.newMessageBlock}>
        <textarea
          onChange={onChangePost}
          type='text'
          placeholder='Enter new post text..'
          value={props.profilePage.newPostText} />
        <button onClick={onAddPost}>Add post</button>
      </div>
      {postElements}
    </div>
  )
}