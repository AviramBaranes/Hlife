import { unwrapResult } from "@reduxjs/toolkit";
import Router from "next/router";
import { FC, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { validateAuthenticationAction } from "../../redux/slices/auth";
import { errorsActions } from "../../redux/slices/errors";
import { AppDispatch } from "../../redux/store";
import { CustomError } from "../../types/CustomErrors";

const ProtectedRoute = (WrappedComponent: FC) => {
  return (props: object) => {
    // const Router = useRouter();
    const dispatch: AppDispatch = useDispatch();

    const { isAuthenticated, loading } = useSelector(
      (state: RootStateOrAny) => state.usersReducer
    );
    const [verified, setVerified] = useState(false);

    useEffect(() => {
      let unmounted = false;

      if (!loading && !unmounted) {
        setVerified(isAuthenticated);
        if (!isAuthenticated) {
          dispatch(validateAuthenticationAction())
            .then(unwrapResult)
            .then((_: RootStateOrAny) => {
              !unmounted && setVerified(true);
            })
            .catch((err: CustomError) => {
              dispatch(
                errorsActions.newError({
                  errorTitle: "Unauthorized",
                  errorMessage: "You need to Log In",
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
