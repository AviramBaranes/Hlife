import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axios/axiosInstance";

let loading: any;
let hasProgram: any;

loading = undefined;

const initialState = {
  username: "",
  hasProgram,
  loading,
  error: {},
  isAuthenticated: false,
};

export const sendPasswordResetEmailAction = createAsyncThunk(
  "sendResetEmail/sendPasswordResetEmailAction",

  async (email: string, { rejectWithValue }) => {
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
  async (userFields: object, { rejectWithValue }) => {
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
  async (userFields: object, { rejectWithValue }) => {
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
      const { usersReducer } = getState() as {
        usersReducer: { loading: boolean };
      };
      const { loading } = usersReducer;
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
  extraReducers: (builder) => {
    builder.addCase(signupUserAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signupUserAction.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.username = payload.username;
      state.hasProgram = false;
      state.isAuthenticated = true;
    });
    builder.addCase(signupUserAction.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error;
      state.isAuthenticated = false;
    });
    builder.addCase(loginUserAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUserAction.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.username = payload.username;
      state.hasProgram = payload.hasProgram;
      state.isAuthenticated = true;
    });
    builder.addCase(loginUserAction.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error;
      state.isAuthenticated = false;
    });
    builder.addCase(validateAuthenticationAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      validateAuthenticationAction.fulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.username = payload.username;
        state.isAuthenticated = true;
        state.hasProgram = payload.hasProgram;
      }
    );
    builder.addCase(
      validateAuthenticationAction.rejected,
      (state, { error }) => {
        state.loading = false;
        state.error = error;
        state.isAuthenticated = false;
      }
    );
    builder.addCase(sendPasswordResetEmailAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sendPasswordResetEmailAction.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(
      sendPasswordResetEmailAction.rejected,
      (state, { error }) => {
        state.loading = false;
        state.error = error;
      }
    );
    builder.addCase(logoutAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutAction.fulfilled, (state) => {
      state.username = "";
      state.hasProgram = undefined;
      state.loading = undefined;
      state.error = {};
      state.isAuthenticated = false;
    });
  },
});

export default usersSlice.reducer;

export const usersActions = usersSlice.actions;
