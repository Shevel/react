import React from "react";
import styles from "./Login.module.css";
import '../../assets/styles/buttons.css';
import { InjectedFormProps, reduxForm } from "redux-form";
import { Input, createField, GetStringKeys } from "../common/FormControls/FormControls";
import { required } from "../../utils/validators";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/authReducer";
import { Redirect } from "react-router-dom";
import { AppStateType } from "../../redux/redux-store";
import { Button } from "antd";
import classnames from 'classnames';

type LoginFormOwnPropsType = {
  captchaURL: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormDataType, LoginFormOwnPropsType> & LoginFormOwnPropsType> = ({ handleSubmit, error, captchaURL }) => {
  return (
    <form className={styles.login_form} onSubmit={handleSubmit}>
      <div className={classnames(styles.login_input, styles.mb_20)}>
        {createField<LoginFormDataTypeKeys>('Email', 'email', [required], Input, { type: 'text' })}
      </div>
      <div className={classnames(styles.login_input, styles.mb_20)}>
        {createField<LoginFormDataTypeKeys>('Password', 'password', [required], Input, { type: 'password' })}
      </div>
      <div className={classnames(styles.remember_me, styles.mb_20)}>
        <span>Remember me</span>
        {createField<LoginFormDataTypeKeys>(undefined, 'rememberMe', [], Input, { type: 'checkbox' })}
      </div>
      {captchaURL && <img className={styles.captcha} src={captchaURL} alt='captcha' />}
      {captchaURL && createField<LoginFormDataTypeKeys>('Symbols from captcha', 'captcha', [required], Input, { type: 'text' })}
      <div className={styles.btn}>
        <Button type="primary" onClick={handleSubmit}>Sign In</Button>
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

export const LoginPage: React.FC = () => {
  const captchaURL = useSelector((state: AppStateType) => state.auth.captchaURL);
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
  const dispatch = useDispatch();
  const onSubmit = (formData: LoginFormDataType) => {
    dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha));
  };
  if (isAuth) {
    return <Redirect to="/profile" />;
  }
  return (
    <div className={styles.login_page}>
      <p className={styles.login}>Sign In</p>
      <LoginReduxForm onSubmit={onSubmit} captchaURL={captchaURL} />
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

