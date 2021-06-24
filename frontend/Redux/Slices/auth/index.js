import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  username: "",
  hasProgram: undefined,
  hasDiet: undefined,
  loading: false,
  error: null,
  isAuthenticate: false,
};

export const signupUserAction = createAsyncThunk(
  "signup/signupUserAction",
  async (userFields, { getState }) => {
    const _csrf = getState().tokensReducer.csrfToken;
    const bodyRequest = {
      _csrf,
      ...userFields,
    };

    const res = await axios.post(
      "http://localhost:8080/auth/signup",
      bodyRequest,
      { withCredentials: true }
    );

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

    const res = await axios.post(
      "http://localhost:8080/auth/login",
      bodyRequest,
      { withCredentials: true }
    );

    return res.data;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    checkAuthentication() {
      const jwtToken = document.cookie;
      console.log(jwtToken);
      state.isAuthenticate = true;
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
    },
    [signupUserAction.rejected](state, { error }) {
      state.loading = false;
      state.error = error;
    },
    [loginUserAction.pending](state) {
      state.loading = true;
    },
    [loginUserAction.fulfilled](state, { payload }) {
      state.loading = false;
      state.username = payload.username;
      state.hasProgram = payload.hasProgram;
      state.hasDiet = payload.hasDiet;
    },
    [loginUserAction.rejected](state, { error }) {
      state.loading = false;
      state.error = error;
    },
  },
});

export default usersSlice;
