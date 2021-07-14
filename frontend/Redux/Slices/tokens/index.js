import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/Axios/axiosInstance";

const initialState = {
  csrfToken: null,
  error: null,
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
      const { csrfToken } = getState().tokensReducer;

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
