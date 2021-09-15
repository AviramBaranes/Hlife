import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import classes from "./Navigation.module.scss";

function RegistrationsNav() {
  const router = useRouter();
  const { pathname } = router;

  return (
    <ul>
      <li className={pathname === "/auth/login" ? classes.Active : ""}>
        <Link href="/auth/login">
          <h2>Log-In</h2>
        </Link>
      </li>

      <li
        className={
          pathname === "/auth/registration/signup" ? classes.Active : ""
        }
      >
        <Link href="/auth/registration/signup">
          <h2>Sign-Up</h2>
        </Link>
      </li>
    </ul>
  );
}

export default RegistrationsNav;
