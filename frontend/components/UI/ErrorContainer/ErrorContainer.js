import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

import { errorsActions } from "../../../Redux/Slices/errors";
import classes from "./ErrorContainer.module.scss";

function ErrorContainer() {
  const dispatch = useDispatch();
  const { newError, errorTitle, errorMessage } = useSelector(
    (state) => state.errorsReducer
  );

  const closeMessageHandler = () => {
    dispatch(errorsActions.errorConfirmed());
  };

  let errorModal = (
    <ErrorModal
      errorTitle={errorTitle}
      errorMessage={errorMessage}
      closeMessageHandler={closeMessageHandler}
    />
  );
  return newError ? errorModal : null;
}

export default ErrorContainer;

const ErrorModal = ({ errorTitle, errorMessage, closeMessageHandler }) => {
  return (
    <div className={classes.ErrorModal}>
      <button className={classes.Button} onClick={closeMessageHandler}>
        <FontAwesomeIcon icon={faTimesCircle} />
      </button>
      <h3>{errorTitle}</h3>
      <p>{errorMessage}</p>
    </div>
  );
};
