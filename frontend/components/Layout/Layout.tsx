import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { getCsrfToken } from '../../redux/slices/tokens';

import runningPerson from '../../assets/svg/runningPerson-loading.svg';
import Navigation from './MainNav/Navigation';
import classes from '../../styles/components/Layout.module.scss';
import { errorsActions } from '../../redux/slices/errors/errorsSlice';
import { RootState } from '../../redux/store/reduxStore';
import SideNav from './NavComponents/SideNav';
import { settingsSliceActions } from '../../redux/slices/settings/settingsSlice';
import useTheme from '../../utils/customHook/useTheme';

function Layout({ children }: { children: React.ReactNode[] }) {
  const dispatch = useDispatch();
  const [displaySideNav, setDisplaySideNav] = useState(false);
  const [themeIndex, setThemeIndex] = useState(0);

  const { loading } = useSelector((state: RootState) => state.loadingReducer);
  const { error } = useSelector((state: RootState) => state.tokensReducer);
  const { themeClass } = useSelector(
    (state: RootState) => state.settingsReducer
  );

  //#30a954
  //handle app theme
  const theme = [
    {
      'primary-color': 'rgb(0, 211, 0)',
      'text-color': 'white',
      'opposite-text': 'black',
      'secondary-color': 'rgb(1, 110, 6)',
    },
    {
      'primary-color': 'rgb(0, 136, 0)',
      'text-color': 'black',
      'opposite-text': 'white',
      'secondary-color': 'rgb(3, 189, 13)',
    },
  ];

  global.window && useTheme(theme[themeIndex]);

  useEffect(() => {
    dispatch(settingsSliceActions.getTheme());
    let classToRemove: string;
    if (themeClass === 'LightMode') {
      setThemeIndex(1);
      classToRemove = 'DarkMode';
    } else {
      setThemeIndex(0);
      classToRemove = 'LightMode';
    }
    document.body.classList.add(classes[themeClass]);
    document.body.classList.remove(classes[classToRemove]);
  }, [themeClass]);

  //handle csrf token
  useEffect(() => {
    dispatch(getCsrfToken());
  }, []);

  if (error.message) {
    dispatch(
      errorsActions.newError({
        errorTitle: 'Server Error',
        errorMessage: `${error.message}, try to refresh`,
      })
    );
  }

  return (
    <>
      {error.message ? (
        children[0]
      ) : (
        <div className={`${classes.Layout} Dark`}>
          <Navigation setDisplaySideNav={setDisplaySideNav} />
          {displaySideNav && <SideNav setShouldDisplay={setDisplaySideNav} />}
          {loading ? (
            <div className={classes.Loading}>
              <Image src={runningPerson} />
            </div>
          ) : (
            <main>{children}</main>
          )}
        </div>
      )}
    </>
  );
}

export default Layout;
