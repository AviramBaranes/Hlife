import { waitFor } from "@testing-library/react";

import store from "../../Redux/store";
import {
  sendPasswordResetEmailAction,
  validateAuthenticationAction,
  usersActions,
  signupUserAction,
  loginUserAction,
} from "../../Redux/Slices/auth";

jest.mock("../../utils/Axios/axiosInstance", () => {
  const get = jest.fn();
  const post = jest.fn();
  get.mockImplementation(async () => {
    const error = new Error();
    error.response = { data: "data", status: "status" };
    throw error;
  });
  post.mockImplementation(async () => {
    const error = new Error();
    error.response = { data: "data", status: "status" };
    throw error;
  });

  return { post, get };
});

describe("Auth slice errors tests", () => {
  test("should not change the state ", async () => {
    store.dispatch(usersActions.changeLoadingState({ loading: "string" }));

    expect(store.getState().usersReducer.loading).toBe(undefined);
  });
  test("should change loading state when sends reset email fails", async () => {
    store.dispatch(sendPasswordResetEmailAction());

    await waitFor(() => {
      expect(store.getState().usersReducer.loading).toBe(true);
    });

    await waitFor(() => {
      expect(store.getState().usersReducer.loading).toBe(false);
      expect(store.getState().usersReducer.error.message).toBe("Rejected");
    });
  });
  test("should change the state when signup fails", async () => {
    store.dispatch(signupUserAction());

    await waitFor(() => {
      expect(store.getState().usersReducer.loading).toBe(true);
    });

    await waitFor(() => {
      expect(store.getState().usersReducer.error.message).toBe("Rejected");
      expect(store.getState().usersReducer.isAuthenticated).toBe(false);
    });
  });
  test("should change the state when login fails", async () => {
    store.dispatch(loginUserAction());

    await waitFor(() => {
      expect(store.getState().usersReducer.loading).toBe(true);
    });

    await waitFor(() => {
      expect(store.getState().usersReducer.error.message).toBe("Rejected");
      expect(store.getState().usersReducer.isAuthenticated).toBe(false);
    });
  });
  test("should change the state when validateAuthenticationAction is fails", async () => {
    store.dispatch(usersActions.changeLoadingState({ loading: undefined }));
    store.dispatch(validateAuthenticationAction());

    await waitFor(() => {
      expect(store.getState().usersReducer.loading).toBe(true);
    });

    await waitFor(() => {
      expect(store.getState().usersReducer.error.message).toBe("Rejected");
      expect(store.getState().usersReducer.isAuthenticated).toBe(false);
    });
  });
});
