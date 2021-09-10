import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/axios/axiosInstance";

const initialState = {
  csrfToken: "",
  error: { message: "" },
};

export const getCsrfToken = createAsyncThunk(
  "csrf/getCsrfToken",
  async (_, { rejectWithValue }) => {
    try {
      await axios.get("/");

      const csrf = document.cookie.split("XSRF-TOKEN=")[1].substring(0, 36);
      return csrf;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const { tokensReducer } = getState() as {
        tokensReducer: { csrfToken: string };
      };
      const { csrfToken } = tokensReducer;

      if (csrfToken) {
        return false;
      }
    },
    dispatchConditionRejection: true,
  }
);

const tokensSlice = createSlice({
  name: "token",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(getCsrfToken.fulfilled, (state, { payload }) => {
      state.csrfToken = payload;
    });
    build.addCase(getCsrfToken.rejected, (state, { error }) => {
      (state.error.message as any) = error.message;
    });
  },
});
export default tokensSlice.reducer;
