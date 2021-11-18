import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GetServerSideProps } from 'next';
import React from 'react';
import Head from 'next/head';

import ForgotPasswordForm from '../../components/auth/forms/forgotPassword-form';
import classes from '../../styles/pages/forgotPassword.module.scss';
import protectRouteHandler from '../../utils/protectedRoutes/protectedRoutes';

function SendEmail() {
  return (
    <>
      <Head>
        <title>Reset password</title>
        <meta name='description' content='Reset your password' />
      </Head>
      <div className={classes.Title}>
        <h1>Reset Password</h1>
        <h5>
          Fill your email, and we will send you a link to reset your password
        </h5>
      </div>
      <section className={classes.Main}>
        <ForgotPasswordForm />
        <div>
          <FontAwesomeIcon className='fa-10x' icon={faEnvelope} />
        </div>
      </section>
    </>
  );
}

export default SendEmail;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { destination } = await protectRouteHandler(ctx);

  if (destination === '/auth/login') {
    return { props: {} };
  } else {
    return { redirect: { permanent: false, destination } };
  }
};
