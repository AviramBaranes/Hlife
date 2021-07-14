import { waitFor } from "@testing-library/react";

import store from "../../Redux/store";
import { getCsrfToken } from "../../Redux/Slices/tokens";

jest.mock("../../utils/Axios/axiosInstance", () => {
  const get = jest.fn();

  get.mockImplementationOnce(async () => {
    throw new Error();
  });
  return { get };
});

describe("tokens test", () => {
  test("should have the correct initialState", () => {
    const expectedInitialState = { csrfToken: null, error: null };

    const initialState = store.getState().tokensReducer;

    expect(initialState).toStrictEqual(expectedInitialState);
  });
  test("should have error in state", async () => {
    store.dispatch(getCsrfToken());

    await waitFor(() => {
      expect(store.getState().tokensReducer.error.message).toBe("Rejected");
    });
  });
});
