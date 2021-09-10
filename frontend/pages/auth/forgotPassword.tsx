import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ForgotPasswordForm from "../../components/auth/forms/forgotPassword-form";
import classes from "../../styles/pages/forgotPassword.module.scss";

function SendEmail() {
  return (
    <>
      <div className={classes.Title}>
        <h1>Reset Password</h1>
        <h5>
          Fill your email, and we will send you a link to reset your password
        </h5>
      </div>
      <section className={classes.Main}>
        <ForgotPasswordForm />
        <div>
          <FontAwesomeIcon className="fa-10x" icon={faEnvelope} />
        </div>
      </section>
    </>
  );
}

export default SendEmail;
