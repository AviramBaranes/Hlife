import React, { MouseEventHandler } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

import { errorsActions } from "../../../../redux/slices/errors/errorsSlice";
import classes from "./ErrorContainer.module.scss";
import { RootState } from "../../../../redux/store/reduxStore";

interface ErrorModalProps {
  errorTitle: string;
  errorMessage: string;
  closeMessageHandler: Function;
}

const ErrorContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { newError, errorTitle, errorMessage } = useSelector(
    (state: RootState) => state.errorsReducer
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
};

export default ErrorContainer;

const ErrorModal: React.FC<ErrorModalProps> = ({
  errorTitle,
  errorMessage,
  closeMessageHandler,
}) => {
  return (
    <div className={classes.ErrorModal}>
      <button
        className={classes.Button}
        onClick={closeMessageHandler as MouseEventHandler<HTMLButtonElement>}
      >
        <FontAwesomeIcon icon={faTimesCircle} />
      </button>
      <h3>{errorTitle}</h3>
      <p>{errorMessage}</p>
    </div>
  );
};
