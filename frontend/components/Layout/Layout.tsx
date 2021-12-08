import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';

import Navigation from './MainNav/Navigation';
import classes from '../../styles/components/Layout.module.scss';
import { errorsActions } from '../../redux/slices/errors/errorsSlice';
import { RootState } from '../../redux/store/reduxStore';
import SideNav from './NavComponents/SideNav';
import { settingsSliceActions } from '../../redux/slices/settings/settingsSlice';
import useTheme from '../../utils/customHook/useTheme';
import Loading from '../UI/Animations/Loading';
import axiosInstance from '../../utils/axios/axiosInstance';
import { loadingAction } from '../../redux/slices/loading/loadingSlice';

function Layout({ children }: { children: React.ReactNode[] }) {
  const dispatch = useDispatch();
  const [displaySideNav, setDisplaySideNav] = useState(false);
  const [themeIndex, setThemeIndex] = useState(0);
  const [error, setError] = useState<Error | null>(null);

  const { loading } = useSelector((state: RootState) => state.loadingReducer);
  const { themeClass } = useSelector(
    (state: RootState) => state.settingsReducer
  );

  const theme = [
    {
      'primary-color': '#30a954',
      'text-color': 'white',
      'opposite-text': 'black',
      filter:
        'invert(50%) sepia(93%) saturate(347%) hue-rotate(86deg) brightness(90%) contrast(88%)',
      'filter-to-white':
        'invert(100%) sepia(1%) saturate(1283%) hue-rotate(201deg) brightness(117%) contrast(100%)',
    },
    {
      'primary-color': 'rgb(3, 189, 13)',
      'text-color': 'black',
      'opposite-text': 'white',
      filter:
        'invert(46%) sepia(59%) saturate(1545%) hue-rotate(87deg) brightness(96%) contrast(103%)',
      'filter-to-white': 'none',
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
    dispatch(loadingAction.setToTrue());
    const getCsrf = async () => {
      await axiosInstance.get('/');
    };
    getCsrf()
      .then(() => {
        dispatch(loadingAction.setToFalse());
      })
      .catch((err) => {
        dispatch(loadingAction.setToFalse());
        setError(err);
      });
  }, []);

  if (error) {
    dispatch(
      errorsActions.newError({
        errorTitle: 'Server Error',
        errorMessage: `${error.message}, try to refresh`,
      })
    );
  }
  return (
    <>
      <Head>
        <title>Hlife</title>
        <link rel='icon' href='/H.svg' />
      </Head>
      {error ? (
        children[0]
      ) : (
        <div className={`${classes.Layout} Dark`}>
          <Navigation setDisplaySideNav={setDisplaySideNav} />
          {displaySideNav && <SideNav setShouldDisplay={setDisplaySideNav} />}
          {loading && <Loading />}
          <main>{children}</main>
        </div>
      )}
    </>
  );
}

export default Layout;
