import React from "react";
import ForgotPasswordForm from "../../components/auth/forms/forgotPassword-form";
import Card from "../../components/UI/Card/Card";

function forgotPassword() {
  return (
    <Card>
      <h2>Reset Password</h2>
      <p>
        Write your email, and we will send you a link to reset yout password
      </p>
      <ForgotPasswordForm />
    </Card>
  );
}

export default forgotPassword;