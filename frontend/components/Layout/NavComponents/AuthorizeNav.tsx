import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import classes from "../MainNav/Navigation.module.scss";

function AuthorizedNav() {
  const router = useRouter();
  const { pathname } = router;

  return (
    <ul>
      <li className={pathname === "/" ? classes.Active : ""}>
        <Link href="/">
          <h2>Home</h2>
        </Link>
      </li>

      <li className={pathname === "/stats" ? classes.Active : ""}>
        <Link href="/stats">
          <h2>Stats</h2>
        </Link>
      </li>

      <li className={pathname === "/program" ? classes.Active : ""}>
        <Link href="/program">
          <h2>Program</h2>
        </Link>
      </li>
    </ul>
  );
}

export default AuthorizedNav;
