import { Dispatch } from "react";
import Router from "next/router";
import isAlpha from "validator/lib/isAlpha";
import isAlphanumeric from "validator/lib/isAlphanumeric";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";
import { unwrapResult } from "@reduxjs/toolkit";

import {
  ValidationRules,
  ComplexInputListObject,
} from "../../types/inputConfig";
import { errorsActions } from "../../redux/slices/errors/errorsSlice";
import { messagesActions } from "../../redux/slices/messages/messagesSlice";
import {
  loginUserAction,
  logoutAction,
  sendPasswordResetEmailAction,
  signupUserAction,
  usersActions,
} from "../../redux/slices/auth/authSlice";
import axiosInstance from "../axios/axiosInstance";
import { SetStateAction } from "react";
import { CustomError } from "../../types/CustomErrors";
import { AppDispatch } from "../../redux/store/reduxStore";

export function createInputListForSignup(
  name: string,
  username: string,
  email: string,
  password: string,
  passwordConfirmation: string
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
      label: "Confirm",
      htmlFor: "password-Confirmation",
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

export function createInputListForLogin(email: string, password: string) {
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
  password: string,
  passwordConfirmation: string
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
      label: "Confirm",
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

function validationTester(value: string, rules: ValidationRules) {
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
  event: React.ChangeEvent<HTMLInputElement>,
  index: number,
  inputsList: ComplexInputListObject[],
  setInputList: Dispatch<SetStateAction<ComplexInputListObject[]>>,
  setUserFields: Dispatch<SetStateAction<object | string>>,
  setFormValidity: Dispatch<SetStateAction<boolean>>
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

  setUserFields((prevState) => {
    if (typeof prevState === "string") {
      return value;
    } else if (typeof prevState === "object") {
      return { ...prevState, [name]: value };
    }
  });

  setFormValidity(isFormValid);
}

export async function submitSendEmailFormHandler(
  e: React.FormEvent<HTMLFormElement>,
  dispatch: AppDispatch,
  email: string
) {
  e.preventDefault();

  dispatch(errorsActions.errorConfirmed());
  dispatch(sendPasswordResetEmailAction(email))
    .then(unwrapResult)
    .then((message: string) => {
      dispatch(
        messagesActions.newMessage({
          messageTitle: "Email Sent!",
          message,
        })
      );
      Router.push("/auth/login");
    })
    .catch((err: CustomError) => {
      dispatch(
        errorsActions.newError({
          errorTitle: "Sending email failed",
          errorMessage: err.data,
          errorStatusCode: err.status,
        })
      );
    });
}

export async function loginSubmitFormHandler(
  e: React.FormEvent<HTMLFormElement>,
  dispatch: AppDispatch,
  userFields: {}
) {
  e.preventDefault();

  dispatch(errorsActions.errorConfirmed());
  dispatch(loginUserAction({ ...userFields }))
    .then(unwrapResult)
    .then((result: { message: string }) => {
      const { message } = result;
      Router.push("/");
      dispatch(
        messagesActions.newMessage({
          messageTitle: "Logged In!",
          message,
        })
      );
    })
    .catch((err: CustomError) => {
      dispatch(
        errorsActions.newError({
          errorTitle: "Login Failed",
          errorMessage: err.data,
          errorStatusCode: err.status,
        })
      );
    });
}

export async function signupSubmitFormHandler(
  e: React.FormEvent<HTMLFormElement>,
  dispatch: AppDispatch,
  userFields: { password: string; "password-Confirmation": string }
) {
  e.preventDefault();
  if (userFields.password !== userFields["password-Confirmation"]) {
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
    .then((result: { message: string }) => {
      const { message } = result;
      dispatch(
        messagesActions.newMessage({
          messageTitle: "Signed Up!",
          message,
        })
      );
      Router.push("/");
    })
    .catch((err: CustomError) => {
      dispatch(
        errorsActions.newError({
          errorTitle: "Sign Up Failed",
          errorMessage: err.data,
          errorStatusCode: err.status,
        })
      );
    });
}

export async function logoutHandler(
  dispatch: AppDispatch,
  setShowModal: Dispatch<SetStateAction<boolean>>
) {
  Router.push("/auth/login");
  dispatch(logoutAction())
    .then(unwrapResult)
    .then(() => {
      setShowModal(false);
    })
    .catch((err: CustomError) => {
      Router.push("/");
      dispatch(
        errorsActions.newError({
          errorTitle: "Logout failed",
          errorMessage: err.data,
          errorStatusCode: err.status,
        })
      );
    });
}

export async function submitChangePasswordHandler(
  e: React.FormEvent<HTMLFormElement>,
  dispatch: AppDispatch,
  passwordsFields: { password: string; passwordConfirmation: string },
  token: string
) {
  e.preventDefault();

  if (passwordsFields.password !== passwordsFields.passwordConfirmation) {
    dispatch(
      errorsActions.newError({
        errorTitle: "Reset Failed",
        errorMessage: "Passwords need to be a match",
      })
    );
    return;
  }

  try {
    dispatch(usersActions.changeLoadingState(true));
    const bodyRequest = { ...passwordsFields, resetToken: token };
    const res = await axiosInstance.put(
      "/auth/reset/password-reset",
      bodyRequest
    );
    dispatch(usersActions.changeLoadingState(false));
    dispatch(errorsActions.errorConfirmed());
    dispatch(
      messagesActions.newMessage({
        messageTitle: "Success!",
        message: res.data,
      })
    );

    Router.push("/auth/login");
  } catch (err: any) {
    dispatch(usersActions.changeLoadingState(false));

    dispatch(
      errorsActions.newError({
        errorTitle: "Reset Failed",
        errorMessage: err.response.data,
        errorStatusCode: err.response.status,
      })
    );
  }
}
