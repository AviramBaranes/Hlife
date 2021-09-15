import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCsrfToken } from "../../redux/slices/tokens";

import Navigation from "./Navigation";
import LoadingSpinner from "../UI/Spinner/Spinner";
import classes from "./Layout.module.scss";
import { errorsActions } from "../../redux/slices/errors/errorsSlice";
import { RootState } from "../../redux/store/reduxStore";

function Layout({ children }: { children: React.ReactNode[] }) {
  const dispatch = useDispatch();

  const { error } = useSelector((state: RootState) => state.tokensReducer);
  const { loading } = useSelector((state: RootState) => state.usersReducer);

  useEffect(() => {
    dispatch(getCsrfToken());
  }, [dispatch]);

  if (error.message) {
    dispatch(
      errorsActions.newError({
        errorTitle: "Server Error",
        errorMessage: `${error.message}, try to refresh`,
      })
    );
  }

  return (
    <>
      {error.message ? (
        children[0]
      ) : (
        <div className={classes.Layout}>
          <Navigation />
          <main>{loading ? <LoadingSpinner /> : children}</main>
        </div>
      )}
    </>
  );
}

export default Layout;
