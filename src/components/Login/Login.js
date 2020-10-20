import React from "react";
import styles from "./Login.module.css";
import '../../assets/styles/buttons.css';
import { reduxForm } from "redux-form";
import { Input, createField } from "../common/FormControls/FormControls";
import { required } from "../../utils/validators";
import { connect } from "react-redux";
import { login } from "../../redux/authReducer";
import { Redirect } from "react-router-dom";

let LoginForm = ({ handleSubmit, error }) => {
  return (
    <form className={styles.login_form} onSubmit={handleSubmit}>
      <div className={styles.login_input}>
        {createField('Email', 'email', [required], Input)}
      </div>
      <div className={styles.login_input}>
        {createField('Password', 'password', [required], Input, { type: 'password' })}
      </div>
      <div className={styles.remember_me}>
        <span>Remember me</span>
        {createField(null, 'rememberMe', [], Input, { type: 'checkbox' })}
      </div>
      <div className={styles.btn}>
        <button className='btn' type="submit">Sign In</button>
      </div>
      {
        error && <div className={styles.summaryErrorBlock}>
          <span className={styles.summaryErrorBlock__message}>{error}</span>
        </div>
      }
    </form>
  );
};

LoginForm = reduxForm({ form: "login" })(LoginForm);

const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe);
  };
  if (props.isAuth) {
    return <Redirect to="/profile" />;
  }
  return (
    <div className={styles.login_page}>
      <p className={styles.login}>Login Form</p>
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);
