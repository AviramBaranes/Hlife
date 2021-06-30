import { unwrapResult } from "@reduxjs/toolkit";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateAuthentication } from "../../Redux/Slices/auth";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const Router = useRouter();
    const dispatch = useDispatch();

    const [verified, setVerified] = useState(false);

    const { isAuthenitcated } = useSelector((state) => state.usersReducer);

    useEffect(() => {
      if (isAuthenitcated === undefined) {
        dispatch(validateAuthentication())
          .then(unwrapResult)
          .then((_) => {
            setVerified(true);
          })
          .catch((err) => {
            setVerified(false);
            Router.replace("/auth/login");
          });
      } else if (isAuthenitcated === false) {
        setVerified(false);
        Router.replace("/auth/login");
      }
    }, [isAuthenitcated]);

    if (verified) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
};

export default withAuth;
