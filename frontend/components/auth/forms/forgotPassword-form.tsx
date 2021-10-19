import router from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import isEmail from "validator/lib/isEmail";
import { errorsActions } from "../../../redux/slices/errors/errorsSlice";
import { messagesActions } from "../../../redux/slices/messages/messagesSlice";
import axiosInstance from "../../../utils/axios/axiosInstance";

function forgotPasswordForm() {
  const dispatch = useDispatch();

  const [errorDiv, setErrorDiv] = useState<JSX.Element | null>(null);
  const [inputClass, setInputClass] = useState("");
  const [email, setEmail] = useState("");
  const [emailValidity, setEmailValidity] = useState({
    valid: false,
    touched: false,
  });

  useEffect(() => {
    setEmailValidity((prevState) => ({ ...prevState, valid: isEmail(email) }));

    if (emailValidity.touched && !emailValidity.valid) {
      setInputClass("inValid");
    } else {
      setInputClass("");
    }
  }, [email]);

  function mouseOverBtnHandler(e: React.MouseEvent) {
    if (emailValidity.valid) return;
    setErrorDiv(
      <>
        <h4>Email field is invalid</h4>
        <h6>Please make sure you enter a valid email</h6>
      </>
    );
  }

  async function submitSendEmailFormHandler(e: React.FormEvent) {
    e.preventDefault();

    try {
      const {
        data: { message },
      } = await axiosInstance.post("/auth/password/send-token", { email });

      await router.push("/auth/login");
      dispatch(
        messagesActions.newMessage({ messageTitle: "Email Sent!", message })
      );
    } catch (err: any) {
      dispatch(
        errorsActions.newError({
          errorTitle: "Sending Email Failed",
          errorMessage: err.response.message,
        })
      );
    }
  }

  return (
    <form aria-label="form" onSubmit={submitSendEmailFormHandler}>
      <div>
        <input
          className={inputClass}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value),
              setEmailValidity((prevState) => ({
                ...prevState,
                touched: true,
              }));
          }}
          name="email"
          role="textbox"
          type="email"
          id="email"
        />
        <label htmlFor="email">Email:</label>
      </div>

      <div>{errorDiv}</div>

      <div
        onMouseOver={mouseOverBtnHandler}
        onMouseLeave={() => setErrorDiv(null)}
      >
        <button disabled={!emailValidity.valid} type="submit">
          Send
        </button>
      </div>
    </form>
  );
}

export default forgotPasswordForm;
