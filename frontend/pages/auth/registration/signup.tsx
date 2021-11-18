import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

import SignupForm from '../../../components/auth/forms/signup-form';
import Line from '../../../components/UI/SVGs/title-line';
import signupSvg from '../../../assets/svg/signup-svg.svg';
import classes from '../../../styles/pages/signup.module.scss';
import protectRouteHandler from '../../../utils/protectedRoutes/protectedRoutes';
import { GetServerSideProps } from 'next';

const Signup: React.FC = () => {
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <div className={classes.Title}>
        <h1>Welcome</h1>
        <h5>Start changing your life today!</h5>
      </div>
      <div className={classes.Main}>
        <section className={classes.FormSection}>
          <div className={classes.FormTitle}>
            <h2>Create User</h2>
            <Line />
          </div>
          <SignupForm />
        </section>
        {signupSvg.src && <Image alt='workout picture' src={signupSvg} />}
      </div>
      <div className={classes.Footer}>
        <p>
          Already have an account? <Link href='/auth/login'>login</Link>
        </p>
      </div>
    </>
  );
};

export default Signup;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { destination } = await protectRouteHandler(ctx);

  if (destination === '/auth/login') {
    return { props: {} };
  } else {
    return { redirect: { permanent: false, destination } };
  }
};
