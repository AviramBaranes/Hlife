import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import isEmail from 'validator/lib/isEmail';

import classes from '../../../styles/pages/forgotPassword.module.scss';
import { messagesActions } from '../../../redux/slices/messages/messagesSlice';
import axiosInstance from '../../../utils/axios/axiosInstance';
import { handleAxiosError } from '../../../utils/errors/handleRequestErrors';
import { loadingAction } from '../../../redux/slices/loading/loadingSlice';

function forgotPasswordForm() {
  const dispatch = useDispatch();

  const [errorDiv, setErrorDiv] = useState<JSX.Element | null>(null);
  const [inputClass, setInputClass] = useState('');
  const [email, setEmail] = useState({
    value: '',
    active: false,
  });
  const [emailValidity, setEmailValidity] = useState({
    valid: false,
    touched: false,
  });

  useEffect(() => {
    setEmailValidity((prevState) => ({
      ...prevState,
      valid: isEmail(email.value),
    }));

    if (emailValidity.touched && !emailValidity.valid) {
      setInputClass('inValid');
    } else {
      setInputClass('');
    }
  }, [email]);

  function mouseOverBtnHandler(e: React.MouseEvent) {
    if (emailValidity.valid) return;
    setErrorDiv(
      <section>
        <h4>Email field is invalid</h4>
        <h6>Please make sure you enter a valid email</h6>
      </section>
    );
  }

  async function submitSendEmailFormHandler(e: React.FormEvent) {
    e.preventDefault();

    try {
      dispatch(loadingAction.setToTrue());
      const {
        data: { message },
      } = await axiosInstance.post('/auth/password/send-token', {
        email: email.value,
      });

      await router.push('/auth/login');
      dispatch(
        messagesActions.newMessage({ messageTitle: 'Email Sent!', message })
      );
      dispatch(loadingAction.setToFalse());
    } catch (err: any) {
      handleAxiosError(err, dispatch, 'Sending Email Failed');
    }
  }

  return (
    <form
      className={classes.Form}
      aria-label='form'
      onSubmit={submitSendEmailFormHandler}
    >
      <div className='input-container'>
        <input
          className={inputClass}
          value={email.value}
          onChange={(e) => {
            const { value } = e.target;
            setEmail({ value, active: value !== '' }),
              setEmailValidity((prevState) => ({
                ...prevState,
                touched: true,
              }));
          }}
          name='email'
          role='textbox'
          type='email'
          id='email'
        />
        <label className={email.active ? 'Active' : ''} htmlFor='email'>
          Email:
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
          disabled={!emailValidity.valid}
          type='submit'
        >
          Send
        </button>
      </div>
    </form>
  );
}

export default forgotPasswordForm;
