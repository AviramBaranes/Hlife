import { configureStore } from "@reduxjs/toolkit";

import tokensReducer from "../Slices/tokens";
import usersReducer from "../Slices/auth";
import errorsReducer from "../Slices/errors";
import messagesReducer from "../Slices/messages";

export default configureStore({
  reducer: {
    tokensReducer,
    usersReducer,
    errorsReducer,
    messagesReducer,
  },
});
