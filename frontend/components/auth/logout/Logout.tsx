import React from "react";
import { useDispatch } from "react-redux";

import classes from "./Logout.module.scss";
import { logoutHandler } from "../../../utils/formsHelpers/authHelpers";

function Logout({
  setShowModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dispatch = useDispatch();

  return (
    <div className={classes.Logout}>
      <h1>Log Out</h1>
      <p>Are you sure you want to logout?</p>
      <div className={classes.Buttons}>
        <button
          className={classes.Red}
          onClick={() => logoutHandler(dispatch, setShowModal)}
        >
          Logout
        </button>
        <button onClick={() => setShowModal(false)} className={classes.Green}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Logout;
