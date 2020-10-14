import React from "react";
import styles from "./FormControls.module.css";
import { Field } from 'redux-form';

const FormControl = ({ input, meta, child, ...props }) => {
  const hasError = meta.touched && meta.error;
  return (
    <div
      className={`${styles.textareaContainer} ${styles.formControl} ${(hasError ? styles.error : "")}`}
    >
      {props.children}
      <div>{hasError && <span>{meta.error}</span>}</div>
    </div>
  );
};

export const Textarea = (props) => {
  const { input, meta, child, ...restProps } = props;
  return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
};
export const Input = (props) => {
  const { input, meta, child, ...restProps } = props;
  return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
};
export const createField = (placeholder, name, validators, component, props) => (
  <Field
    name={name}
    placeholder={placeholder}
    component={component}
    validate={validators}
    {...props}
  />
)
