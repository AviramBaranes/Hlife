import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  createInputListForLogin,
  inputChangeHandler,
  loginSubmitFormHandler,
} from "../../../utils/formsHelpers/authHelpers";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";

function loginForm() {
  const dispatch = useDispatch();

  const [userFields, setUserFields] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userFields;

  const ALL_INPUTS = createInputListForLogin(email, password);

  const [formValidity, setFormValidity] = useState(false);
  const [inputsList, setInputList] = useState(ALL_INPUTS);

  function loginSubmitHandler(e) {
    loginSubmitFormHandler(e, dispatch, userFields);
  }

  return (
    <form aria-label="form" onSubmit={loginSubmitHandler}>
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
      <Button disabled={!formValidity} type="submit">
        Login
      </Button>
    </form>
  );
}

export default loginForm;
