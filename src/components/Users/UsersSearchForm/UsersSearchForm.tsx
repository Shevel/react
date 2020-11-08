import React from 'react';
import { Formik, Form, Field } from 'formik';
import { FilterType } from '../../../redux/usersReducer';
import { useSelector } from 'react-redux';
import { getUsersFilter } from '../../../redux/usersSelectors';

const usersSerchFormValidate = (values: any) => {
  const errors = {};
  return errors;
}
type PropsType = {
  onFilterChanged: (filter: FilterType) => void
}
type FriendFormType = 'true' | 'false' | 'null';
type FormType = {
  term: string
  friend: FriendFormType
}

const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
  const filter = useSelector(getUsersFilter);
  const submit = (values: FormType, { setSubmitting }:
    { setSubmitting: (isSubmitting: boolean) => void }) => {
    const filter: FilterType = {
      term: values.term,
      friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
    }
    props.onFilterChanged(filter);
    setSubmitting(false)
  }

  return (
    <Formik
      initialValues={{ term: filter.term, friend: String(filter.friend) as FriendFormType }}
      enableReinitialize
      validate={usersSerchFormValidate}
      onSubmit={submit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="term" />
          <Field name='friend' as='select'>
            <option value='null'>All</option>
            <option value='true'>Only Followed</option>
            <option value='false'>Only Unfollowed</option>
          </Field>
          <button type="submit" disabled={isSubmitting}>
            Find
           </button>
        </Form>
      )}
    </Formik>
  )
});
export default UsersSearchForm;