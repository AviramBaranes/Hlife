import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from '../../../../styles/components/Containers.module.scss';
import { messagesActions } from '../../../../redux/slices/messages/messagesSlice';
import { RootState } from '../../../../redux/store/reduxStore';

interface MessageModalProps {
  messageTitle: string;
  message: string;
  closeMessage: React.MouseEventHandler;
}

function MessageContainer() {
  const dispatch = useDispatch();
  const { newMessage, messageTitle, message } = useSelector(
    (state: RootState) => state.messagesReducer
  );

  function closeMessage() {
    dispatch(messagesActions.messageConfirmed());
  }

  useEffect(() => {
    if (newMessage) {
      setTimeout(() => {
        closeMessage();
      }, 4000);
    }
  }, [newMessage]);

  let messageModal = (
    <MessageModal
      messageTitle={messageTitle}
      message={message}
      closeMessage={closeMessage}
    />
  );
  return newMessage ? messageModal : null;
}

export default MessageContainer;

const MessageModal = ({
  messageTitle,
  message,
  closeMessage,
}: MessageModalProps) => {
  return (
    <>
      <div className={classes.Backdrop} onClick={closeMessage}></div>
      <div className={classes.MessageContainer}>
        <h3>{messageTitle}</h3>
        <p>{message}</p>
      </div>
    </>
  );
};
