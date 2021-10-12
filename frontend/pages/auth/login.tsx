import React from "react";
import Link from "next/link";
import Image from "next/image";

import LoginForm from "../../components/auth/forms/login-form";
import classes from "../../styles/pages/login.module.scss";
import Line from "../../components/UI/SVGs/title-line";
import dumbbellsPic from "../../assets/svg/login-picture.svg";
import { GetServerSideProps } from "next";
import protectRouteHandler from "../../utils/protectedRoutes/protectedRoutes";

function Login() {
  return (
    <>
      <div className={classes.Title}>
        <h1>Welcome Back!</h1>
      </div>
      <div className={classes.Main}>
        <section>
          <h2>Log In</h2>
          <Line />
          <LoginForm />
        </section>
        {dumbbellsPic.src && <Image src={dumbbellsPic} />}
      </div>
      <div className={classes.Footer}>
        <div>
          <p>
            Don't have an account? <Link href="/auth/signup">signup</Link>
          </p>
          <p>
            Forgot your password?{" "}
            <Link href="/auth/forgotPassword">go here</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const destination = await protectRouteHandler(ctx);

  if (destination === "/auth/login") {
    return { props: {} };
  } else {
    return { redirect: { permanent: false, destination } };
  }
};
