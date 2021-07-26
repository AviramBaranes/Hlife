import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newMessage: false,
  messageTitle: "",
  message: "",
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
      state.messageTitle = "";
      state.message = "";
    },
  },
});

export default messageSlice.reducer;

export const messagesActions = messageSlice.actions;
