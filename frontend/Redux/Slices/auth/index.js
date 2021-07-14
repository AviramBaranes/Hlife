import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/Axios/axiosInstance";

const initialState = {
  username: "",
  hasProgram: undefined,
  hasDiet: undefined,
  loading: undefined,
  error: null,
  isAuthenticated: false,
};

export const sendPasswordResetEmailAction = createAsyncThunk(
  "sendResetEmail/sendPasswordResetEmailAction",

  async (email, { rejectWithValue }) => {
    try {
      const bodyRequest = { email };
      const res = await axiosInstance.post(
        "/auth/password/send-token",
        bodyRequest
      );
      return res.data;
    } catch (err) {
      const { data, status } = err.response;
      const customError = { data, status };
      return rejectWithValue(customError);
    }
  }
);

export const signupUserAction = createAsyncThunk(
  "signup/signupUserAction",
  async (userFields, { rejectWithValue }) => {
    const bodyRequest = {
      ...userFields,
    };

    try {
      const res = await axiosInstance.post("/auth/signup", bodyRequest);

      return res.data;
    } catch (err) {
      const { data, status } = err.response;
      const customError = { data, status };
      return rejectWithValue(customError);
    }
  }
);

export const loginUserAction = createAsyncThunk(
  "login/loginUserAction",
  async (userFields, { rejectWithValue }) => {
    const bodyRequest = {
      ...userFields,
    };
    try {
      const res = await axiosInstance.post("/auth/login", bodyRequest);

      return res.data;
    } catch (err) {
      const { data, status } = err.response;
      const customError = { data, status };
      return rejectWithValue(customError);
    }
  }
);

export const validateAuthenticationAction = createAsyncThunk(
  "authentication/validateAuthenticationAction",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/auth/isUser");
      return res.data;
    } catch (err) {
      const { data, status } = err.response;
      const customError = { data, status };
      return rejectWithValue(customError);
    }
  },
  {
    condition(_, { getState }) {
      const { loading } = getState().usersReducer;
      if (loading === false || loading === true) {
        return false;
      }
    },
  }
);

export const logoutAction = createAsyncThunk(
  "logout/logoutAction",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (err) {
      const { data, status } = err.response;
      const customError = { data, status };
      return rejectWithValue(customError);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    changeLoadingState(state, { payload }) {
      const { loading } = payload;
      if (loading === false || loading === true || loading === undefined) {
        state.loading = loading;
      }
    },
  },
  extraReducers: {
    [signupUserAction.pending](state) {
      state.loading = true;
    },
    [signupUserAction.fulfilled](state, { payload }) {
      state.loading = false;
      state.username = payload.username;
      state.hasProgram = false;
      state.hasDiet = false;
      state.isAuthenticated = true;
    },
    [signupUserAction.rejected](state, { error }) {
      state.loading = false;
      state.error = error;
      state.isAuthenticated = false;
    },
    [loginUserAction.pending](state) {
      state.loading = true;
    },
    [loginUserAction.fulfilled](state, { payload }) {
      state.loading = false;
      state.username = payload.username;
      state.hasProgram = payload.hasProgram;
      state.hasDiet = payload.hasDiet;
      state.isAuthenticated = true;
    },
    [loginUserAction.rejected](state, { error }) {
      state.loading = false;
      state.error = error;
      state.isAuthenticated = false;
    },
    [validateAuthenticationAction.pending](state) {
      state.loading = true;
    },
    [validateAuthenticationAction.fulfilled](state, { payload }) {
      state.loading = false;
      state.username = payload.username;
      state.isAuthenticated = true;
      state.hasProgram = payload.hasProgram;
      state.hasDiet = payload.hasDiet;
    },
    [validateAuthenticationAction.rejected](state, { error }) {
      state.loading = false;
      state.error = error;
      state.isAuthenticated = false;
    },
    [sendPasswordResetEmailAction.pending](state) {
      state.loading = true;
    },
    [sendPasswordResetEmailAction.fulfilled](state) {
      state.loading = false;
    },
    [sendPasswordResetEmailAction.rejected](state, { error }) {
      state.loading = false;
      state.error = error;
    },
    [logoutAction.fulfilled](state) {
      state.username = "";
      state.hasProgram = undefined;
      state.hasDiet = undefined;
      state.loading = undefined;
      state.error = null;
      state.isAuthenticated = false;
    },
    [logoutAction.pending](state) {
      state.loading = true;
    },
  },
});

export default usersSlice.reducer;

export const usersActions = usersSlice.actions;
