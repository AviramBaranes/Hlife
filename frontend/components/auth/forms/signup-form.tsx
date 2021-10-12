import React, { useState, Dispatch } from "react";
import { useDispatch } from "react-redux";

import {
  createInputListForSignup,
  inputChangeHandler,
  signupSubmitFormHandler,
} from "../../../utils/formsHelpers/authHelpers";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import { ComplexInputListObject } from "../../../types/inputConfig";
import classes from "../../../styles/pages/signup.module.scss";

function signupForm() {
  const dispatch = useDispatch();

  const [userFields, setUserFields] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    "password-Confirmation": "",
    gender: "male",
    dateOfBirth: "",
  });

  const { name, username, email, password, dateOfBirth } = userFields;

  const passwordConfirmation = userFields["password-Confirmation"];

  const ALL_INPUTS = createInputListForSignup(
    name,
    username,
    email,
    password,
    passwordConfirmation
  );

  const [formValidity, setFormValidity] = useState(false);
  const [inputsList, setInputList] =
    useState<ComplexInputListObject[]>(ALL_INPUTS);
  const [dateInputTouched, setDateInputTouched] = useState(false);
  const [dateInputIsValid, setDateInputIsValid] = useState(false);

  function dateInputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setDateInputTouched(true);
    const minDate = Date.parse("1920-01-01");
    const maxDate = Date.parse("2005-01-01");
    const enteredDate = Date.parse(value);
    console.log(enteredDate <= maxDate && enteredDate >= minDate);
    if (enteredDate <= maxDate && enteredDate >= minDate) {
      setDateInputIsValid(true);
    } else {
      setDateInputIsValid(false);
    }
    setUserFields((prevState) => ({
      ...prevState,
      dateOfBirth: value,
    }));
  }

  function signupSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    signupSubmitFormHandler(e, dispatch, userFields);
  }

  return (
    <form aria-label="form" onSubmit={signupSubmitHandler}>
      {inputsList.map((field, index) => {
        return (
          <Input
            key={field.htmlFor}
            htmlFor={field.htmlFor!}
            label={field.label!}
            value={field.value}
            type={field.type!}
            inputChangeHandler={(event: React.ChangeEvent<HTMLInputElement>) =>
              inputChangeHandler(
                event,
                index,
                inputsList,
                setInputList,
                setUserFields as Dispatch<
                  React.SetStateAction<string | object>
                >,
                setFormValidity
              )
            }
            touched={field.touched}
            inValid={!field.valid}
          />
        );
      })}

      <Input
        inputChangeHandler={dateInputChangeHandler}
        inValid={!dateInputIsValid}
        touched={dateInputTouched}
        htmlFor="dateOfBirth"
        type="date"
        label="Date Of Birth"
        value={dateOfBirth}
        elementConfig={{
          min: "1920-01-01",
          max: "2005-01-01",
        }}
      />
      <div className={classes.GenderSelect}>
        <label htmlFor="gender">Gender:</label>
        <select
          value="male"
          required
          role="listbox"
          id="gender"
          name="gender"
          onChange={() => inputChangeHandler}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <br />
      <Button disabled={!formValidity} type="submit">
        Create User
      </Button>
    </form>
  );
}

export default signupForm;
