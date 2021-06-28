import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/Axios/axiosInstance";

const initialState = {
  csrfToken: null,
  error: null,
};

export const getCsrfToken = createAsyncThunk(
  "csrf/getCsrfToken",
  async () => {
    await axios.get("/");

    const csrf = document.cookie.split("XSRF-TOKEN=")[1].substring(0, 36);

    return csrf;
  },
  {
    condition: (_, { getState }) => {
      const csrfToken = getState();
      if (!csrfToken) {
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
  extraReducers: {
    [getCsrfToken.fulfilled](state, { payload }) {
      state.csrfToken = payload;
    },
    [getCsrfToken.rejected](state, { error }) {
      state.error = error;
    },
  },
});

export default tokensSlice.reducer;
