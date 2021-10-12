import React, { SetStateAction } from "react";
import { useDispatch } from "react-redux";

import classes from "./Logout.module.scss";
import { logoutHandler } from "../../../utils/formsHelpers/authHelpers";

interface LogoutProps {
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
  setShowNav: React.Dispatch<SetStateAction<boolean>>;
}

const Logout: React.FC<LogoutProps> = ({ setShowModal, setShowNav }) => {
  const dispatch = useDispatch();

  return (
    <div className={classes.Logout}>
      <h1>Log Out</h1>
      <p>Are you sure you want to logout?</p>
      <div className={classes.Buttons}>
        <button
          className={classes.Red}
          onClick={() => {
            setShowNav(false);
            logoutHandler(dispatch, setShowModal);
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
