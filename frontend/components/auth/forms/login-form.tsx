import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import classes from '../../../styles/pages/login.module.scss';
import isEmail from 'validator/lib/isEmail';
import axiosInstance from '../../../utils/axios/axiosInstance';
import { messagesActions } from '../../../redux/slices/messages/messagesSlice';
import router from 'next/router';
import { handleAxiosError } from '../../../utils/errors/handleRequestErrors';
import { loadingAction } from '../../../redux/slices/loading/loadingSlice';
import { validateAuthenticationAction } from '../../../redux/slices/auth/authSlice';

function loginForm() {
  const dispatch = useDispatch();

  const [errorDiv, setErrorDiv] = useState<JSX.Element | null>(null);
  const [fields, setFields] = useState({
    email: { valid: false, touched: false, value: '', active: false },
    password: { valid: false, touched: false, value: '', active: false },
  });
  const [inputClasses, setInputClasses] = useState({
    emailInputClass: '',
    passwordInputClass: '',
  });
  const [formValidity, setFormValidity] = useState(false);

  function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFields((prevState) => ({
      ...prevState,
      [name]: {
        value,
        touched: true,
        valid: name === 'email' ? isEmail(value) : value.length > 5,
        active: value !== '',
      },
    }));
  }

  useEffect(() => {
    setFormValidity(fields.email.valid && fields.password.valid);

    if (!fields.password.valid && fields.password.touched) {
      setInputClasses((prevState) => ({
        ...prevState,
        passwordInputClass: 'inValid',
      }));
    } else {
      setInputClasses((prevState) => ({
        ...prevState,
        passwordInputClass: '',
      }));
    }

    if (!fields.email.valid && fields.email.touched) {
      setInputClasses((prevState) => ({
        ...prevState,
        emailInputClass: 'inValid',
      }));
    } else {
      setInputClasses((prevState) => ({ ...prevState, emailInputClass: '' }));
    }
  }, [fields]);

  function mouseOverBtnHandler(e: React.MouseEvent) {
    if (formValidity) return;

    setErrorDiv(
      <>
        <section>
          <h4>Some of the fields are invalid</h4>
          <h6>Please make sure you follow the following instructions</h6>
        </section>
        <ul>
          <li>Email needs to be a valid email</li>
          <li>Password must contain at least 6 characters</li>
        </ul>
      </>
    );
  }

  async function loginSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const bodyRequest = {
        email: fields.email.value,
        password: fields.password.value,
      };
      dispatch(loadingAction.setToTrue());
      const { data } = await axiosInstance.post('/auth/login', bodyRequest);

      await router.push('/');
      dispatch(
        messagesActions.newMessage({
          messageTitle: 'Logged In!',
          message: data.message,
        })
      );
      dispatch(loadingAction.setToFalse());
      dispatch(validateAuthenticationAction())
    } catch (err: any) {
      handleAxiosError(err, dispatch, 'Login Failed');
    }
  }
  return (
    <form
      className={classes.Form}
      aria-label='form'
      onSubmit={loginSubmitHandler}
    >
      <div className='input-container'>
        <input
          className={inputClasses.emailInputClass}
          name='email'
          type='email'
          id='email'
          required
          value={fields.email.value}
          onChange={inputChangeHandler}
        />
        <label className={fields.email.active ? 'Active' : ''} htmlFor='email'>
          Email
        </label>
      </div>

      <div className='input-container'>
        <input
          className={inputClasses.passwordInputClass}
          name='password'
          type='password'
          id='password'
          required
          value={fields.password.value}
          onChange={inputChangeHandler}
        />
        <label
          className={fields.password.active ? 'Active' : ''}
          htmlFor='password'
        >
          Password
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
          Login
        </button>
      </div>
    </form>
  );
}

export default loginForm;
