import React, { useState } from "react";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import validator from "validator";

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

  const ALL_INPUTS = createInputListForSignup(
    name,
    username,
    email,
    password,
    passwordConfirmation
  );

  const [formValidity, setFormValidity] = useState(false);
  const [inputs, setInputs] = useState(ALL_INPUTS);

  function validationTester(value, rules) {
    let isValid = true;

    if (!rules) return isValid;

    if (rules.isAlpha) {
      isValid = validator.isAlpha(value) && isValid;
    }

    if (rules.isAlphanumeric) {
      isValid = validator.isAlphanumeric(value) && isValid;
    }

    if (rules.isEmail) {
      isValid = validator.isEmail(value) && isValid;
    }

    if (rules.minLength) {
      isValid = validator.isLength(value, { min: rules.minLength }) && isValid;
    }

    return isValid;
  }

  function inputChangeHandler(e, index) {
    const { name, value } = e.target;

    const fieldsData = [...inputs];

    const elementData = { ...fieldsData[index] };

    elementData.value = value;

    elementData.valid = validationTester(elementData.value, elementData.rules);

    elementData.touched = true;

    fieldsData[index] = elementData;

    let isFormValid = true;

    fieldsData.forEach((field) => {
      isFormValid = field.valid && isFormValid;
    });

    setInputs(fieldsData);

    setUserFields((prevState) => ({ ...prevState, [name]: value }));

    setFormValidity(isFormValid);
  }

  async function signupSubmitHandler(e) {
    e.preventDefault();

    dispatch(signupUserAction({ ...userFields }))
      .then(unwrapResult)
      .then(Router.push("/"));
  }

  return (
    <form onSubmit={signupSubmitHandler}>
      {inputs.map((field, index) => {
        return (
          <Input
            key={field.htmlFor}
            htmlFor={field.htmlFor}
            label={field.label}
            value={field.value}
            type={field.type}
            inputChangeHandler={(e) => inputChangeHandler(e, index)}
            touched={field.touched}
            inValid={!field.valid}
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
      <Button disabled={!formValidity} type="submit">
        Create User
      </Button>
    </form>
  );
}

export default signupForm;
