import React, { useEffect, useReducer, useState } from "react";
import { useDispatch } from "react-redux";

import classes from '../../../styles/pages/settings.module.scss'
import { messagesActions } from "../../../redux/slices/messages/messagesSlice";
import axiosInstance from "../../../utils/axios/axiosInstance";
import { handleAxiosError } from "../../../utils/errors/handleRequestErrors";

interface FieldObj {
  value: string;
  valid: boolean;
  touched: boolean;
  class: string;
  active:boolean;
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
  currentPassword: { value: "", valid: false, touched: false, class: "",active:false },
  newPassword: { value: "", valid: false, touched: false, class: "",active:false },
  passwordConfirmation: { value: "", valid: false, touched: false, class: "",active:false },
};

const reducer = (state: StateType, action: ActionType) => {
  const {value} = action;
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
          value,
          touched: true,
          active:value !== '',
        },
      };
    case "newPassChange":
      const newState = {
        ...state,
        newPassword: {
          ...state.newPassword,
          value,
          touched: true,
          active:value !== '',
        },
      };
      return newState;
    case "confirmPassChange":
      return {
        ...state,
        passwordConfirmation: {
          ...state.passwordConfirmation,
          value,
          touched: true,
          active:value !== '',
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
      label: "Current",
      value: currentPassword.value,
    },
    {
      className: newPassword.class,
      htmlFor: "newPassword",
      inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;
        dispatchLocalState({ type: "newPassChange", value });
        dispatchLocalState({ type: "Validity Check", value: "" });
        dispatchLocalState({ type: "appropriateClassCheck", value: "" });
      },
      label: "New Password",
      value: newPassword.value,
    },
    {
      className: passwordConfirmation.class,
      htmlFor: "passwordConfirmation",
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
    console.log('here')
    if(formValidity) return
    setErrorDiv(
      <>
      <section>
        <h4>Some of the fields you entered are invalid</h4>
        <h6>Please make sure you follow the following instructions:</h6>
      </section>
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
      handleAxiosError(err,dispatch,"Change Password Failed")
    }
  };
console.log(errorDiv)
  return (
    <form onSubmit={formSubmitHandler}>
      {fields.map((field) => {
        return (
          <div className='input-container' key={field.htmlFor}>
            <input
              role="textbox"
              required
              className={field.className}
              id={field.htmlFor}
              value={field.value}
              onChange={field.inputChangeHandler}
              type="password"
            />
            <label className={localState[field.htmlFor as 'newPassword' |'newPassword' | 'passwordConfirmation'].active ? 'Active' : ''} htmlFor={field.htmlFor}>{field.label}</label>
          </div>
        );
        

      })}
     {errorDiv && <div className={'error-div' + ' ' + classes.ErrorDiv} >{errorDiv}</div>}


      <div
        className='error-detector-div'
        onMouseOver={mouseOverHandler}
        onMouseLeave={(e) => setErrorDiv(null)}
      >
        <button className='primary-button' disabled={!formValidity} type="submit">
          continue
        </button>
      </div>
      <br />
    </form>
  );
};

export default ChangePassword;
