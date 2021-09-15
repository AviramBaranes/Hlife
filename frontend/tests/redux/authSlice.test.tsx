import { waitFor } from "@testing-library/react";

import store from "../../redux/store/reduxStore";
import {
  sendPasswordResetEmailAction,
  validateAuthenticationAction,
  usersActions,
  signupUserAction,
  logoutAction,
  loginUserAction,
} from "../../redux/slices/auth/authSlice";

jest.mock("../../utils/axios/axiosInstance", () => {
  const get = jest.fn();
  const post = jest.fn();
  get.mockImplementationOnce(async () => {
    return { data: { hasProgram: false, username: "avi1234" } };
  });
  post
    .mockImplementationOnce(async (url, payload) => {
      return { payload: null };
    })
    .mockImplementationOnce(async (url, payload) => {
      return { data: { username: payload.username } };
    })
    .mockImplementationOnce(async (url, payload) => {
      const { hasProgram, username } = payload;
      return { data: { hasProgram, username } };
    })
    .mockImplementationOnce(async (url, payload) => {
      return;
    });

  return { post, get };
});

describe("Auth slice tests", () => {
  test("should have the right initialState", () => {
    const initialState = store.getState().usersReducer;
    const expectedInitialState = {
      username: "",
      hasProgram: undefined,
      loading: undefined,
      error: {},
      isAuthenticated: false,
    };
    expect(initialState).toStrictEqual(expectedInitialState);
  });
  test("should change loading state when sends reset email", async () => {
    store.dispatch(sendPasswordResetEmailAction("email"));

    await waitFor(() => {
      expect(store.getState().usersReducer.loading).toBe(true);
    });

    await waitFor(() => {
      expect(store.getState().usersReducer.loading).toBe(false);
    });
  });
  test("should change the state when signup", async () => {
    store.dispatch(signupUserAction({ username: "username" }));

    const expectedState = {
      username: "username",
      hasProgram: false,
      loading: false,
      error: {},
      isAuthenticated: true,
    };

    await waitFor(() => {
      expect(store.getState().usersReducer.loading).toBe(true);
    });

    await waitFor(() => {
      expect(store.getState().usersReducer).toStrictEqual(expectedState);
    });
  });
  test("should change the state when login", async () => {
    store.dispatch(loginUserAction({ username: "avi123", hasProgram: true }));

    const expectedState = {
      username: "avi123",
      hasProgram: true,
      loading: false,
      error: {},
      isAuthenticated: true,
    };

    await waitFor(() => {
      expect(store.getState().usersReducer.loading).toBe(true);
    });

    await waitFor(() => {
      expect(store.getState().usersReducer).toStrictEqual(expectedState);
    });
  });
  test("should change the state when validateAuthenticationAction is called", async () => {
    store.dispatch(usersActions.changeLoadingState({ loading: undefined }));
    store.dispatch(validateAuthenticationAction());

    const expectedState = {
      username: "avi1234",
      hasProgram: false,
      loading: false,
      error: {},
      isAuthenticated: true,
    };

    await waitFor(() => {
      expect(store.getState().usersReducer.loading).toBe(true);
    });

    await waitFor(() => {
      expect(store.getState().usersReducer).toStrictEqual(expectedState);
    });
  });
  test("should change the state when logout", async () => {
    store.dispatch(logoutAction());

    const expectedState = {
      username: "",
      hasProgram: undefined,
      loading: undefined,
      error: {},
      isAuthenticated: false,
    };

    await waitFor(() => {
      expect(store.getState().usersReducer.loading).toBe(true);
    });

    await waitFor(() => {
      expect(store.getState().usersReducer).toStrictEqual(expectedState);
    });
  });
  test("should change the state when changeLoadingState is called", async () => {
    store.dispatch(usersActions.changeLoadingState({ loading: false }));

    expect(store.getState().usersReducer.loading).toBe(false);

    store.dispatch(usersActions.changeLoadingState({ loading: true }));

    expect(store.getState().usersReducer.loading).toBe(true);
  });
});
