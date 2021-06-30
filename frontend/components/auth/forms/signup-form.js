import React, { useState } from "react";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import { createInputListForSignup } from "../../../utils/formsHelpers/signupHelpers";
import { signupUserAction } from "../../../Redux/Slices/auth";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";

function signupForm() {
  const dispatch = useDispatch();

  const [userFields, setUserFields] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    gender: "male",
    dateOfBirth: "",
  });

  const { name, username, email, password, passwordConfirmation, dateOfBirth } =
    userFields;

  // function validationTester(value,rules){
  //   let isValid = true;
  //   if (rules.minLength) {
  //     isValid = value.length >= rules.minLength && isValid;
  //   }
  // }

  function inputChangeHandler(e) {
    const { name, value } = e.target;

    setUserFields((prevState) => ({ ...prevState, [name]: value }));
  }

  const ALL_INPUTS = createInputListForSignup(
    name,
    username,
    email,
    password,
    passwordConfirmation
  );

  async function signupSubmitHandler(e) {
    e.preventDefault();

    dispatch(signupUserAction({ ...userFields }))
      .then(unwrapResult)
      .then(Router.push("/"));
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
      <label>Gender</label>
      <select name="gender" onChange={inputChangeHandler}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <br />
      <Input
        inputChangeHandler={inputChangeHandler}
        htmlFor="dateOfBirth"
        type="date"
        label="Date Of Birth"
        value={dateOfBirth}
        elementConfig={{
          min: "1920-01-01",
          max: "2005-01-01",
        }}
      />
      <Button type="submit">Create User</Button>
    </form>
  );
}

export default signupForm;
