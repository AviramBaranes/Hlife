import React, { SetStateAction } from 'react';
import { useDispatch } from 'react-redux';

import classes from '../../../styles/components/Logout.module.scss';
import router from 'next/router';
import { unwrapResult } from '@reduxjs/toolkit';
import { CustomError } from '../../../types/CustomErrors';
import { errorsActions } from '../../../redux/slices/errors/errorsSlice';
import { usersActions } from '../../../redux/slices/auth/authSlice';

interface LogoutProps {
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
  setShowNav: React.Dispatch<SetStateAction<boolean>>;
}

const Logout: React.FC<LogoutProps> = ({ setShowModal, setShowNav }) => {
  const dispatch = useDispatch();

  function logoutHandler() {
    router.push('/auth/login');
    try {
      dispatch(usersActions.logout());
      setShowModal(false);
    } catch (err) {
      router.push('/');
      dispatch(
        errorsActions.newError({
          errorTitle: 'Logout failed',
          errorMessage: '',
        })
      );
    }
  }

  return (
    <div className={classes.Logout}>
      <h1>Log Out</h1>
      <p>Are you sure you want to logout?</p>
      <div className={classes.Buttons}>
        <button
          className='danger-button'
          onClick={() => {
            setShowNav(false);
            logoutHandler();
          }}
        >
          Logout
        </button>
        <button onClick={() => setShowModal(false)} className='success-button'>
          Back
        </button>
      </div>
    </div>
  );
};

export default Logout;
