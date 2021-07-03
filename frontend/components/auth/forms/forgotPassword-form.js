import { unwrapResult } from "@reduxjs/toolkit";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendPasswordResetEmailAction } from "../../../Redux/Slices/auth";
import { errorsActions } from "../../../Redux/Slices/errors";
import { messagesActions } from "../../../Redux/Slices/messages";

import axiosInstance from "../../../utils/Axios/axiosInstance";
import { inputChangeHandler } from "../../../utils/formsHelpers/authHelpers";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";

function forgotPasswordForm() {
  const dispatch = useDispatch();
  const Router = useRouter();

  const [formValidity, setFormValidity] = useState(false);
  const [email, setEmail] = useState({ email: "" });
  //need to be an array to be suitable with global inputChangeHandler function
  const [inputConfig, setInputConfig] = useState([
    {
      value: email,
      valid: false,
      touched: false,
      rules: {
        isEmail: true,
      },
    },
  ]);

  async function submitResetFormHandler(e) {
    e.preventDefault();

    dispatch(errorsActions.errorConfirmed());
    dispatch(sendPasswordResetEmailAction(email.email))
      .then(unwrapResult)
      .then((message) => {
        dispatch(
          messagesActions.newMessage({
            messageTitle: "Email Sent!",
            message,
          })
        );
        Router.push("/auth/login");
      })
      .catch((err) => {
        dispatch(
          errorsActions.newError({
            errorTitle: "Sending email failed",
            errorMessage: err.data,
            errorStatusCode: err.status,
          })
        );
      });
  }

  return (
    <form onSubmit={submitResetFormHandler}>
      <Input
        htmlFor="email"
        label="Email"
        value={email.email}
        type="email"
        touched={inputConfig[0].touched}
        inValid={!inputConfig[0].valid}
        inputChangeHandler={(event) =>
          inputChangeHandler(
            event,
            0,
            inputConfig,
            setInputConfig,
            setEmail,
            setFormValidity
          )
        }
      />
      <Button disabled={!formValidity} type="submit">
        Send
      </Button>
    </form>
  );
}

export default forgotPasswordForm;
