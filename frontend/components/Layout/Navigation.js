import React from "react";
import Link from "next/link";

function Navigation() {
  return (
    <div>
      <h1>
        <Link href="/">Hlife</Link>
      </h1>
      <ul>
        <li>
          <Link href="/auth/signup">Sign Up</Link>
        </li>
        <li>
          <Link href="/auth/Login">Login</Link>
        </li>
        <li>
          <button>Logout</button>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
