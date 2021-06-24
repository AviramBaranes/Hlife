import axios from "axios";
import React, { useState } from "react";
import Router from "next/router";
import { useDispatch } from "react-redux";

import { createInputListForLogin } from "../../../utils/formsHelpers/loginHelpers";
import Input from "../../UI/Input";
import { loginUserAction } from "../../../Redux/Slices/auth";
import { unwrapResult } from "@reduxjs/toolkit";

function loginForm() {
  const dispatch = useDispatch();

  const [userFields, setUserFields] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userFields;

  function inputChangeHandler(e) {
    const { name, value } = e.target;

    setUserFields((prevState) => ({ ...prevState, [name]: value }));
  }

  const ALL_INPUTS = createInputListForLogin(email, password);

  async function signupSubmitHandler(e) {
    e.preventDefault();
    dispatch(loginUserAction({ ...userFields }))
      .then(unwrapResult)
      .then((_) => Router.push("/"));
  }

  return (
    <form onSubmit={signupSubmitHandler}>
      {ALL_INPUTS.map((field) => {
        return (
          <Input
            key={field.htmlFor}
            htmlFor={field.htmlFor}
            label={field.label}
            value={field.value}
            type={field.type}
            inputChangeHandler={inputChangeHandler}
          />
        );
      })}
      <button type="submit">Login</button>
    </form>
  );
}

export default loginForm;
