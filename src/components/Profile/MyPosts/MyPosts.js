import React from 'react';
import styles from './MyPosts.module.css';
import { Post } from './Post/Post';
import { Field, reduxForm } from 'redux-form';

export const MyPosts = (props) => {

  const postElements = props.profilePage.postsData
    .map(post => <Post key={props.profilePage.postsData.length - post.id} message={post.string} likesCount={post.likesCount} />);

  const onSubmitPost = (postData) => {
    props.addPost(postData.newPost);
  }

  return (
    <div className={styles.posts}>
      <h3 className={styles.header}>My Posts</h3>
      <PostForm
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
        type='text'
        placeholder='Enter new post text..'
      />
      <button>Add post</button>
    </form>
  )
}

PostForm = reduxForm({ form: 'posts' })(PostForm);