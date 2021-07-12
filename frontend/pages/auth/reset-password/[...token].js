import React, { useState } from "react";

import axiosInstance from "../../../utils/Axios/axiosInstance";
import {
  createInputListForPasswordReset,
  inputChangeHandler,
  submitChangePasswordHandler,
} from "../../../utils/formsHelpers/authHelpers";
import Card from "../../../components/UI/Card/Card";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import { useDispatch } from "react-redux";
import { errorsActions } from "../../../Redux/Slices/errors";

function ResetPassword({ token, withError }) {
  const dispatch = useDispatch();

  if (withError) {
    dispatch(
      errorsActions.newError({ errorTitle: "Error", errorMessage: withError })
    );
  }

  const [passwordsFields, setPasswordsFields] = useState({
    password: "",
    passwordConfirmation: "",
  });
  const { password, passwordConfirmation } = passwordsFields;

  const ALL_INPUTS = createInputListForPasswordReset(
    password,
    passwordConfirmation
  );

  const [inputs, setInputs] = useState(ALL_INPUTS);
  const [formValidity, setFormValidity] = useState(false);

  return (
    <Card>
      {withError ? null : (
        <>
          <h2>Change Password</h2>
          <form
            onSubmit={(e) =>
              submitChangePasswordHandler(e, dispatch, passwordsFields, token)
            }
          >
            {inputs.map((input, index) => {
              return (
                <Input
                  key={input.htmlFor}
                  htmlFor={input.htmlFor}
                  label={input.label}
                  value={input.value}
                  type={input.type}
                  inputChangeHandler={(event) =>
                    inputChangeHandler(
                      event,
                      index,
                      inputs,
                      setInputs,
                      setPasswordsFields,
                      setFormValidity
                    )
                  }
                  touched={input.touched}
                  inValid={!input.valid}
                />
              );
            })}
            <Button disabled={!formValidity} type="submit">
              Reset Password
            </Button>
          </form>
        </>
      )}
    </Card>
  );
}

export default ResetPassword;

export async function getServerSideProps(ctx) {
  try {
    const { params } = ctx;

    const token = params.token[0];

    await axiosInstance.get(`/auth/reset/validate-token/${token}`);

    return { props: { token } };
  } catch (err) {
    return { props: { withError: err.response.data } };
  }
}
