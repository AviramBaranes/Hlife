import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ResetPassword, {
  getServerSideProps,
} from "../../../pages/auth/reset-password/[...token]";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axios/axiosInstance";
import { AxiosRequestConfig } from "axios";
import Router from "next/router";

jest.mock("../../../utils/Axios/axiosInstance");

const middlewares = getDefaultMiddleware();
const mockStore = configureStore(middlewares);

describe("Reset Password 'getServerSideProps' tests", () => {
  let mockedAxiosInstance: jest.SpyInstance<
    Promise<unknown>,
    [url: string, config?: AxiosRequestConfig | undefined]
  >;

  beforeAll(() => {
    mockedAxiosInstance = jest.spyOn(axiosInstance, "get");
  });

  it("should send a token in props", async () => {
    const ctx = { params: { token: ["token123"] } };

    const result = (await getServerSideProps(ctx as any)) as any;

    expect(mockedAxiosInstance.mock.calls[0][0]).toEqual(
      "/auth/reset/validate-token/token123"
    );
    expect(result.props.token).toEqual("token123");
  });
});

describe("Reset Password page tests", () => {
  let mockedAxiosInstance: jest.SpyInstance<
    Promise<unknown>,
    [url: string, data?: any, config?: AxiosRequestConfig | undefined]
  >;
  let spiedRouter: jest.SpyInstance<any, any>;

  beforeAll(() => {
    mockedAxiosInstance = jest
      .spyOn(axiosInstance, "put")
      .mockImplementationOnce(async () => {
        throw { response: { data: "data", status: 555 } };
      })
      .mockImplementation(async () => {
        return { data: "message" };
      });

    spiedRouter = jest.spyOn(Router, "push");
  });

  test("should render the dom", () => {
    const store = mockStore({});
    const { container } = render(
      <Provider store={store}>
        <ResetPassword token={"token"} />
      </Provider>
    );

    const h5Element = container.children[0].children[1];
    const h1Element = container.children[0].children[0];
    const form = container.children[1].children[0];
    const inputs = screen.getAllByRole("textbox");

    expect(h1Element).toBeInTheDocument();
    expect(h5Element).toBeInTheDocument();
    expect(form).toBeInTheDocument();
    inputs.forEach((input) => expect(input).toBeInTheDocument);
  });
  test("should handle validation (first password invalid)", () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <ResetPassword token={"token"} />
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
        <ResetPassword token={"token"} />
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
        <ResetPassword token={"token"} />
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
        <ResetPassword token={"token"} />
      </Provider>
    );

    const formIndicator = screen.getAllByRole("textbox");
    const button = screen.getByRole("button");

    userEvent.type(formIndicator[0], "password");
    userEvent.type(formIndicator[1], "password");
    userEvent.click(button);

    const actions = store.getActions();

    const expectedPayload = {
      errorTitle: "Reset Failed",
      errorMessage: "data",
      errorStatusCode: 555,
    };

    await waitFor(() => {
      expect(actions[0].type).toBe("users/changeLoadingState");
      expect(actions[0].payload).toBe(true);
      expect(actions[1].type).toBe("users/changeLoadingState");
      expect(actions[1].payload).toBe(false);
      expect(actions[2].type).toBe("errors/newError");
      expect(actions[2].payload).toStrictEqual(expectedPayload);
      expect(mockedAxiosInstance.mock.calls[0][0]).toEqual(
        "/auth/reset/password-reset"
      );
    });
  });
  test("should handle form submission succeed", async () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <ResetPassword token={"token"} />
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
      message: "message",
    };

    await waitFor(() => {
      expect(actions[0].type).toBe("users/changeLoadingState");
      expect(actions[0].payload).toBe(true);
      expect(actions[1].type).toBe("users/changeLoadingState");
      expect(actions[1].payload).toBe(false);
      expect(actions[2].type).toBe("errors/errorConfirmed");
      expect(actions[3].type).toBe("messages/newMessage");
      expect(actions[3].payload).toStrictEqual(expectedPayload); //for objects
      expect(spiedRouter.mock.calls[0][0]).toEqual("/auth/login");
    });
  });
  test("should call axios with the correct payload", async () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <ResetPassword token={"token"} />
      </Provider>
    );

    const formIndicator = screen.getAllByRole("textbox");
    const button = screen.getByRole("button");

    userEvent.type(formIndicator[0], "password");
    userEvent.type(formIndicator[1], "password");
    userEvent.click(button);

    const expectedFields = {
      password: "password",
      passwordConfirmation: "password",
      resetToken: "token",
    };

    await waitFor(() => {
      expect(mockedAxiosInstance.mock.calls[0][0]).toEqual(
        "/auth/reset/password-reset"
      );
      expect(mockedAxiosInstance.mock.calls[0][1]).toStrictEqual(
        expectedFields
      );
    });
  });
});
