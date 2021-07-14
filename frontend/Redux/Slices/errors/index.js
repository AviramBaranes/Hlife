import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newError: false,
  errorTitle: null,
  errorMessage: null,
  errorStatusCode: null,
};

const errorSlice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    newError(state, { payload }) {
      state.newError = true;
      state.errorTitle = payload.errorTitle;
      state.errorMessage = payload.errorMessage;
      state.errorStatusCode = payload.errorStatusCode || null;
    },
    errorConfirmed(state) {
      state.newError = false;
      state.errorTitle = null;
      state.errorMessage = null;
      state.errorStatusCode = null;
    },
  },
});

export const errorsActions = errorSlice.actions;

export default errorSlice.reducer;
