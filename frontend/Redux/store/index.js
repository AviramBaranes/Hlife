import { configureStore } from "@reduxjs/toolkit";

import tokensReducer from "../Slices/tokens";
import usersReducer from "../Slices/auth";

export default configureStore({
  reducer: {
    tokensReducer,
    usersReducer,
  },
});
