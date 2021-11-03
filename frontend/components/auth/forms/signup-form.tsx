import router from 'next/router';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import isEmail from 'validator/lib/isEmail';
import { errorsActions } from '../../../redux/slices/errors/errorsSlice';
import { loadingAction } from '../../../redux/slices/loading/loadingSlice';
import { messagesActions } from '../../../redux/slices/messages/messagesSlice';

import classes from '../../../styles/pages/signup.module.scss';
import axiosInstance from '../../../utils/axios/axiosInstance';
import { handleAxiosError } from '../../../utils/errors/handleRequestErrors';

type InputName =
  | 'name'
  | 'email'
  | 'password'
  | 'passwordConfirmation'
  | 'dateOfBirth';

function signupForm() {
  const dispatch = useDispatch();

  const [errorDiv, setErrorDiv] = useState<JSX.Element | null>(null);
  const [fields, setFields] = useState({
    name: {
      value: '',
      valid: false,
      touched: false,
      active: false,
    },
    email: {
      value: '',
      valid: false,
      touched: false,
      active: false,
    },
    password: {
      value: '',
      valid: false,
      touched: false,
      active: false,
    },
    passwordConfirmation: {
      value: '',
      valid: false,
      touched: false,
      active: false,
    },
    dateOfBirth: {
      value: '',
      valid: false,
      touched: false,
      active: false,
    },
    gender: {
      value: '',
      active: false,
    },
  });
  const [formValidity, setFormValidity] = useState(false);
  const [fieldsClasses, setFieldsClasses] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    dateOfBirth: '',
  });
  useEffect(() => {
    setFormValidity(
      !!(
        fields.name.valid &&
        fields.email.valid &&
        fields.password.valid &&
        fields.passwordConfirmation.valid &&
        fields.dateOfBirth.valid &&
        fields.gender.value
      )
    );

    for (let field in fields) {
      checkAppropriateClass(field as InputName);
    }
  }, [fields]);

  const checkAppropriateClass = (name: InputName) => {
    setFieldsClasses((prevState) => ({
      ...prevState,
      [name]: !fields[name].valid && fields[name].touched ? 'inValid' : '',
    }));
  };

  function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target as { name: InputName; value: string };
    let isValid = false;

    switch (name) {
      case 'name':
        isValid = value.length > 2;
        break;
      case 'email':
        isValid = isEmail(value);
        break;
      case 'password':
        isValid = value.length > 5;
        break;
      case 'passwordConfirmation':
        isValid = value.length > 5;
        break;
      case 'dateOfBirth':
        const minDate = Date.parse('1920-01-01');
        const maxDate = Date.parse('2005-01-01');
        const enteredDate = Date.parse(value);
        isValid = enteredDate <= maxDate && enteredDate >= minDate;
      default:
        break;
    }

    setFields((prevState) => ({
      ...prevState,
      [name]: {
        value,
        touched: true,
        valid: isValid,
        active: value !== '',
      },
    }));
  }

  function mouseOverBtnHandler(e: React.MouseEvent) {
    if (formValidity) return;

    setErrorDiv(
      <>
        <section>
          <h4>Some of the fields are invalid</h4>
          <h6>Please make sure you follow the following instructions</h6>
        </section>
        <ul>
          <li>Name must be at least 3 characters.</li>
          <li>Email needs to be a valid email.</li>
          <li>Password must contain at least 6 characters.</li>
          <li>
            You allowed to have an account only if you were born before 2005.
          </li>
          <li>You need to choose your gender.</li>
        </ul>
      </>
    );
  }

  async function signupSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (fields.password.value !== fields.passwordConfirmation.value) {
      dispatch(
        errorsActions.newError({
          errorTitle: 'Password Do Not Match',
          errorMessage: '',
        })
      );
      return;
    }

    try {
      const bodyRequest = {
        name: fields.name.value,
        email: fields.email.value,
        password: fields.password.value,
        passwordConfirmation: fields.passwordConfirmation.value,
        dateOfBirth: fields.dateOfBirth.value,
        gender: fields.gender.value,
      };

      dispatch(loadingAction.setToTrue());
      const {
        data: { message },
      } = await axiosInstance.post('/auth/signup', bodyRequest);

      await router.push('/auth/registration/set-goals');
      dispatch(
        messagesActions.newMessage({
          messageTitle: 'Sign Up Successfully!',
          message,
        })
      );
      dispatch(loadingAction.setToFalse());
    } catch (err: any) {
      handleAxiosError(err, dispatch, 'Sign Up Failed');
    }
  }
  return (
    <form
      className={classes.Form}
      aria-label='form'
      onSubmit={signupSubmitHandler}
    >
      <div className='input-container'>
        <input
          className={fieldsClasses.name}
          value={fields.name.value}
          onChange={inputChangeHandler}
          name='name'
          role='textbox'
          type='text'
          id='name'
        />
        <label className={fields.name.active ? 'Active' : ''} htmlFor='name'>
          Name
        </label>
      </div>

      <div className='input-container'>
        <input
          className={fieldsClasses.email}
          value={fields.email.value}
          onChange={inputChangeHandler}
          name='email'
          role='textbox'
          type='email'
          id='email'
        />
        <label className={fields.email.active ? 'Active' : ''} htmlFor='email'>
          Email
        </label>
      </div>

      <div className='input-container'>
        <input
          className={fieldsClasses.password}
          value={fields.password.value}
          onChange={inputChangeHandler}
          name='password'
          role='textbox'
          type='password'
          id='password'
        />
        <label
          className={fields.password.active ? 'Active' : ''}
          htmlFor='password'
        >
          Password
        </label>
      </div>

      <div className='input-container'>
        <input
          className={fieldsClasses.passwordConfirmation}
          value={fields.passwordConfirmation.value}
          onChange={inputChangeHandler}
          name='passwordConfirmation'
          role='textbox'
          type='password'
          id='passwordConfirmation'
        />
        <label
          className={fields.passwordConfirmation.active ? 'Active' : ''}
          htmlFor='passwordConfirmation'
        >
          Confirm
        </label>
      </div>

      <div className='input-container'>
        <input
          onFocus={(e) => (e.target.type = 'date')}
          onBlur={(e) => (e.target.type = 'text')}
          className={fieldsClasses.dateOfBirth}
          onChange={inputChangeHandler}
          value={fields.dateOfBirth.value}
          name='dateOfBirth'
          role='textbox'
          type={fields.dateOfBirth.active ? 'date' : 'text'}
          id='date'
          min='1920-01-01'
          max='2005-01-01'
        />
        <label
          className={fields.dateOfBirth.active ? 'Active' : 'NotActive'}
          htmlFor='date'
        >
          Date of birth
        </label>
      </div>

      <div className='input-container'>
        <select
          onChange={(e) => {
            const { value } = e.target;
            setFields((prevState) => {
              return {
                ...prevState,
                gender: { active: value !== '', value },
              };
            });
          }}
          value={fields.gender.value}
          required
          role='listbox'
          id='gender'
          name='gender'
        >
          <option value='' style={{ display: 'none' }}></option>
          <option value='male'>male</option>
          <option value='female'>female</option>
        </select>
        <label
          className={fields.gender.active ? 'Active' : ''}
          htmlFor='gender'
        >
          Gender
        </label>
      </div>

      {errorDiv && <div className='error-div'>{errorDiv}</div>}

      <div
        className='error-detector-div'
        onMouseOver={mouseOverBtnHandler}
        onMouseLeave={() => setErrorDiv(null)}
      >
        <button
          className='primary-button'
          disabled={!formValidity}
          type='submit'
        >
          Sign Up
        </button>
      </div>
    </form>
  );
}

export default signupForm;
