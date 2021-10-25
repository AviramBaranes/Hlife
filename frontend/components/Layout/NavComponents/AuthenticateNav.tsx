import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import classes from "../../../styles/components/Navigation.module.scss";

function AuthenticateNav() {
  const router = useRouter();
  const { pathname } = router;

  return (
    <ul>
      <li
        className={
          pathname === "/auth/login" ? classes.Active : classes.NotActive
        }
      >
        <Link href="/auth/login">
          <h2>Log-In</h2>
        </Link>
      </li>

      <li
        className={
          pathname === "/auth/registration/signup"
            ? classes.Active
            : classes.NotActive
        }
      >
        <Link href="/auth/registration/signup">
          <h2>Sign-Up</h2>
        </Link>
      </li>
    </ul>
  );
}

export default AuthenticateNav;
