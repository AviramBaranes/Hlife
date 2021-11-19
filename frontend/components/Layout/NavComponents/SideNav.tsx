import React, { SetStateAction, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import classes from '../../../styles/components/SideNav.module.scss';
import closeBtn from '../../../public/icons/close.png';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Modal from '../../UI/Modal/Modal';
import Logout from '../../auth/logout/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { validateAuthenticationAction } from '../../../redux/slices/auth/authSlice';
import { RootState } from '../../../redux/store/reduxStore';

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

  function closeNavHandler() {
    setDivClasses((prevState) => `${prevState} ${classes.SideNavClose}`);
    setTimeout(() => {
      setShouldDisplay(false);
    }, 300);
  }

  return (
    <>
      <Backdrop onClose={closeNavHandler} />
      <div className={divClasses}>
        <div className={classes.XBtn} onClick={closeNavHandler}>
          {closeBtn && <Image src={closeBtn} alt='x btn' />}
        </div>
        <ul>
          <li onClick={() => setShouldDisplay(false)}>
            <Link href='/about'>About</Link>
          </li>

          <li onClick={() => setShouldDisplay(false)}>
            <Link href='/settings'>Settings</Link>
          </li>

          {isAuthenticated && (
            <li style={{ cursor: 'pointer' }} onClick={logoutHandler}>
              Log Out
            </li>
          )}

          {!isAuthenticated && (
            <li onClick={() => setShouldDisplay(false)}>
              <Link href='/auth/forgotPassword'>Reset Password</Link>
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
