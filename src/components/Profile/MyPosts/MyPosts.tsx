import React from "react";

import { Post } from "./Post/Post";
import { PostType } from "../../../types/types";
import PostReduxFrom, { PostFormDataType } from './AddPostForm/AddPostForm';

import styles from "./MyPosts.module.css";
import '../../../assets/styles/buttons.css';

export type MapPropsType = {
  postsData: Array<PostType>
}

export type MapDispatchType = {
  addPost: (newPost: string) => void
}

const MyPosts: React.FC<MapPropsType & MapDispatchType> = (props) => {
  const postElements = props.postsData.map((post) => (
    <Post
      key={props.postsData.length - post.id}
      message={post.string}
      likesCount={post.likesCount}
    />
  ));

  const onSubmitPost = (postData: PostFormDataType) => {
    props.addPost(postData.newPost);
  };

  return (
    <div className={styles.posts}>
      <h3 className={styles.header}>My Posts</h3>
      <PostReduxFrom onSubmit={onSubmitPost} />
      {postElements}
    </div>
  );
}

const MyPostsMemorized = React.memo(MyPosts);

export default MyPostsMemorized;
