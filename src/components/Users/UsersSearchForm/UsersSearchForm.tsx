import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { FilterType } from '../../../redux/usersReducer';
import { getUsersFilter } from '../../../redux/usersSelectors';

import s from './UsersSearchForm.module.css';

type PropsType = {
  onFilterChanged: (filter: FilterType) => void;
};

type FriendFormType = 'true' | 'false' | 'null';

type FormType = {
  term: string;
  friend: FriendFormType;
};

const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
  const filter = useSelector(getUsersFilter);
  const submit = (
    values: FormType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const filter: FilterType = {
      term: values.term.trim(),
      friend:
        values.friend === 'null'
          ? null
          : values.friend === 'true'
          ? true
          : false
    };
    props.onFilterChanged(filter);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        term: filter.term,
        friend: String(filter.friend) as FriendFormType
      }}
      enableReinitialize
      onSubmit={submit}
    >
      {({ isSubmitting }) => (
        <Form className={s.formFilter}>
          <Field className={s.filterSelect} name='friend' as='select'>
            <option value='null'>All</option>
            <option value='true'>Followed</option>
            <option value='false'>Unfollowed</option>
          </Field>
          <Field
            className={s.nameFilter}
            type='text'
            name='term'
          />
          <Button htmlType='submit' disabled={isSubmitting}>
            Search <SearchOutlined />
          </Button>
        </Form>
      )}
    </Formik>
  );
});

export default UsersSearchForm;
