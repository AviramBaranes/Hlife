import React from "react";
import Link from "next/link";
import Image from "next/image";

import SignupForm from "../../../components/auth/forms/signup-form";
import Line from "../../../components/UI/SVGs/title-line";
import signupSvg from "../../../assets/svg/signup-svg.svg";
import classes from "../../../styles/pages/signup.module.scss";

function signup() {
  return (
    <>
      <div className={classes.Title}>
        <h1>Welcome</h1>
        <h5>Start changing your life today!</h5>
      </div>
      <div className={classes.Main}>
        <section>
          <div className={classes.FormTitle}>
            <h2>Sign Up</h2>
            <Line />
          </div>
          <SignupForm />
        </section>
        <div className={classes.Image}>
          {signupSvg.src && <Image src={signupSvg} />}
        </div>
      </div>
      <div className={classes.Footer}>
        <p>
          Already have an account? <Link href="/auth/login">login</Link>
        </p>
      </div>
    </>
  );
}

export default signup;
