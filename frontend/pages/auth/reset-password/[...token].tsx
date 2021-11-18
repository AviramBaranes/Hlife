import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import axiosInstance from '../../../utils/axios/axiosInstance';
import { useDispatch } from 'react-redux';
import classes from '../../../styles/pages/[...token].module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { errorsActions } from '../../../redux/slices/errors/errorsSlice';
import router from 'next/router';
import { messagesActions } from '../../../redux/slices/messages/messagesSlice';
import { handleAxiosError } from '../../../utils/errors/handleRequestErrors';
import { loadingAction } from '../../../redux/slices/loading/loadingSlice';

function ResetPassword({ token }: { token: string }) {
  const dispatch = useDispatch();

  const [errorDiv, setErrorDiv] = useState<JSX.Element | null>(null);
  const [passwordsFields, setPasswordsFields] = useState({
    password: {
      value: '',
      valid: false,
      touched: false,
    },
    passwordConfirmation: {
      value: '',
      valid: false,
      touched: false,
    },
  });
  const [formValidity, setFormValidity] = useState(false);

  useEffect(() => {
    setFormValidity(
      passwordsFields.passwordConfirmation.valid &&
        passwordsFields.password.valid
    );
  }, [passwordsFields]);

  function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setPasswordsFields((prevState) => ({
      ...prevState,
      [name]: {
        value,
        touched: true,
        valid: value.length > 5,
      },
    }));
  }

  function mouseOverBtnHandler(e: React.MouseEvent) {
    if (formValidity) return;

    setErrorDiv(
      <section>
        <h4>Some of the fields are invalid</h4>
        <h6>Please make sure the passwords contain at least 6 characters</h6>
      </section>
    );
  }

  async function submitFormHandler(e: React.FormEvent) {
    e.preventDefault();

    if (
      passwordsFields.password.value !==
      passwordsFields.passwordConfirmation.value
    ) {
      dispatch(
        errorsActions.newError({
          errorTitle: 'Passwords need to be a match',
          errorMessage: '',
        })
      );
    }

    try {
      const bodyRequest = {
        password: passwordsFields.password.value,
        passwordConfirmation: passwordsFields.passwordConfirmation.value,
        resetToken: token,
      };

      dispatch(loadingAction.setToTrue());
      const { data } = await axiosInstance.put(
        '/auth/reset/password-reset',
        bodyRequest
      );

      await router.push('/auth/login');
      dispatch(
        messagesActions.newMessage({
          messageTitle: 'Password Changed Successfully',
          message: data,
        })
      );
      dispatch(loadingAction.setToFalse());
    } catch (err: any) {
      handleAxiosError(err, dispatch, 'Changing Password Failed');
    }
  }

  return (
    <>
      <Head>
        <title>Reset password</title>
        <meta name='description' content='Reset your password' />
      </Head>
      <section className={classes.Title}>
        <h1>Change Password</h1>
        <h5>Fill the fields with your new strong password</h5>
      </section>

      <section className={classes.Main}>
        <form className={classes.Form} onSubmit={submitFormHandler}>
          <div className='input-container'>
            <input
              name='password'
              type='password'
              required
              onChange={inputChangeHandler}
              value={passwordsFields.password.value}
              id='password'
            />
            <label htmlFor='password'>Password</label>
          </div>

          <div className='input-container'>
            <input
              name='passwordConfirmation'
              type='password'
              required
              onChange={inputChangeHandler}
              value={passwordsFields.passwordConfirmation.value}
              id='passwordConfirmation'
            />
            <label htmlFor='passwordConfirmation'>Confirm</label>
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
              Reset Password
            </button>
          </div>
        </form>

        <FontAwesomeIcon icon={faLock} className='fa-10x' />
      </section>
    </>
  );
}

export default ResetPassword;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { params } = ctx;

    const token = params!.token![0];

    await axiosInstance.get(`/auth/reset/validate-token/${token}`);

    return { props: { token } };
  } catch (err) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
};
