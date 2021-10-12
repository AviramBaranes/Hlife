import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { errorsActions } from "../../../redux/slices/errors/errorsSlice";
import { messagesActions } from "../../../redux/slices/messages/messagesSlice";
import axiosInstance from "../../../utils/axios/axiosInstance";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";

const ChangePassword: React.FC = () => {
  const dispatch = useDispatch();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [touched, setTouched] = useState({
    currentPassword: false,
    newPassword: false,
    passwordConfirmation: false,
  });

  const [formValidity, setFormValidity] = useState(false);

  useEffect(() => {
    setFormValidity(!fields.some((field) => field.inValid === true));
  }, [currentPassword, newPassword, passwordConfirmation]);

  const fields = [
    {
      htmlFor: "currentPassword",
      inValid: currentPassword.length < 6,
      inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setTouched((prevState) => ({
          ...prevState,
          currentPassword: true,
        }));
        setCurrentPassword(e.target.value);
      },
      label: "Current Password",
      touched: touched.currentPassword,
      value: currentPassword,
    },
    {
      htmlFor: "Password",
      inValid: currentPassword === newPassword || newPassword.length < 6,
      inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setTouched((prevState) => ({
          ...prevState,
          newPassword: true,
        }));
        setNewPassword(e.target.value);
      },
      label: "Password",
      touched: touched.newPassword,
      value: newPassword,
    },
    {
      htmlFor: "ConfirmPassword",
      inValid:
        passwordConfirmation !== newPassword || passwordConfirmation.length < 6,
      inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setTouched((prevState) => ({
          ...prevState,
          passwordConfirmation: true,
        }));
        setPasswordConfirmation(e.target.value);
      },
      label: "Confirm",
      touched: touched.passwordConfirmation,
      value: passwordConfirmation,
    },
  ];

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValidity) return;

    try {
      const requestBody = {
        currentPassword,
        newPassword,
        newPasswordConfirmation: passwordConfirmation,
      };

      const { data } = await axiosInstance.post(
        "/auth/settings/password-reset",
        requestBody
      );

      dispatch(
        messagesActions.newMessage({
          messageTitle: "Changed Password Successfully",
          message: data,
        })
      );
    } catch (err: any) {
      dispatch(
        errorsActions.newError({
          errorTitle: "Change Password Failed",
          errorMessage: err.response.data,
          errorStatusCode: err.response.statusCode,
        })
      );
    }
  };

  return (
    <form onSubmit={formSubmitHandler}>
      {fields.map((field, i) => {
        return (
          <Input
            key={field.htmlFor + i}
            htmlFor={field.htmlFor}
            inValid={field.inValid}
            inputChangeHandler={field.inputChangeHandler}
            label={field.label}
            touched={field.touched}
            type="password"
            value={field.value}
          />
        );
      })}
      <div>
        <Button disabled={!formValidity} type="submit">
          continue
        </Button>
      </div>
      <br />
    </form>
  );
};

export default ChangePassword;
