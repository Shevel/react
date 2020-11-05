import React from 'react';
import styles from './FormControls.module.css';
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form';
import { FieldValidatorType } from '../../../utils/validators';

type FormControlsPropsType = {
  meta: WrappedFieldMetaProps
};

const FormControl: React.FC<FormControlsPropsType> = ({ meta: { touched, error }, children }) => {
  const hasError = touched && error;
  return (
    <div
      className={`${styles.textareaContainer} ${styles.formControl} ${hasError ? styles.error : ''}`}
    >
      {children}
      <div>{hasError && <span>{error}</span>}</div>
    </div>
  );
};

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  );
};
export const Input: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
    </FormControl>
  );
};

export function createField<FormKeysType extends string>(
  placeholder: string | undefined,
  name: FormKeysType,
  validators: Array<FieldValidatorType>,
  component: React.FC<WrappedFieldProps>,
  { ...props }
) {
  return (
    <Field
      name={name}
      placeholder={placeholder}
      component={component}
      validate={validators}
      {...props}
    />
  )
};
export type GetStringKeys<T> = Extract<keyof T, string>