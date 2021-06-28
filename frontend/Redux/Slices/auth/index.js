import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/Axios/axiosInstance";

const initialState = {
  username: "",
  hasProgram: undefined,
  hasDiet: undefined,
  loading: false,
  error: null,
  isAuthenticated: undefined,
};

export const signupUserAction = createAsyncThunk(
  "signup/signupUserAction",
  async (userFields, { getState }) => {
    const _csrf = getState().tokensReducer.csrfToken;
    const bodyRequest = {
      _csrf,
      ...userFields,
    };

    const res = await axios.post("/auth/signup", bodyRequest);

    return res.data;
  }
);

export const loginUserAction = createAsyncThunk(
  "login/loginUserAction",
  async (userFields, { getState }) => {
    const _csrf = getState().tokensReducer.csrfToken;
    const bodyRequest = {
      _csrf,
      ...userFields,
    };

    const res = await axios.post("/auth/login", bodyRequest);

    return res.data;
  }
);

export const validateAuthentication = createAsyncThunk(
  "authentication/validateAuthentication",
  async (_, { getState }) => {
    const _csrf = getState().tokensReducer.csrfToken;
    const bodyRequest = { _csrf };

    const res = await axios.get("/auth/isUser", bodyRequest);

    return res.data;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
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
    [validateAuthentication.pending](state) {
      state.loading = true;
    },
    [validateAuthentication.fulfilled](state, { payload }) {
      state.loading = false;
      state.username = payload.username;
      state.isAuthenticated = true;
      state.hasProgram = payload.hasProgram;
      state.hasDiet = payload.hasProgram;
    },
    [validateAuthentication.rejected](state, { error }) {
      state.loading = false;
      state.error = error;
      state.isAuthenticated = false;
    },
  },
});

export default usersSlice.reducer;
