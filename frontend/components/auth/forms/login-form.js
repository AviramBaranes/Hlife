import React, { useState } from "react";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import {
  createInputListForLogin,
  inputChangeHandler,
} from "../../../utils/formsHelpers/authHelpers";
import { loginUserAction } from "../../../Redux/Slices/auth";
import { errorsActions } from "../../../Redux/Slices/errors";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import { messagesActions } from "../../../Redux/Slices/messages";

function loginForm() {
  const dispatch = useDispatch();

  const [userFields, setUserFields] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userFields;

  const ALL_INPUTS = createInputListForLogin(email, password);

  const [formValidity, setFormValidity] = useState(false);
  const [inputsList, setInputList] = useState(ALL_INPUTS);

  async function signupSubmitHandler(e) {
    e.preventDefault();

    dispatch(errorsActions.errorConfirmed());
    dispatch(loginUserAction({ ...userFields }))
      .then(unwrapResult)
      .then(({ message }) => {
        console.log("here", message);
        dispatch(
          messagesActions.newMessage({
            messageTitle: "Logged In",
            message,
          })
        );
        Router.push("/");
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          errorsActions.newError({
            errorTitle: "Login Failed",
            errorMessage: err.data,
            errorStatusCode: err.status,
          })
        );
      });
  }

  return (
    <form onSubmit={signupSubmitHandler}>
      {inputsList.map((field, index) => {
        return (
          <Input
            key={field.htmlFor}
            htmlFor={field.htmlFor}
            label={field.label}
            value={field.value}
            type={field.type}
            inputChangeHandler={(event) =>
              inputChangeHandler(
                event,
                index,
                inputsList,
                setInputList,
                setUserFields,
                setFormValidity
              )
            }
            touched={field.touched}
            inValid={!field.valid}
          />
        );
      })}
      <Button disabled={!formValidity} type="submit">
        Login
      </Button>
    </form>
  );
}

export default loginForm;
