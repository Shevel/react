import React from 'react';
import styles from './MyPosts.module.css';
import { Post } from './Post/Post';
import { Field, reduxForm } from 'redux-form';

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
  const onSubmitPost = (postData) => {
    console.log(postData)
  }

  return (
    <div className={styles.posts}>
      <h3 className={styles.header}>My Posts</h3>
      <PostForm
        onChangePost={onChangePost}
        newPostText={props.profilePage.newPostText}
        onAddPost={onAddPost}
        onSubmit={onSubmitPost}
      />
      {postElements}
    </div>
  )
}

let PostForm = (props) => {
  const { handleSubmit } = props;
  return (
    <form
      className={styles.newMessageForm}
      onSubmit={handleSubmit}
    >
      <Field
        name='newPost'
        component='textarea'
        onChange={props.onChangePost}
        type='text'
        placeholder='Enter new post text..'
      // value={props.newPostText}
      />
      <button onClick={props.onAddPost}>Add post</button>
    </form>
  )
}

PostForm = reduxForm({ form: 'posts' })(PostForm);