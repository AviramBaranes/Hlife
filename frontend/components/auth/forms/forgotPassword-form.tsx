import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { ComplexInputListObject } from "../../../types/inputConfig";
import {
  inputChangeHandler,
  submitSendEmailFormHandler,
} from "../../../utils/formsHelpers/authHelpers";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";

function forgotPasswordForm() {
  const dispatch = useDispatch();

  const [formValidity, setFormValidity] = useState(false);
  const [email, setEmail] = useState("");
  //need to be an array to be suitable with global inputChangeHandler function
  const [inputConfig, setInputConfig] = useState<ComplexInputListObject[]>([
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
      onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
        submitSendEmailFormHandler(e, dispatch, email)
      }
    >
      <Input
        htmlFor="email"
        label="Email"
        value={email}
        type="email"
        touched={inputConfig[0].touched}
        inValid={!inputConfig[0].valid}
        inputChangeHandler={(event: React.FormEvent<HTMLInputElement>) =>
          inputChangeHandler(
            event,
            0,
            inputConfig,
            setInputConfig,
            setEmail as React.Dispatch<React.SetStateAction<string | object>>,
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
