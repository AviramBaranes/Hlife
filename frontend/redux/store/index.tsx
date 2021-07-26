import { configureStore } from "@reduxjs/toolkit";

import tokensReducer from "../slices/tokens";
import usersReducer from "../slices/auth";
import errorsReducer from "../slices/errors";
import messagesReducer from "../slices/messages";

const store = configureStore({
  reducer: {
    tokensReducer,
    usersReducer,
    errorsReducer,
    messagesReducer,
  },
});
export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
