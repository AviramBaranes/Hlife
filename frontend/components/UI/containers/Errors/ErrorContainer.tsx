import React, { MouseEventHandler } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

import classes from '../../../../styles/components/Containers.module.scss';
import closeIcon from '../../../../public/icons/close.png';
import { errorsActions } from '../../../../redux/slices/errors/errorsSlice';
import { RootState } from '../../../../redux/store/reduxStore';

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

  let errorModal;

  if (typeof errorMessage === 'string' || typeof errorTitle === 'string') {
    errorModal = (
      <ErrorModal
        errorTitle='Something went wrong'
        errorMessage='Please wait a few minutes and try to refresh'
        closeMessageHandler={closeMessageHandler}
      />
    );
  } else {
    errorModal = (
      <ErrorModal
        errorTitle={errorTitle}
        errorMessage={errorMessage}
        closeMessageHandler={closeMessageHandler}
      />
    );
  }
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
      <div className={classes.Backdrop} onClick={closeMessageHandler}></div>
      <div className={classes.ErrorContainer}>
        <button className={classes.Button} onClick={closeMessageHandler}>
          {closeIcon && (
            <Image src={closeIcon} width={20} height={20} alt='close icon' />
          )}
        </button>
        <h3>{errorTitle}</h3>
        <p>{errorMessage}</p>
      </div>
    </>
  );
};
