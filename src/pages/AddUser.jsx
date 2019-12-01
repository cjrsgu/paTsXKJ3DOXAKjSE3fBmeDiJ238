import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form'
import { addUser, updateUser, getUser } from '../ducks/users';
import { useParams } from 'react-router-dom';

const AddUser =  ({ addUser, updateUser, users,getUser }) => {
  let { id } = useParams();
  const onSubmit = values => {
    if (id) {
      console.log(values, 123);
      updateUser({
        ...values,
        id: Number(id),
      });
    } else {
      addUser(values);
    }
  }
  useEffect(() => { getUser(id)}, []);
  const required = value => (value ? undefined : 'Обязательное');
  const maxLength = max => value =>
    value.length <= max ? undefined : `Должно быть короче ${max} символов`;
  const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined);
  const minValue = min => value =>
    isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;
  const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined);
  console.log(123, users);
  const user = users.find(user => user && user.id === Number(id))
  const initialValues = user
    ? user.toObject()
  : {
      gender: 'male',
      is_active: false,
    };

  console.log(initialValues, id);
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <Field name="first_name" validate={composeValidators(required, maxLength(256))}>
            {({ input, meta }) => (
              <div>
                <label>Имя</label>
                <input {...input} type="text" placeholder="Имя" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="last_name" validate={composeValidators(required, maxLength(256))}>
            {({ input, meta }) => (
              <div>
                <label>Фамилия</label>
                <input {...input} type="text" placeholder="Фамилия" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="birth_date" validate={required}>
            {({ input, meta }) => (
              <div>
                <label>Дата рождения</label>
                <input {...input} type="date" placeholder="Дата рождения" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="gender" validate={required} component="select">
            {({ input, meta }) => (
              <div>
                <label>Пол</label>
                <select {...input}>
                  <option value="male">Мужчина</option>
                  <option value="female">Женщина</option>
                </select>
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="job" validate={composeValidators(required, maxLength(256))}>
            {({ input, meta }) => (
              <div>
                <label>Профессия</label>
                <input {...input} type="text" placeholder="Профессия" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="biography" validate={composeValidators(required, maxLength(1024))}>
            {({ input, meta }) => (
              <div>
                <label>Биография</label>
                <textarea {...input} placeholder="Биография" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="is_active" type="checkbox">
            {({ input, meta }) => (
              <div>
                <label>Активный</label>
                <input {...input} type="checkbox" placeholder="Активный" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <div className="buttons">
            <button type="submit" disabled={submitting}>
              Submit
            </button>
            <button
              type="button"
              onClick={form.reset}
              disabled={submitting || pristine}
            >
              Reset
            </button>
          </div>
        </form>
      )}
    />
  )
}

export default connect((state) => ({
  users: state.userList.users,
}), ({ addUser, updateUser, getUser }))(AddUser);
