import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import isEmail from "validator/lib/isEmail";
import { errorsActions } from "../../../redux/slices/errors/errorsSlice";
import axiosInstance from "../../../utils/axios/axiosInstance";
import { messagesActions } from "../../../redux/slices/messages/messagesSlice";
import router from "next/router";

function loginForm() {
  const dispatch = useDispatch();

  const [fields, setFields] = useState({
    email: { valid: false, touched: false, value: "" },
    password: { valid: false, touched: false, value: "" },
  });
  const [classes, setClasses] = useState({
    emailInputClass: "",
    passwordInputClass: "",
  });
  const [formValidity, setFormValidity] = useState(false);

  function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFields((prevState) => ({
      ...prevState,
      [name]: {
        value,
        touched: true,
        valid: name === "email" ? isEmail(value) : value.length > 5,
      },
    }));
  }

  useEffect(() => {
    setFormValidity(fields.email.valid && fields.password.valid);

    if (!fields.password.valid && fields.password.touched) {
      setClasses((prevState) => ({
        ...prevState,
        passwordInputClass: "inValid",
      }));
    } else {
      setClasses((prevState) => ({ ...prevState, passwordInputClass: "" }));
    }

    if (!fields.email.valid && fields.email.touched) {
      setClasses((prevState) => ({ ...prevState, emailInputClass: "inValid" }));
    } else {
      setClasses((prevState) => ({ ...prevState, emailInputClass: "" }));
    }
  }, [fields]);

  async function loginSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const bodyRequest = {
        email: fields.email.value,
        password: fields.password.value,
      };
      const { data } = await axiosInstance.post("/auth/login", bodyRequest);

      await router.push("/");
      dispatch(
        messagesActions.newMessage({
          messageTitle: "Logged In!",
          message: data.message,
        })
      );
    } catch (err: any) {
      dispatch(
        errorsActions.newError({
          errorTitle: "Login Failed",
          errorMessage: err.response.data,
        })
      );
    }
  }

  return (
    <form aria-label="form" onSubmit={loginSubmitHandler}>
      <label htmlFor="email">Email:</label>
      <input
        className={classes.emailInputClass}
        name="email"
        type="email"
        id="email"
        required
        value={fields.email.value}
        onChange={inputChangeHandler}
      />
      <label htmlFor="password">Password:</label>
      <input
        className={classes.passwordInputClass}
        name="password"
        type="password"
        id="password"
        required
        value={fields.password.value}
        onChange={inputChangeHandler}
      />
      <button disabled={!formValidity} type="submit">
        Login
      </button>
    </form>
  );
}

export default loginForm;
