import React from "react";
import Link from "next/link";

import SignupForm from "../../components/auth/forms/signup-form";

function signup() {
  return (
    <>
      <h2>Sign Up</h2>
      <SignupForm />
      <p>
        Have an account ? <Link href="/auth/login">login</Link>
      </p>
    </>
  );
}

export default signup;
