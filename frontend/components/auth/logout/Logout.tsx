import React, { SetStateAction } from "react";
import { useDispatch } from "react-redux";

import classes from "./Logout.module.scss";
import router from "next/router";
import { logoutAction } from "../../../redux/slices/auth/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { CustomError } from "../../../types/CustomErrors";
import { errorsActions } from "../../../redux/slices/errors/errorsSlice";

interface LogoutProps {
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
  setShowNav: React.Dispatch<SetStateAction<boolean>>;
}

const Logout: React.FC<LogoutProps> = ({ setShowModal, setShowNav }) => {
  const dispatch = useDispatch();

  function logoutHandler() {
    router.push("/auth/login");
    dispatch(logoutAction() as any)
      .then(unwrapResult)
      .then(() => {
        setShowModal(false);
      })
      .catch((err: CustomError) => {
        router.push("/");
        dispatch(
          errorsActions.newError({
            errorTitle: "Logout failed",
            errorMessage: err.data,
            errorStatusCode: err.status,
          })
        );
      });
  }

  return (
    <div className={classes.Logout}>
      <h1>Log Out</h1>
      <p>Are you sure you want to logout?</p>
      <div className={classes.Buttons}>
        <button
          className={classes.Red}
          onClick={() => {
            setShowNav(false);
            logoutHandler();
          }}
        >
          Logout
        </button>
        <button onClick={() => setShowModal(false)} className={classes.Green}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Logout;
