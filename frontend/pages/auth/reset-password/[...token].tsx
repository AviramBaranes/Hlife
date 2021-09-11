import React, { useState } from "react";
import { GetServerSideProps } from "next";

import axiosInstance from "../../../utils/axios/axiosInstance";
import {
  createInputListForPasswordReset,
  inputChangeHandler,
  submitChangePasswordHandler,
} from "../../../utils/formsHelpers/authHelpers";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import { useDispatch } from "react-redux";
import { ComplexInputListObject } from "../../../types/inputConfig";
import classes from "../../../styles/pages/changePassword.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

function ResetPassword({ token }: { token: string }) {
  const dispatch = useDispatch();

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
    <>
      <section className={classes.Title}>
        <h1>Change Password</h1>
        <h5>Fill the fields with your new strong password</h5>
      </section>
      <section className={classes.Main}>
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
        <FontAwesomeIcon icon={faLock} className="fa-10x" />
      </section>
    </>
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
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
};
