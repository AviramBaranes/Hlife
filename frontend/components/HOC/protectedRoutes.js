import { unwrapResult } from "@reduxjs/toolkit";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateAuthenticationAction } from "../../Redux/Slices/auth";
import { errorsActions } from "../../Redux/Slices/errors";

const ProtectedRoute = (WrappedComponent) => {
  return (props) => {
    const Router = useRouter();
    const dispatch = useDispatch();

    const { isAuthenticated, loading } = useSelector(
      (state) => state.usersReducer
    );
    const [verified, setVerified] = useState(false);

    useEffect(() => {
      let unmounted = false;

      if (!loading && !unmounted) {
        setVerified(isAuthenticated);
        if (!isAuthenticated) {
          dispatch(validateAuthenticationAction())
            .then(unwrapResult)
            .then((_) => {
              !unmounted && setVerified(true);
            })
            .catch((err) => {
              dispatch(
                errorsActions.newError({
                  errorTitle: "Unauthorized",
                  errorMessage: err.data,
                  errorStatusCode: err.status,
                })
              );
              !unmounted && setVerified(false);
              Router.replace("/auth/login");
            });
        }
        return () => {
          unmounted = true;
        };
      }
      return;
    }, [isAuthenticated, loading]);

    if (verified) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
};

export default ProtectedRoute;
