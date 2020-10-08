import React from "react";
import styles from "./MyPosts.module.css";
import { Post } from "./Post/Post";
import { Field, reduxForm } from "redux-form";
import { required, maxLengthCreator } from "../../../utils/validators";
import { Textarea } from "../../common/FormControls/FormControls";

const maxLenghtFiled300 = maxLengthCreator(300);

export const MyPosts = (props) => {
  const postElements = props.profilePage.postsData.map((post) => (
    <Post
      key={props.profilePage.postsData.length - post.id}
      message={post.string}
      likesCount={post.likesCount}
    />
  ));

  const onSubmitPost = (postData) => {
    props.addPost(postData.newPost);
  };

  return (
    <div className={styles.posts}>
      <h3 className={styles.header}>My Posts</h3>
      <PostForm onSubmit={onSubmitPost} />
      {postElements}
    </div>
  );
};

let PostForm = (props) => {
  const { handleSubmit } = props;
  return (
    <form className={styles.newMessageForm} onSubmit={handleSubmit}>
      <Field
        name="newPost"
        component={Textarea}
        type="text"
        placeholder="Enter new post text.."
        validate={[required, maxLenghtFiled300]}
      />
      <button className={styles.btn}>Add post</button>
    </form>
  );
};

PostForm = reduxForm({ form: "posts" })(PostForm);
