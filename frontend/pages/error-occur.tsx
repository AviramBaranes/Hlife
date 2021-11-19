import React from 'react';

import classes from '../styles/pages/errorPage.module.scss';

const ErrorOccur: React.FC = () => (
  <div className={classes.ErrorPage}>
    <h3>An Error Occur </h3>
    <p>something went wrong, please try again in a few minutes</p>
  </div>
);

export default ErrorOccur;
