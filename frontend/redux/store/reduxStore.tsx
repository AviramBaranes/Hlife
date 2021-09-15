import { configureStore } from "@reduxjs/toolkit";

import tokensReducer from "../slices/tokens";
import usersReducer from "../slices/auth/authSlice";
import errorsReducer from "../slices/errors/errorsSlice";
import messagesReducer from "../slices/messages/messagesSlice";
import goalsReducer from "../slices/goals/goalsSlice";
import statsReducer from "../slices/stats/statsSlice";

const store = configureStore({
  reducer: {
    tokensReducer,
    usersReducer,
    errorsReducer,
    messagesReducer,
    goalsReducer,
    statsReducer,
  },
});
export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
