import React, { useState } from "react";
import axios from "axios";

import Input from "../../UI/Input";

function signupForm({ signupSubmitHandler }) {
  const [userFields, setUserFields] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    gender: "",
    dateOfBirth: null,
  });

  const { name, username, email, password, passwordConfirmation, dateOfBirth } =
    userFields;

  function inputChangeHandler(e) {
    const { name, value } = e.target;

    setUserFields((prevState) => ({ ...prevState, [name]: value }));
  }

  const ALL_INPUTS = [
    {
      label: "Name",
      htmlFor: "name",
      type: "text",
      value: name,
    },
    {
      label: "Username",
      htmlFor: "username",
      type: "text",
      value: username,
    },
    {
      label: "Email",
      htmlFor: "email",
      type: "email",
      value: email,
    },
    {
      label: "Password",
      htmlFor: "password",
      type: "password",
      value: password,
    },
    {
      label: "Password Confirmation",
      htmlFor: "passwordConfirmation",
      type: "password",
      value: passwordConfirmation,
    },
  ];

  async function signupSubmitHandler(e) {
    e.preventDefault();
    console.log(userFields);
    try {
      const res = await axios.post("http://localhost:8080/auth/signup", {
        userFields,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={signupSubmitHandler}>
      {ALL_INPUTS.map((field) => {
        return (
          <Input
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
      <button type="submit">Create User</button>
    </form>
  );
}

export default signupForm;
