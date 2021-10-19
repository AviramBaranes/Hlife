import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axios/axiosInstance";

interface AuthSliceState {
  hasProgram: null | boolean;
  isAuthenticated: null | boolean;
}

const initialState: AuthSliceState = {
  hasProgram: null,
  isAuthenticated: null,
};

export const validateAuthenticationAction = createAsyncThunk(
  "authentication/validateAuthenticationAction",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/auth/isUser");
      return res.data;
    } catch (err: any) {
      const { data, status } = err.response;
      const customError = { data, status };
      return rejectWithValue(customError);
    }
  }
);

export const logoutAction = createAsyncThunk(
  "logout/logoutAction",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (err: any) {
      const { data, status } = err.response;
      const customError = { data, status };
      return rejectWithValue(customError);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      validateAuthenticationAction.fulfilled,
      (state, { payload }) => {
        state.isAuthenticated = true;
        state.hasProgram = payload.hasProgram;
      }
    );
    builder.addCase(validateAuthenticationAction.rejected, (state) => {
      state.isAuthenticated = false;
    });
    builder.addCase(logoutAction.fulfilled, (state) => {
      state.hasProgram = null;
      state.isAuthenticated = false;
    });
  },
});

export default usersSlice.reducer;

export const usersActions = usersSlice.actions;
