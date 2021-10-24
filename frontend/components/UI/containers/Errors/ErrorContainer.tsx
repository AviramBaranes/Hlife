import React, { MouseEventHandler } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

import { errorsActions } from "../../../../redux/slices/errors/errorsSlice";
import classes from "../../../../styles/components/Containers.module.scss";
import { RootState } from "../../../../redux/store/reduxStore";

interface ErrorModalProps {
  errorTitle: string;
  errorMessage: string;
  closeMessageHandler: MouseEventHandler;
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
    <>
    <div className={classes.Backdrop} onClick={closeMessageHandler}  >
      </div>
    <div className={classes.ErrorContainer}>
      <button
        className={classes.Button}
        onClick={closeMessageHandler}
        >
        <FontAwesomeIcon icon={faTimesCircle} />
      </button>
      <h3>{errorTitle}</h3>
      <p>{errorMessage}</p>
    </div>
    </>
  );
};
