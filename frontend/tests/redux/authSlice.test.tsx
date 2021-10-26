import { waitFor } from "@testing-library/react";

import store from "../../redux/store/reduxStore";
import {
  validateAuthenticationAction,
  logoutAction,
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
      hasProgram: null,
      isAuthenticated: null,
    };
    expect(initialState).toStrictEqual(expectedInitialState);
  });
  test("should change the state when validateAuthenticationAction is called", async () => {
    store.dispatch(validateAuthenticationAction());

    const expectedState = {
      hasProgram: false,
      isAuthenticated: true,
    };

    await waitFor(() => {
      expect(store.getState().usersReducer).toStrictEqual(expectedState);
    });
  });
  test("should change the state when logout", async () => {
    store.dispatch(logoutAction());

    const expectedState = {
      hasProgram: null,
      isAuthenticated: false,
    };

    await waitFor(() => {
      expect(store.getState().usersReducer).toStrictEqual(expectedState);
    });
  });
});
