import React, { SetStateAction, useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import classes from '../../../styles/components/Navigation.module.scss';
import { RootState } from '../../../redux/store/reduxStore';
import AuthorizedNav from '../NavComponents/AuthorizeNav';
import AuthenticateNav from '../NavComponents/AuthenticateNav';
import { validateAuthenticationAction } from '../../../redux/slices/auth/authSlice';

const Navigation: React.FC<{
  setDisplaySideNav: React.Dispatch<SetStateAction<boolean>>;
}> = ({ setDisplaySideNav }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, hasProgram } = useSelector(
    (state: RootState) => state.usersReducer
  );

  useEffect(() => {
    dispatch(validateAuthenticationAction());
  }, []);

  return (
    <>
      <nav className={classes.Navbar}>
        <h1 className={classes.Logo}>
          <Link href='/'>Hlife</Link>
        </h1>
        {!isAuthenticated && <AuthenticateNav />}
        {hasProgram && <AuthorizedNav />}
        {isAuthenticated && !hasProgram && null}
        <div
          data-testid='burgerLink'
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
