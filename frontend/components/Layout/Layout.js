import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCsrfToken } from "../../Redux/Slices/tokens";

import Navigation from "./Navigation";
import classes from "./Layout.module.css";

function Layout({ children }) {
  const dispatch = useDispatch();

  const { error } = useSelector((state) => state.tokensReducer);

  useEffect(() => {
    dispatch(getCsrfToken());
  }, [dispatch]);

  return (
    <>
      {error ? (
        alert("An error accourd, try to refresh")
      ) : (
        <div className={classes.Layout}>
          <Navigation />
          <main>{children}</main>
        </div>
      )}
    </>
  );
}

export default Layout;
