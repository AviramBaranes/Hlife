import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./MessageContainer.module.scss";
import { messagesActions } from "../../../Redux/Slices/messages";

function MessageContainer() {
  const dispatch = useDispatch();
  const { newMessage, messageTitle, message } = useSelector(
    (state) => state.messagesReducer
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

const MessageModal = ({ messageTitle, message, closeMessageHandler }) => {
  return (
    <div className={classes.ErrorModal}>
      <h3>{messageTitle}</h3>
      <p>{message}</p>
    </div>
  );
};
