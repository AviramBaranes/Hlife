import React from "react";
import Link from "next/link";

import SignupForm from "../../components/auth/forms/signup-form";
import Card from "../../components/UI/Card/Card";

function signup() {
  return (
    <Card>
      <h2>Sign Up</h2>
      <SignupForm />
      <p>
        Have an account ? <Link href="/auth/login">login</Link>
      </p>
    </Card>
  );
}

export default signup;
