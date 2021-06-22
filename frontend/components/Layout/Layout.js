import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCsrfToken } from "../../Redux/Slices/tokens";
import Navigation from "./Navigation";

function Layout({ children }) {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.tokensReducer);

  useEffect(() => {
    dispatch(getCsrfToken());
  }, [dispatch]);

  return (
    <>
      {error ? (
        alert("Error: try to refresh")
      ) : (
        <>
          <Navigation />
          <main>{children}</main>
        </>
      )}
    </>
  );
}

export default Layout;
