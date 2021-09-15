import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { ComplexInputListObject } from "../../../types/inputConfig";
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
  const [inputsList, setInputList] =
    useState<ComplexInputListObject[]>(ALL_INPUTS);

  function loginSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    loginSubmitFormHandler(e, dispatch, userFields);
  }

  return (
    <form aria-label="form" onSubmit={loginSubmitHandler}>
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
                setUserFields as React.Dispatch<
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
      <Button disabled={!formValidity} type="submit">
        Login
      </Button>
    </form>
  );
}

export default loginForm;
