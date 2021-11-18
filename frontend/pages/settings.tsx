import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GetServerSideProps } from 'next';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';

import ChangePassword from '../components/auth/forms/changePassword';
import { settingsSliceActions } from '../redux/slices/settings/settingsSlice';
import { RootState } from '../redux/store/reduxStore';

import classes from '../styles/pages/settings.module.scss';
import protectRouteHandler from '../utils/protectedRoutes/protectedRoutes';

const Settings: React.FC<{ isAuthenticated: boolean }> = ({
  isAuthenticated,
}) => {
  const dispatch = useDispatch();
  const [shouldDisplayForm, setShouldDisplayForm] = useState(false);
  const [arrowDirection, setArrowDirection] = useState<'down' | 'up'>('down');

  const formRef = useRef() as any;
  const inputRef = useRef() as any;

  const { themeClass } = useSelector(
    (state: RootState) => state.settingsReducer
  );

  const [inputTouched, setInputTouched] = useState(false);

  useEffect(() => {
    !inputTouched && dispatch(settingsSliceActions.getTheme());
    if (themeClass === 'LightMode') {
      inputRef.current.checked = true;
    }
  }, [themeClass]);

  function themeHandler() {
    setInputTouched(true);
    dispatch(settingsSliceActions.changeTheme());
  }

  return (
    <section className={classes.Main}>
      <Head>
        <title>Settings</title>
      </Head>
      <h3>Settings</h3>
      <div className={classes.ModeSection}>
        <h4>Light Mode</h4>
        <input
          role='checkbox'
          ref={inputRef as any}
          onClick={themeHandler}
          type='checkbox'
          id='switch'
          className='Checkbox'
        />
        <label htmlFor='switch' className='SwitchLabel'></label>
      </div>

      {isAuthenticated && (
        <div
          style={{
            borderBottom: `${
              arrowDirection === 'up' ? 'none' : 'var(--text-color) 1px solid'
            }`,
          }}
          className={classes.PasswordSection}
        >
          <div className={classes.Title}>
            <h4>Reset Password</h4>
            {arrowDirection === 'down' && (
              <FontAwesomeIcon
                icon={faAngleDown}
                size='2x'
                onClick={() => {
                  setShouldDisplayForm(true);
                  setArrowDirection('up');
                }}
              />
            )}
            {arrowDirection === 'up' && (
              <FontAwesomeIcon
                size='2x'
                icon={faAngleUp}
                onClick={() => {
                  formRef.current.className = classes.FormClosing;
                  setTimeout(() => {
                    setShouldDisplayForm(false);
                  }, 480);
                  setArrowDirection('down');
                }}
              />
            )}
          </div>
          {shouldDisplayForm && (
            <div ref={formRef} className={classes.Form}>
              <ChangePassword />
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Settings;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const isAuthenticated =
    (await (await protectRouteHandler(ctx)).destination) !== '/auth/login'; //if the user is not authenticated the destination will be '/auth/login'

  return { props: { isAuthenticated } };
};
