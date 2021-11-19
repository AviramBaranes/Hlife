import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import Image from 'next/image';

import classes from '../../styles/pages/forgotPassword.module.scss';
import envelopIcon from '../../public/icons/email.png';
import ForgotPasswordForm from '../../components/auth/forms/forgotPassword-form';
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
        <div>{envelopIcon && <Image src={envelopIcon} />}</div>
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
