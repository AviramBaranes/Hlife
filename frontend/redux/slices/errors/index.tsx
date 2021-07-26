import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newError: false,
  errorTitle: "",
  errorMessage: "",
  errorStatusCode: "",
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
      state.errorTitle = "";
      state.errorMessage = "";
      state.errorStatusCode = "";
    },
  },
});

export const errorsActions = errorSlice.actions;

export default errorSlice.reducer;
