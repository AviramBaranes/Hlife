import React, { useState } from "react";
import { GetServerSideProps } from "next";

import axiosInstance from "../../../utils/axios/axiosInstance";
import {
  createInputListForPasswordReset,
  inputChangeHandler,
  submitChangePasswordHandler,
} from "../../../utils/formsHelpers/authHelpers";
import Card from "../../../components/UI/Card/Card";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import { useDispatch } from "react-redux";
import { errorsActions } from "../../../redux/slices/errors";
import { ComplexInputListObject } from "../../../types/inputConfig";

interface ResetPasswordProps {
  token: string;
  withError: string;
}

function ResetPassword({ token, withError }: ResetPasswordProps) {
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

  const [inputs, setInputs] = useState<ComplexInputListObject[]>(ALL_INPUTS);
  const [formValidity, setFormValidity] = useState(false);

  return (
    <Card>
      {withError ? null : (
        <>
          <h2>Change Password</h2>
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
              submitChangePasswordHandler(e, dispatch, passwordsFields, token)
            }
          >
            {inputs.map((input, index) => {
              return (
                <Input
                  key={input.htmlFor!}
                  htmlFor={input.htmlFor!}
                  label={input.label!}
                  value={input.value}
                  type={input.type!}
                  inputChangeHandler={(
                    event: React.FormEvent<HTMLInputElement>
                  ) =>
                    inputChangeHandler(
                      event,
                      index,
                      inputs,
                      setInputs,
                      setPasswordsFields as React.Dispatch<
                        React.SetStateAction<string | object>
                      >,
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { params } = ctx;

    const token = params!.token![0];

    await axiosInstance.get(`/auth/reset/validate-token/${token}`);

    return { props: { token } };
  } catch (err) {
    return { props: { withError: err.response.data } };
  }
};
