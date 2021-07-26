import React, { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalculator,
  faUser,
  faChartBar,
  faCog,
  faSearch,
  faCheckCircle,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

import classes from "./Navigation.module.scss";
import Modal from "../UI/Modal/Modal";
import Logout from "../auth/logout/Logout";
import { RootState } from "../../redux/store";

function Navigation() {
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.usersReducer
  );
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className={classes.Navbar}>
        <nav>
          <div className={classes.Header}>
            <div className={classes.Logo}>
              <h1>
                <Link href="/">Hlife</Link>
              </h1>
              <h5>Reach your goals faster and better</h5>
            </div>

            <FontAwesomeIcon size="3x" icon={faCheckCircle} />
          </div>
          <ul>
            <li>
              <Link href="/profile">
                <div className={classes.Icon}>
                  <FontAwesomeIcon size="3x" icon={faUser} />
                  <h1>Profile</h1>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/activity">
                <div className={classes.Icon}>
                  <FontAwesomeIcon size="3x" icon={faChartBar} />
                  <h1>Activity</h1>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/calculators">
                <div className={classes.Icon}>
                  <FontAwesomeIcon size="3x" icon={faCalculator} />
                  <h1>Calculators</h1>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/settings">
                <div className={classes.Icon}>
                  <FontAwesomeIcon size="3x" icon={faCog} />
                  <h1>Settings</h1>
                </div>
              </Link>
            </li>
            {isAuthenticated && (
              <li>
                <div
                  onClick={() => setShowModal(true)}
                  className={classes.Icon}
                >
                  <FontAwesomeIcon size="3x" icon={faSignOutAlt} />
                  <h1>Log Out</h1>
                </div>
              </li>
            )}
          </ul>
        </nav>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <Logout setShowModal={setShowModal} />
          </Modal>
        )}
      </div>
    </>
  );
}

export default Navigation;
