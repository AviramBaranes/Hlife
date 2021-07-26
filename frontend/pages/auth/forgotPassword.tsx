import React from "react";
import ForgotPasswordForm from "../../components/auth/forms/forgotPassword-form";
import Card from "../../components/UI/Card/Card";

function SendEmail() {
  return (
    <Card>
      <h2>Reset Password</h2>
      <p>Fill your email, and we will send you a link to reset your password</p>
      <ForgotPasswordForm />
    </Card>
  );
}

export default SendEmail;
