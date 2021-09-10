import React, { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import classes from "./Navigation.module.scss";
import { RootState } from "../../redux/store";
import AuthorizedNav from "./AuthorizeNav";
import RegistrationsNav from "./RegistrationsNav";

function Navigation() {
  const { isAuthenticated, hasProgram } = useSelector(
    (state: RootState) => state.usersReducer
  );
  //   const [showModal, setShowModal] = useState(false);

  const isRegister = isAuthenticated && hasProgram;

  return (
    <>
      <nav className={classes.Navbar}>
        <h1 className={classes.Logo}>
          <Link href="/">Hlife</Link>
        </h1>
        {isRegister ? <AuthorizedNav /> : <RegistrationsNav />}
        <div className={classes.BarsIcon}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </nav>
    </>
  );
}

export default Navigation;
