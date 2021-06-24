import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import Input from "../../UI/Input";

function forgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const _csrf = useSelector((state) => state.tokensReducer.csrfToken);

  function inputChangeHandler(e) {
    setEmail(e.target.value);
  }

  async function submitResetFormHandler(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(
        "http://localhost:8080/auth/password/send-token",
        {
          _csrf,
          email,
        },
        {
          withCredentials: true,
        }
      );
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  }

  if (loading) {
    return <>loading...</>;
  }

  if (error) {
    return <>Error</>;
  }

  return (
    <form onSubmit={submitResetFormHandler}>
      <Input
        htmlFor="email"
        label="Email"
        value={email}
        type="email"
        inputChangeHandler={inputChangeHandler}
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default forgotPasswordForm;
