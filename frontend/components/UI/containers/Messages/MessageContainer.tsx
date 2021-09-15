import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./MessageContainer.module.scss";
import { messagesActions } from "../../../../redux/slices/messages/messagesSlice";
import { RootState } from "../../../../redux/store/reduxStore";

interface MessageModalProps {
  messageTitle: string;
  message: string;
}

function MessageContainer() {
  const dispatch = useDispatch();
  const { newMessage, messageTitle, message } = useSelector(
    (state: RootState) => state.messagesReducer
  );

  useEffect(() => {
    if (newMessage) {
      setTimeout(() => {
        dispatch(messagesActions.messageConfirmed());
      }, 4000);
    }
  }, [newMessage]);

  let messageModal = (
    <MessageModal messageTitle={messageTitle} message={message} />
  );
  return newMessage ? messageModal : null;
}

export default MessageContainer;

const MessageModal = ({ messageTitle, message }: MessageModalProps) => {
  return (
    <div className={classes.ErrorModal}>
      <h3>{messageTitle}</h3>
      <p>{message}</p>
    </div>
  );
};
