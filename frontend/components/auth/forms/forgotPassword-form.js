import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  inputChangeHandler,
  submitSendEmailFormHandler,
} from "../../../utils/formsHelpers/authHelpers";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";

function forgotPasswordForm() {
  const dispatch = useDispatch();

  const [formValidity, setFormValidity] = useState(false);
  const [email, setEmail] = useState({ email: "" });
  //need to be an array to be suitable with global inputChangeHandler function
  const [inputConfig, setInputConfig] = useState([
    {
      value: email,
      valid: false,
      touched: false,
      rules: {
        isEmail: true,
      },
    },
  ]);

  return (
    <form
      aria-label="form"
      onSubmit={(e) => submitSendEmailFormHandler(e, dispatch, email.email)}
    >
      <Input
        htmlFor="email"
        label="Email"
        value={email.email}
        type="email"
        touched={inputConfig[0].touched}
        inValid={!inputConfig[0].valid}
        inputChangeHandler={(event) =>
          inputChangeHandler(
            event,
            0,
            inputConfig,
            setInputConfig,
            setEmail,
            setFormValidity
          )
        }
      />
      <Button disabled={!formValidity} type="submit">
        Send
      </Button>
    </form>
  );
}

export default forgotPasswordForm;
