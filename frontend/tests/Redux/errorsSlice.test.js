import { waitFor } from "@testing-library/dom";

import store from "../../Redux/store";
import { errorsActions } from "../../Redux/Slices/errors";

describe("Errors slice tests", () => {
  test("should have the correct initialState", () => {
    const expectedInitialState = {
      newError: false,
      errorTitle: null,
      errorMessage: null,
      errorStatusCode: null,
    };

    const initialState = store.getState().errorsReducer;

    expect(initialState).toStrictEqual(expectedInitialState);
  });
  test("should have the correct state after newError called", () => {
    const expectedState = {
      newError: true,
      errorTitle: "title",
      errorMessage: "my error message",
      errorStatusCode: 300,
    };

    store.dispatch(
      errorsActions.newError({
        errorTitle: "title",
        errorMessage: "my error message",
        errorStatusCode: 300,
      })
    );

    const currentState = store.getState().errorsReducer;

    expect(currentState).toStrictEqual(expectedState);
  });
  test("should set error status code to null", () => {
    const expectedState = {
      newError: true,
      errorTitle: "title",
      errorMessage: "my error message",
      errorStatusCode: null,
    };

    store.dispatch(
      errorsActions.newError({
        errorTitle: "title",
        errorMessage: "my error message",
      })
    );

    const currentState = store.getState().errorsReducer;

    expect(currentState).toStrictEqual(expectedState);
  });
  test("should reset the error state if errorConfirmed is called", async () => {
    const expectedState = {
      newError: false,
      errorTitle: null,
      errorMessage: null,
      errorStatusCode: null,
    };

    store.dispatch(
      errorsActions.newError({
        errorTitle: "title",
        errorMessage: "my error message",
        errorStatusCode: 300,
      })
    );

    store.dispatch(errorsActions.errorConfirmed());

    expect(store.getState().errorsReducer).toStrictEqual(expectedState);
  });
});
