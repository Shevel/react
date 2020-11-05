import React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { maxLengthCreator } from '../../../../utils/validators';
import { createField, GetStringKeys, Textarea } from '../../../common/FormControls/FormControls';
import styles from '../MyPosts.module.css';

const maxLengthFiled300 = maxLengthCreator(300);

type PropsType = {
}
const PostForm: React.FC<InjectedFormProps<PostFormDataType, PropsType> & PropsType> = (props) => {
  const { handleSubmit } = props;
  return (
    <form className={styles.newMessageForm} onSubmit={handleSubmit}>
      {createField<PostFormDataTypeKeys>('Enter new post text..', 'newPost', [maxLengthFiled300], Textarea, { type: 'text' })}
      <button className='btn'>Add post</button>
    </form>
  );
};
export type PostFormDataType = {
  newPost: string
}
type PostFormDataTypeKeys = GetStringKeys<PostFormDataType>;

const PostReduxForm = reduxForm<PostFormDataType, PropsType>({ form: "posts" })(PostForm);

export default PostReduxForm;