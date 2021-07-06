import React, { useState } from "react";
import Router from "next/router";
import { useDispatch } from "react-redux";

import {
  createInputListForSignup,
  inputChangeHandler,
  signupSubmitFormHandler,
} from "../../../utils/formsHelpers/authHelpers";
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
  const [inputsList, setInputList] = useState(ALL_INPUTS);

  function signupSubmitHandler(e) {
    signupSubmitFormHandler(e, dispatch, userFields);
  }

  return (
    <form aria-label="form" onSubmit={signupSubmitHandler}>
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
      <label htmlFor="gender">Gender</label>
      <select id="gender" name="gender" onChange={inputChangeHandler}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <br />
      <Input
        inputChangeHandler={(e) =>
          setUserFields((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
          }))
        }
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
