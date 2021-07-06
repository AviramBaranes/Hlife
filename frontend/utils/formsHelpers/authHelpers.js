import Router from "next/router";
import isAlpha from "validator/lib/isAlpha";
import isAlphanumeric from "validator/lib/isAlphanumeric";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";
import { unwrapResult } from "@reduxjs/toolkit";

import { errorsActions } from "../../Redux/Slices/errors";
import { messagesActions } from "../../Redux/Slices/messages";
import {
  loginUserAction,
  sendPasswordResetEmailAction,
  signupUserAction,
} from "../../Redux/Slices/auth";

export function createInputListForSignup(
  name,
  username,
  email,
  password,
  passwordConfirmation
) {
  const ALL_INPUTS = [
    {
      label: "Name",
      htmlFor: "name",
      type: "text",
      value: name,
      valid: false,
      touched: false,
      rules: {
        minLength: 3,
        isAlpha: true,
      },
    },
    {
      label: "Username",
      htmlFor: "username",
      type: "text",
      value: username,
      valid: false,
      touched: false,
      rules: {
        minLength: 3,
        isAlphanumeric: true,
      },
    },
    {
      label: "Email",
      htmlFor: "email",
      type: "email",
      value: email,
      valid: false,
      touched: false,
      rules: {
        isEmail: true,
      },
    },
    {
      label: "Password",
      htmlFor: "password",
      type: "password",
      value: password,
      valid: false,
      touched: false,
      rules: {
        minLength: 6,
        isAlphanumeric: true,
      },
    },
    {
      label: "Password Confirmation",
      htmlFor: "passwordConfirmation",
      type: "password",
      value: passwordConfirmation,
      valid: false,
      touched: false,
      rules: {
        minLength: 6,
        isAlphanumeric: true,
      },
    },
  ];
  return ALL_INPUTS;
}

export function createInputListForLogin(email, password) {
  const ALL_INPUTS = [
    {
      label: "Email",
      htmlFor: "email",
      type: "email",
      value: email,
      valid: false,
      touched: false,
      rules: {
        isEmail: true,
      },
    },
    {
      label: "Password",
      htmlFor: "password",
      type: "password",
      value: password,
      valid: false,
      touched: false,
      rules: {
        minLength: 6,
        isAlphanumeric: true,
      },
    },
  ];
  return ALL_INPUTS;
}

export function createInputListForPasswordReset(
  password,
  passwordConfirmation
) {
  const ALL_INPUTS = [
    {
      label: "Password",
      htmlFor: "password",
      type: "password",
      value: password,
      valid: false,
      touched: false,
      rules: {
        minLength: 6,
        isAlphanumeric: true,
      },
    },
    {
      label: "Password Confirmation",
      htmlFor: "passwordConfirmation",
      type: "password",
      value: passwordConfirmation,
      valid: false,
      touched: false,
      rules: {
        minLength: 6,
        isAlphanumeric: true,
      },
    },
  ];
  return ALL_INPUTS;
}

function validationTester(value, rules) {
  let isValid = true;

  if (rules.isAlpha) {
    isValid = isAlpha(value) && isValid;
  }

  if (rules.isAlphanumeric) {
    isValid = isAlphanumeric(value) && isValid;
  }

  if (rules.isEmail) {
    isValid = isEmail(value) && isValid;
  }

  if (rules.minLength) {
    isValid = isLength(value, { min: rules.minLength }) && isValid;
  }

  return isValid;
}

export function inputChangeHandler(
  event,
  index,
  inputsList,
  setInputList,
  setUserFields,
  setFormValidity
) {
  const { name, value } = event.target;

  const inputsDataCopy = [...inputsList];

  const inputElementCopy = { ...inputsDataCopy[index] };

  inputElementCopy.value = value;

  inputElementCopy.valid = validationTester(
    inputElementCopy.value,
    inputElementCopy.rules
  );

  inputElementCopy.touched = true;

  let isFormValid = true;

  inputsDataCopy[index] = inputElementCopy;

  inputsDataCopy.forEach((input) => {
    isFormValid = input.valid && isFormValid;
  });

  setInputList(inputsDataCopy);

  setUserFields((prevState) => ({ ...prevState, [name]: value }));

  setFormValidity(isFormValid);
}

export async function submitSendEmailFormHandler(e, dispatch, email) {
  e.preventDefault();

  dispatch(errorsActions.errorConfirmed());
  dispatch(sendPasswordResetEmailAction(email))
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

export async function loginSubmitFormHandler(e, dispatch, userFields) {
  e.preventDefault();

  dispatch(errorsActions.errorConfirmed());
  dispatch(loginUserAction({ ...userFields }))
    .then(unwrapResult)
    .then(({ message }) => {
      dispatch(
        messagesActions.newMessage({
          messageTitle: "Logged In!",
          message,
        })
      );
      Router.push("/");
    })
    .catch((err) => {
      dispatch(
        errorsActions.newError({
          errorTitle: "Login Failed",
          errorMessage: err.data,
          errorStatusCode: err.status,
        })
      );
    });
}

export async function signupSubmitFormHandler(e, dispatch, userFields) {
  e.preventDefault();

  if (userFields.password !== userFields.passwordConfirmation) {
    return dispatch(
      errorsActions.newError({
        errorTitle: "Sign Up Failed",
        errorMessage: "Password need to be a match",
      })
    );
  }

  dispatch(errorsActions.errorConfirmed());
  dispatch(signupUserAction({ ...userFields }))
    .then(unwrapResult)
    .then(({ message }) => {
      dispatch(
        messagesActions.newMessage({
          messageTitle: "Signed Up!",
          message,
        })
      );
      Router.push("/");
    })
    .catch((err) => {
      dispatch(
        errorsActions.newError({
          errorTitle: "Sign Up Failed",
          errorMessage: err.data,
          errorStatusCode: err.status,
        })
      );
    });
}
