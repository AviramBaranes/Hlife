import React, { SetStateAction, useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import classes from "../../../styles/components/SideNav.module.scss";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Modal from "../../UI/Modal/Modal";
import Logout from "../../auth/logout/Logout";
import { useDispatch, useSelector } from "react-redux";
import { validateAuthenticationAction } from "../../../redux/slices/auth/authSlice";
import { RootState } from "../../../redux/store/reduxStore";

const SideNav: React.FC<{
  setShouldDisplay: React.Dispatch<SetStateAction<boolean>>;
}> = ({ setShouldDisplay }) => {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector(
    (state: RootState) => state.usersReducer
  );
  const [divClasses, setDivClasses] = useState(classes.SideNav);
  useEffect(() => {
    dispatch(validateAuthenticationAction());

    return () => {};
  }, []);

  const [showModal, setShowModal] = useState(false);

  function logoutHandler() {
    setShowModal(true);
  }

  return (
    <>
      <Backdrop
        onClose={() => {
          setDivClasses((prevState) => `${prevState} ${classes.SideNavClose}`);
          setTimeout(() => {
            setShouldDisplay(false);
          }, 300);
        }}
      />
      <div className={divClasses}>
        <div className={classes.XBtn} onClick={() => setShouldDisplay(false)}>
          <FontAwesomeIcon icon={faTimesCircle} />
        </div>
        <ul>
          <li onClick={() => setShouldDisplay(false)}>
            <Link href="/About">About</Link>
          </li>

          <li onClick={() => setShouldDisplay(false)}>
            <Link href="/settings">Settings</Link>
          </li>

          {isAuthenticated && (
            <li style={{ cursor: "pointer" }} onClick={logoutHandler}>
              Log Out
            </li>
          )}

          {!isAuthenticated && (
            <li onClick={() => setShouldDisplay(false)}>
              <Link href="/auth/forgotPassword">Reset Password</Link>
            </li>
          )}
        </ul>

        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <Logout setShowNav={setShouldDisplay} setShowModal={setShowModal} />
          </Modal>
        )}
      </div>
    </>
  );
};

export default SideNav;
