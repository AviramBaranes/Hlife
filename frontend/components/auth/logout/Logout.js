import React from "react";
import { useRouter } from "next/router";

import classes from "./Logout.module.scss";
import axiosInstance from "../../../utils/Axios/axiosInstance";

function Logout({ setShowModal }) {
  const router = useRouter();

  const logoutHandler = async () => {
    try {
      await axiosInstance.post("/auth/logout");

      setShowModal(false);
      router.reload(window.location.pathname);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={classes.Logout}>
      <h1>Log Out</h1>
      <p>Are you sure you want to logout?</p>
      <div className={classes.Buttons}>
        <button className={classes.Red} onClick={logoutHandler}>
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
