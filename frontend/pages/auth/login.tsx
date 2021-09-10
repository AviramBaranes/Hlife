import React from "react";
import Link from "next/link";
import Image from "next/image";

import LoginForm from "../../components/auth/forms/login-form";
import classes from "../../styles/pages/login.module.scss";
import Line from "../../components/UI/SVGs/title-line";
import dumbbellsPic from "../../assets/svg/login-picture.svg";

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
        <Image src={dumbbellsPic} />
      </div>
      <div className={classes.Footer}>
        <div>
          <p>
            Don't have an account? <Link href="/auth/signup">signup</Link>
          </p>
          <p>
            Forgot your password ?{" "}
            <Link href="/auth/forgotPassword">go here</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
