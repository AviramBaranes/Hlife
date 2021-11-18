import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

import LoginForm from '../../components/auth/forms/login-form';
import classes from '../../styles/pages/login.module.scss';
import Line from '../../components/UI/SVGs/title-line';
import dumbbellsPic from '../../assets/svg/login-picture.svg';
import { GetServerSideProps } from 'next';
import protectRouteHandler from '../../utils/protectedRoutes/protectedRoutes';

const Login: React.FC = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className={classes.Title}>
        <h1>Welcome Back!</h1>
      </div>
      <div className={classes.Main}>
        <section className={classes.FormSection}>
          <div className={classes.subTitle}>
            <h2>Log In</h2>
            <Line />
          </div>
          <LoginForm />
        </section>
        {dumbbellsPic.src && (
          <Image alt='dumbbells picture' src={dumbbellsPic} />
        )}
      </div>
      <div className={classes.Footer}>
        <div>
          <p>
            Don't have an account?{' '}
            <Link href='/auth/registration/signup'>signup</Link>
          </p>
          <p>
            Forgot your password?{' '}
            <Link href='/auth/forgotPassword'>go here</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let { destination } = await protectRouteHandler(ctx);
  if (destination === '/auth/login') {
    return { props: {} };
  } else {
    return {
      redirect: { permanent: false, destination },
    };
  }
};
