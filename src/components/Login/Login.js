import React from "react";
import styles from "./Login.module.css";
import { Field, reduxForm } from "redux-form";
import { Input } from "../common/FormControls/FormControls";
import { required } from "../../utils/validators";
import { connect } from "react-redux";
import { login } from "../../redux/authReducer";
import { Redirect } from "react-router-dom";

let LoginForm = (props) => {
  const { handleSubmit } = props;
  return (
    <form className={styles.login_form} onSubmit={handleSubmit}>
      <div className={styles.login_input}>
        <Field
          name="email"
          placeholder="Email:"
          component={Input}
          validate={[required]}
        />
      </div>
      <div className={styles.login_input}>
        <Field
          name="password"
          type="password"
          placeholder="Password:"
          validate={[required]}
          component={Input}
        />
      </div>
      <div className={styles.remember_me}>
        <Field component={Input} name="rememberMe" type="checkbox" /> Remember
        me
      </div>
      <div className={styles.submit_btn}>
        <button type="submit">Sign In</button>
      </div>
    </form>
  );
};

LoginForm = reduxForm({ form: "login" })(LoginForm);

const Login = (props) => {
  const submit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe);
  };
  if (props.isAuth) {
    return <Redirect to="/profile" />;
  }
  return (
    <div>
      <h1 className={styles.login}>Login</h1>
      <LoginForm onSubmit={submit} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);
