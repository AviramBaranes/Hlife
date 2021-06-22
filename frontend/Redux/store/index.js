import { configureStore } from "@reduxjs/toolkit";

import tokensReducer from "../Slices/tokens";

export default configureStore({
  reducer: {
    tokensReducer,
  },
});
