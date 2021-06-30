import React, { useState } from "react";

import axiosInstance from "../../../utils/Axios/axiosInstance";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";

function forgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function inputChangeHandler(e) {
    setEmail(e.target.value);
  }

  async function submitResetFormHandler(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const boduRequest = { email };
      await axiosInstance.post("/auth/password/send-token", boduRequest);
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
      <Button type="submit">Send</Button>
    </form>
  );
}

export default forgotPasswordForm;
