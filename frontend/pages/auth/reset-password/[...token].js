import React, { useState } from "react";
import router from "next/router";

import axiosInstance from "../../../utils/Axios/axiosInstance";
import {
  createInputListForPasswordReset,
  inputChangeHandler,
} from "../../../utils/formsHelpers/authHelpers";
import Card from "../../../components/UI/Card/Card";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import { useDispatch } from "react-redux";
import { errorsActions } from "../../../Redux/Slices/errors";
import { messagesActions } from "../../../Redux/Slices/messages";
import { usersActions } from "../../../Redux/Slices/auth";

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

  async function submitChangePasswordHandler(e) {
    e.preventDefault();

    try {
      dispatch(usersActions.changeLoadingState(true));

      const bodyRequest = { ...passwordsFields, resetToken: token };
      const res = await axiosInstance.put(
        "/auth/reset/password-reset",
        bodyRequest
      );
      dispatch(usersActions.changeLoadingState(false));
      dispatch(errorsActions.errorConfirmed());
      dispatch(
        messagesActions.newMessage({
          messageTitle: "Success!",
          message: res.data,
        })
      );

      router.push("/auth/login");
    } catch (err) {
      dispatch(usersActions.changeLoadingState(false));

      dispatch(
        errorsActions.newError({
          errorTitle: "Reset Failed",
          errorMessage: err.response.data,
          errorStatusCode: err.response.status,
        })
      );
    }
  }

  return (
    <Card>
      {withError ? null : (
        <>
          <h2>Change Password </h2>
          <form onSubmit={submitChangePasswordHandler}>
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
