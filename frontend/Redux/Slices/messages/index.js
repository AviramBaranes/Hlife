import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newMessage: false,
  messageTitle: null,
  message: null,
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    newMessage(state, { payload }) {
      state.newMessage = true;
      state.messageTitle = payload.messageTitle;
      state.message = payload.message;
    },
    messageConfirmed(state) {
      state.newMessage = false;
      state.messageTitle = null;
      state.message = null;
    },
  },
});

export default messageSlice.reducer;

export const messagesActions = messageSlice.actions;
