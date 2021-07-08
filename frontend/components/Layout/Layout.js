import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCsrfToken } from "../../Redux/Slices/tokens";

import Navigation from "./Navigation";
import LoadingSpinner from "../UI/Spinner/Spinner";
import classes from "./Layout.module.scss";
import { errorsActions } from "../../Redux/Slices/errors";

function Layout({ children }) {
  const dispatch = useDispatch();

  const { error } = useSelector((state) => state.tokensReducer);
  const { loading } = useSelector((state) => state.usersReducer);

  useEffect(() => {
    dispatch(getCsrfToken());
  }, [dispatch]);

  if (error) {
    dispatch(
      errorsActions.newError({
        errorTitle: "Server Error",
        errorMessage: error,
      })
    );
  }

  return (
    <>
      {error ? null : (
        <div className={classes.Layout}>
          <Navigation />
          <main>{loading ? <LoadingSpinner /> : children}</main>
        </div>
      )}
    </>
  );
}

export default Layout;
