import React from 'react';
import styles from './Login.module.css';
import { Field, reduxForm } from 'redux-form';

let LoginForm = (props) => {
  const { handleSubmit } = props
  return (
    <form
      className={styles.login_form}
      onSubmit={handleSubmit}
    >
      <div className={styles.login_input}>
        <Field name='login' placeholder='Login:' component={'input'} />
      </div>
      <div className={styles.login_input}>
        <Field name='password' type='password' placeholder='Password:' component={'input'} />
      </div>
      <div className={styles.remember_me}>
        <Field component={'input'} name='rememberMe' type='checkbox' /> Remember me
        </div>
      <div className={styles.submit_btn}>
        <button type='submit'>Sign In</button>
      </div>
    </form>
  )
}

LoginForm = reduxForm({ form: 'login' })(LoginForm)

export const Login = () => {
  const submit = (formData) => {
    console.log(formData)
  }
  return (
    <div>
      <h1 className={styles.login}>Login</h1>
      <LoginForm onSubmit={submit} />
    </div>
  )
}
