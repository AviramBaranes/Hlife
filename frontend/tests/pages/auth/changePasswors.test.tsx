import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ResetPassword from "../../../pages/auth/reset-password/[...token]";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

jest.mock("../../../utils/Axios/axiosInstance");
jest.mock("next/router");

const middlewares = getDefaultMiddleware();
const mockStore = configureStore(middlewares);

describe("Reset Password page tests", () => {
  test("should dispatch an error action", () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <ResetPassword token={""} withError={"fake error"} />
      </Provider>
    );

    const actions = store.getActions()[0];

    expect(actions.type).toBe("errors/newError");
    expect(actions.payload.errorTitle).toBe("Error");
    expect(actions.payload.errorMessage).toBe("fake error");
    expect(screen.queryByText("Change Password")).not.toBeInTheDocument();
  });

  test("should render the dom", () => {
    const store = mockStore({});
    const { container } = render(
      <Provider store={store}>
        <ResetPassword withError={""} token={"token"} />
      </Provider>
    );

    const cardIndicator = container.children[0];
    const h2Indicator = screen.getByText("Change Password");
    const formIndicator = screen.getAllByRole("textbox");
    const button = screen.getByRole("button");

    expect(cardIndicator.className).toBe("Card");
    expect(h2Indicator).toBeInTheDocument();
    expect(formIndicator.length).toBe(2);
    expect(button).toBeInTheDocument();
  });
  test("should handle validation (first password invalid)", () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <ResetPassword withError={""} token={"token"} />
      </Provider>
    );

    const formIndicator = screen.getAllByRole("textbox");
    const button = screen.getByRole("button");

    userEvent.type(formIndicator[0], "pass");
    userEvent.type(formIndicator[0], "password");

    expect(button).toBeDisabled();
  });
  test("should handle validation (second password invalid)", () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <ResetPassword withError={""} token={"token"} />
      </Provider>
    );

    const formIndicator = screen.getAllByRole("textbox");
    const button = screen.getByRole("button");

    userEvent.type(formIndicator[0], "password");
    userEvent.type(formIndicator[0], "pa   ss");

    expect(button).toBeDisabled();
  });
  test("should handle validation (second password invalid)", () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <ResetPassword withError={""} token={"token"} />
      </Provider>
    );

    const formIndicator = screen.getAllByRole("textbox");
    const button = screen.getByRole("button");

    userEvent.type(formIndicator[0], "password1");
    userEvent.type(formIndicator[1], "password2");
    userEvent.click(button);

    const action = store.getActions()[0];

    expect(action.type).toBe("errors/newError");
    expect(action.payload.errorTitle).toBe("Reset Failed");
    expect(action.payload.errorMessage).toBe("Passwords need to be a match");
  });
  test("should handle form submission failed", async () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <ResetPassword withError={""} token={"token"} />
      </Provider>
    );

    const formIndicator = screen.getAllByRole("textbox");
    const button = screen.getByRole("button");

    userEvent.type(formIndicator[0], "password");
    userEvent.type(formIndicator[1], "password");
    userEvent.click(button);

    const actions = store.getActions();

    await waitFor(() => {
      expect(actions[0].type).toBe("users/changeLoadingState");
      expect(actions[0].payload).toBe(true);
      expect(actions[1].type).toBe("users/changeLoadingState");
      expect(actions[1].payload).toBe(false);
      expect(actions[2].type).toBe("errors/newError");
      expect(actions[2].payload.errorTitle).toBe("Reset Failed");
      expect(actions[2].payload.errorMessage).toBe("error data");
      expect(actions[2].payload.errorStatusCode).toBe("error status code");
    });
  });
  test("should handle form submission succeed", async () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <ResetPassword withError={""} token={"token"} />
      </Provider>
    );

    const formIndicator = screen.getAllByRole("textbox");
    const button = screen.getByRole("button");

    userEvent.type(formIndicator[0], "password");
    userEvent.type(formIndicator[1], "password");
    userEvent.click(button);

    const actions = store.getActions();

    const expectedPayload = {
      messageTitle: "Success!",
      message: "response data",
    };

    await waitFor(() => {
      expect(actions[0].type).toBe("users/changeLoadingState");
      expect(actions[0].payload).toBe(true);
      expect(actions[1].type).toBe("users/changeLoadingState");
      expect(actions[1].payload).toBe(false);
      expect(actions[2].type).toBe("errors/errorConfirmed");
      expect(actions[3].type).toBe("messages/newMessage");
      expect(actions[3].payload).toStrictEqual(expectedPayload); //for objects
      expect((window as any).location.routerPushedValue).toBe("/auth/login");
    });
  });
});
