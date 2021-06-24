import React from "react";
import Link from "next/link";

import LoginForm from "../../components/auth/forms/login-form";

function Login() {
  return (
    <>
      <h2>Log In</h2>
      <LoginForm />
      <p>
        Dont own an account? <Link href="/auth/signup">signup</Link>
      </p>
      <p>
        Forgot your password ? <Link href="/auth/forgotPassword">go here</Link>
      </p>
    </>
  );
}

export default Login;
