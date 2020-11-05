import React from "react";
import styles from "./Login.module.css";
import '../../assets/styles/buttons.css';
import { InjectedFormProps, reduxForm } from "redux-form";
import { Input, createField, GetStringKeys } from "../common/FormControls/FormControls";
import { required } from "../../utils/validators";
import { connect } from "react-redux";
import { login } from "../../redux/authReducer";
import { Redirect } from "react-router-dom";
import { AppStateType } from "../../redux/redux-store";

type LoginFormOwnPropsType = {
  captchaURL: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormDataType, LoginFormOwnPropsType> & LoginFormOwnPropsType> = ({ handleSubmit, error, captchaURL }) => {
  return (
    <form className={styles.login_form} onSubmit={handleSubmit}>
      <div className={styles.login_input}>
        {createField<LoginFormDataTypeKeys>('Email', 'email', [required], Input, { type: 'text' })}
      </div>
      <div className={styles.login_input}>
        {createField<LoginFormDataTypeKeys>('Password', 'password', [required], Input, { type: 'password' })}
      </div>
      <div className={styles.remember_me}>
        <span>Remember me</span>
        {createField<LoginFormDataTypeKeys>(undefined, 'rememberMe', [], Input, { type: 'checkbox' })}
      </div>
      {captchaURL && <img className={styles.captcha} src={captchaURL} alt='captcha' />}
      {captchaURL && createField<LoginFormDataTypeKeys>('Symbols from captcha', 'captcha', [required], Input, { type: 'text' })}
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

const LoginReduxForm = reduxForm<LoginFormDataType, LoginFormOwnPropsType>({ form: "login" })(LoginForm);
type MapStatePropsType = {
  captchaURL: string | null
  isAuth: boolean
}
type MapDispatchPropsType = {
  login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
  const onSubmit = (formData: LoginFormDataType) => {
    props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
  };
  if (props.isAuth) {
    return <Redirect to="/profile" />;
  }
  return (
    <div className={styles.login_page}>
      <p className={styles.login}>Login Form</p>
      <LoginReduxForm onSubmit={onSubmit} captchaURL={props.captchaURL} />
    </div>
  );
};

export type LoginFormDataType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}
type LoginFormDataTypeKeys = GetStringKeys<LoginFormDataType>


const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  captchaURL: state.auth.captchaURL,
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);
