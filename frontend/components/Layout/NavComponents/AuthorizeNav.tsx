import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import classes from "../../../styles/components/Navigation.module.scss";

function AuthorizedNav() {
  const router = useRouter();
  const { pathname } = router;

  return (
    <ul>
      <li className={pathname === "/" ? classes.Active : classes.NotActive}>
        <Link href="/">
          <h2>Home</h2>
        </Link>
      </li>

      <li
        className={pathname === "/stats" ? classes.Active : classes.NotActive}
      >
        <Link href="/stats">
          <h2>Stats</h2>
        </Link>
      </li>

      <li className={pathname === "/program" ? classes.Active : classes.NotActive}>
        <Link href="/program">
          <h2>Program</h2>
        </Link>
      </li>
    </ul>
  );
}

export default AuthorizedNav;
