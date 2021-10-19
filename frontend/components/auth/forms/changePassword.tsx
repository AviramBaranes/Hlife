import React, { useEffect, useReducer, useState } from "react";
import { useDispatch } from "react-redux";

import { errorsActions } from "../../../redux/slices/errors/errorsSlice";
import { messagesActions } from "../../../redux/slices/messages/messagesSlice";
import axiosInstance from "../../../utils/axios/axiosInstance";

interface FieldObj {
  value: string;
  valid: boolean;
  touched: boolean;
  class: string;
}

interface StateType {
  currentPassword: FieldObj;
  newPassword: FieldObj;
  passwordConfirmation: FieldObj;
}

interface ActionType {
  type:
    | "Validity Check"
    | "currentPassChange"
    | "newPassChange"
    | "confirmPassChange"
    | "appropriateClassCheck";
  value: string;
}

const initialState = {
  currentPassword: { value: "", valid: false, touched: false, class: "" },
  newPassword: { value: "", valid: false, touched: false, class: "" },
  passwordConfirmation: { value: "", valid: false, touched: false, class: "" },
};

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "Validity Check":
      return {
        currentPassword: {
          ...state.currentPassword,
          valid:
            state.currentPassword.value !== state.newPassword.value &&
            state.currentPassword.value.length > 5,
        },
        newPassword: {
          ...state.newPassword,
          valid:
            state.newPassword.value === state.passwordConfirmation.value &&
            state.newPassword.value.length > 5,
        },
        passwordConfirmation: {
          ...state.passwordConfirmation,
          valid:
            state.newPassword.value === state.passwordConfirmation.value &&
            state.newPassword.value.length > 5,
        },
      };
    case "currentPassChange":
      return {
        ...state,
        currentPassword: {
          ...state.currentPassword,
          value: action.value,
          touched: true,
        },
      };
    case "newPassChange":
      const newState = {
        ...state,
        newPassword: {
          ...state.newPassword,
          value: action.value,
          touched: true,
        },
      };
      return newState;
    case "confirmPassChange":
      return {
        ...state,
        passwordConfirmation: {
          ...state.passwordConfirmation,
          value: action.value,
          touched: true,
        },
      };
    case "appropriateClassCheck":
      return {
        currentPassword: {
          ...state.currentPassword,
          class:
            !state.currentPassword.valid && state.currentPassword.touched
              ? "inValid"
              : "",
        },
        newPassword: {
          ...state.newPassword,
          class:
            !state.newPassword.valid && state.newPassword.touched
              ? "inValid"
              : "",
        },
        passwordConfirmation: {
          ...state.passwordConfirmation,
          class:
            !state.passwordConfirmation.valid &&
            state.passwordConfirmation.touched
              ? "inValid"
              : "",
        },
      };
    default:
      return state;
  }
};

const ChangePassword: React.FC = () => {
  const dispatch = useDispatch();

  const [localState, dispatchLocalState] = useReducer(reducer, initialState);
  const { currentPassword, newPassword, passwordConfirmation } = localState;

  const [errorDiv, setErrorDiv] = useState<JSX.Element | null>(null);
  const [formValidity, setFormValidity] = useState(false);

  useEffect(() => {
    setFormValidity(
      currentPassword.valid && newPassword.valid && passwordConfirmation.valid
    );
  }, [localState]);

  const fields = [
    {
      className: currentPassword.class,
      htmlFor: "currentPassword",
      inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;
        dispatchLocalState({ type: "currentPassChange", value });
        dispatchLocalState({ type: "Validity Check", value: "" });
        dispatchLocalState({ type: "appropriateClassCheck", value: "" });
      },
      label: "Current Password",
      value: currentPassword.value,
    },
    {
      className: newPassword.class,
      htmlFor: "Password",
      inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;
        dispatchLocalState({ type: "newPassChange", value });
        dispatchLocalState({ type: "Validity Check", value: "" });
        dispatchLocalState({ type: "appropriateClassCheck", value: "" });
      },
      label: "Password",
      value: newPassword.value,
    },
    {
      className: passwordConfirmation.class,
      htmlFor: "ConfirmPassword",
      inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;
        dispatchLocalState({ type: "confirmPassChange", value });
        dispatchLocalState({ type: "Validity Check", value: "" });
        dispatchLocalState({ type: "appropriateClassCheck", value: "" });
      },
      label: "Confirm",
      value: passwordConfirmation.value,
    },
  ];

  const mouseOverHandler = () => {
    setErrorDiv(
      <>
        <h5>Some of the fields you entered are invalid</h5>
        <h6>Please make sure you follow the following instructions:</h6>
        <ul>
          <li>your current password is correct</li>
          <li>your new password is at least 6 characters</li>
          <li>you filled the password confirmation field correctly</li>
        </ul>
      </>
    );
  };

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValidity) return;

    try {
      const requestBody = {
        currentPassword: currentPassword.value,
        newPassword: newPassword.value,
        newPasswordConfirmation: passwordConfirmation.value,
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
      {fields.map((field) => {
        return (
          <div key={field.htmlFor}>
            <input
              role="textbox"
              required
              className={field.className}
              id={field.htmlFor}
              value={field.value}
              onChange={field.inputChangeHandler}
              type="password"
            />
            <label htmlFor={field.htmlFor}>{field.label}</label>
          </div>
        );
      })}
      <div>{errorDiv}</div>
      <div
        onMouseLeave={(e) => setErrorDiv(null)}
        onMouseOver={mouseOverHandler}
      >
        <button disabled={!formValidity} type="submit">
          continue
        </button>
      </div>
      <br />
    </form>
  );
};

export default ChangePassword;
