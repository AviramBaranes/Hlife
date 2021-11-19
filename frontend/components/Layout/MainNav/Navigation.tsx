import React, { SetStateAction, useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';

import classes from '../../../styles/components/Navigation.module.scss';
import barsIcon from '../../../public/icons/bars-solid.svg';
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
        {!isAuthenticated && !isAuthenticated && <AuthenticateNav />}
        {hasProgram && isAuthenticated && <AuthorizedNav />}
        <div
          data-testid='burgerLink'
          className={classes.BarsIcon}
          onClick={() => setDisplaySideNav(true)}
        >
          {barsIcon && <Image src={barsIcon} width={100} height={100} />}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
