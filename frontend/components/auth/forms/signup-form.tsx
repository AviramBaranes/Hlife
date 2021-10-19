import router from "next/router";
import React, { useState, Dispatch, useEffect } from "react";
import { useDispatch } from "react-redux";
import isEmail from "validator/lib/isEmail";
import { errorsActions } from "../../../redux/slices/errors/errorsSlice";
import { messagesActions } from "../../../redux/slices/messages/messagesSlice";

import classes from "../../../styles/pages/signup.module.scss";
import axiosInstance from "../../../utils/axios/axiosInstance";

type InputName =
  | "name"
  | "username"
  | "email"
  | "password"
  | "passwordConfirmation"
  | "dateOfBirth";

function signupForm() {
  const dispatch = useDispatch();

  const [errorDiv, setErrorDiv] = useState<JSX.Element | null>(null);
  const [fields, setFields] = useState({
    name: {
      value: "",
      valid: false,
      touched: false,
    },
    username: {
      value: "",
      valid: false,
      touched: false,
    },
    email: {
      value: "",
      valid: false,
      touched: false,
    },
    password: {
      value: "",
      valid: false,
      touched: false,
    },
    passwordConfirmation: {
      value: "",
      valid: false,
      touched: false,
    },
    dateOfBirth: {
      value: "",
      valid: false,
      touched: false,
    },
    gender: {
      value: "male",
    },
  });
  const [formValidity, setFormValidity] = useState(false);
  const [fieldsClasses, setFieldsClasses] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    dateOfBirth: "",
  });
  useEffect(() => {
    setFormValidity(
      fields.name.valid &&
        fields.username.valid &&
        fields.email.valid &&
        fields.password.valid &&
        fields.passwordConfirmation.valid &&
        fields.dateOfBirth.valid
    );

    for (let field in fields) {
      checkAppropriateClass(field as InputName);
    }
  }, [fields]);

  const checkAppropriateClass = (name: InputName) => {
    setFieldsClasses((prevState) => ({
      ...prevState,
      [name]: !fields[name].valid && fields[name].touched ? "inValid" : "",
    }));
  };

  function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target as { name: InputName; value: string };
    let isValid = false;

    switch (name) {
      case "name":
        isValid = value.length > 2;
        break;
      case "username":
        isValid = value.length > 2;
        break;
      case "email":
        isValid = isEmail(value);
        break;
      case "password":
        isValid = value.length > 5;
        break;
      case "passwordConfirmation":
        isValid = value.length > 5;
        break;
      case "dateOfBirth":
        const minDate = Date.parse("1920-01-01");
        const maxDate = Date.parse("2005-01-01");
        const enteredDate = Date.parse(value);
        isValid = enteredDate <= maxDate && enteredDate >= minDate;
      default:
        break;
    }

    setFields((prevState) => ({
      ...prevState,
      [name]: {
        value,
        touched: true,
        valid: isValid,
      },
    }));
  }

  function mouseOverBtnHandler(e: React.MouseEvent) {
    if (formValidity) return;

    setErrorDiv(
      <>
        <h4>Some of the fields are invalid</h4>
        <h6>Please make sure you follow the following instructions</h6>
        <ul>
          <li>Name and username must be at least 3 characters</li>
          <li>email needs to be a valid email</li>
          <li>password must contain at least 6 characters</li>
        </ul>
      </>
    );
  }

  async function signupSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (fields.password.value !== fields.passwordConfirmation.value) {
      dispatch(
        errorsActions.newError({
          errorTitle: "Password Do Not Match",
          errorMessage: "",
        })
      );
      return;
    }

    try {
      const bodyRequest = {
        name: fields.name.value,
        username: fields.username.value,
        email: fields.email.value,
        password: fields.password.value,
        passwordConfirmation: fields.passwordConfirmation.value,
        dateOfBirth: fields.dateOfBirth.value,
        gender: fields.gender.value,
      };

      const {
        data: { message },
      } = await axiosInstance.post("/auth/signup", bodyRequest);

      await router.push("/auth/registration/set-goals");
      dispatch(
        messagesActions.newMessage({
          messageTitle: "Sign Up Successfully!",
          message,
        })
      );
    } catch (err: any) {
      dispatch(
        errorsActions.newError({
          errorTitle: "Sign Up Failed",
          errorMessage: err.response.data,
        })
      );
    }
  }

  return (
    <form aria-label="form" onSubmit={signupSubmitHandler}>
      <div>
        <input
          className={fieldsClasses.name}
          value={fields.name.value}
          onChange={inputChangeHandler}
          name="name"
          role="textbox"
          type="text"
          id="name"
        />
        <label htmlFor="name">Name</label>
      </div>

      <div>
        <input
          className={fieldsClasses.username}
          value={fields.username.value}
          onChange={inputChangeHandler}
          name="username"
          role="textbox"
          type="text"
          id="username"
        />
        <label htmlFor="username">Username</label>
      </div>

      <div>
        <input
          className={fieldsClasses.email}
          value={fields.email.value}
          onChange={inputChangeHandler}
          name="email"
          role="textbox"
          type="email"
          id="email"
        />
        <label htmlFor="email">Email</label>
      </div>

      <div>
        <input
          className={fieldsClasses.password}
          value={fields.password.value}
          onChange={inputChangeHandler}
          name="password"
          role="textbox"
          type="password"
          id="password"
        />
        <label htmlFor="password">Password</label>
      </div>

      <div>
        <input
          className={fieldsClasses.passwordConfirmation}
          value={fields.passwordConfirmation.value}
          onChange={inputChangeHandler}
          name="passwordConfirmation"
          role="textbox"
          type="password"
          id="passwordConfirmation"
        />
        <label htmlFor="passwordConfirmation">Confirm password</label>
      </div>

      <div>
        <input
          className={fieldsClasses.dateOfBirth}
          onChange={inputChangeHandler}
          value={fields.dateOfBirth.value}
          name="dateOfBirth"
          role="textbox"
          type="date"
          id="date"
          min="1920-01-01"
          max="2005-01-01"
        />
        <label htmlFor="date">Date of birth</label>
      </div>

      <div>
        <label htmlFor="gender">Gender</label>
        <select
          onChange={(e) =>
            setFields((prevState) => ({
              ...prevState,
              gender: { value: e.target.value },
            }))
          }
          value={fields.gender.value}
          required
          role="listbox"
          id="gender"
          name="gender"
        >
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
      </div>

      <div>{errorDiv}</div>

      <div
        onMouseOver={mouseOverBtnHandler}
        onMouseLeave={() => setErrorDiv(null)}
      >
        <button disabled={!formValidity} type="submit">
          Create User
        </button>
      </div>
    </form>
  );
}

export default signupForm;
