import { faSadCry, faSadTear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Head from 'next/head';
import React from 'react';

import classes from '../styles/pages/errorPage.module.scss';

const ErrorOccur: React.FC = () => (
  <div className={classes.ErrorPage}>
    <h3>
      An Error Occur <FontAwesomeIcon icon={faSadTear} />{' '}
    </h3>
    <p>something went wrong, please try again in a few minutes</p>
  </div>
);

export default ErrorOccur;
