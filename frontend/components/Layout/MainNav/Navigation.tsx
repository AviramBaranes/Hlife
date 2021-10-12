import React, { SetStateAction, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import classes from "./Navigation.module.scss";
import { RootState } from "../../../redux/store/reduxStore";
import AuthorizedNav from "../NavComponents/AuthorizeNav";
import RegistrationsNav from "../NavComponents/RegistrationsNav";

const Navigation: React.FC<{
  setDisplaySideNav: React.Dispatch<SetStateAction<boolean>>;
}> = ({ setDisplaySideNav }) => {
  const { isAuthenticated, hasProgram } = useSelector(
    (state: RootState) => state.usersReducer
  );
  const isRegister = isAuthenticated && hasProgram;

  return (
    <>
      <nav className={classes.Navbar}>
        <h1 className={classes.Logo}>
          <Link href="/">Hlife</Link>
        </h1>
        {isRegister ? <AuthorizedNav /> : <RegistrationsNav />}
        <div
          className={classes.BarsIcon}
          onClick={() => setDisplaySideNav(true)}
        >
          <FontAwesomeIcon icon={faBars} />
        </div>
      </nav>
    </>
  );
};

export default Navigation;
