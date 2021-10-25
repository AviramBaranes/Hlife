import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ResetPassword, {
  getServerSideProps,
} from "../../../pages/auth/reset-password/[...token]";
import { Provider } from "react-redux";
import axiosInstance from "../../../utils/axios/axiosInstance";
import Router from "next/router";
import store from "../../../redux/store/reduxStore";

describe("Reset Password 'getServerSideProps' tests", () => {
  let mockedAxiosInstance: jest.SpyInstance;

  beforeAll(() => {
    mockedAxiosInstance = jest
      .spyOn(axiosInstance, "get")
      .mockImplementation(async () => "");
  });

  test("should send a token in props", async () => {
    const ctx = { params: { token: ["token123"] } };

    const result = (await getServerSideProps(ctx as any)) as any;

    expect(mockedAxiosInstance.mock.calls[0][0]).toEqual(
      "/auth/reset/validate-token/token123"
    );
    expect(result.props.token).toEqual("token123");
  });
});

describe("Reset Password page tests", () => {
  let mockedAxiosInstance: jest.SpyInstance;
  let spiedRouter: jest.SpyInstance;

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
    const { container } = render(
      <Provider store={store}>
        <ResetPassword token={"token"} />
      </Provider>
    );

    const h5Element = container.children[0].children[1];
    const h1Element = container.children[0].children[0];
    const form = container.children[1].children[0];
    const input_1 = screen.getByLabelText("Password");
    const input_2 = screen.getByLabelText("Confirm");

    expect(h1Element).toBeInTheDocument();
    expect(h5Element).toBeInTheDocument();
    expect(form).toBeInTheDocument();
    expect(input_1).toBeInTheDocument();
    expect(input_2).toBeInTheDocument();
  });

  test("should handle validation (first password invalid)", () => {
    render(
      <Provider store={store}>
        <ResetPassword token={"token"} />
      </Provider>
    );

    const button = screen.getByRole("button");

    userEvent.type(screen.getByLabelText("Password"), "pass");
    userEvent.type(screen.getByLabelText("Confirm"), "password");

    expect(button).toBeDisabled();
  });
  test("should handle validation (second password invalid)", () => {
    render(
      <Provider store={store}>
        <ResetPassword token={"token"} />
      </Provider>
    );

    const button = screen.getByRole("button");

    userEvent.type(screen.getByLabelText("Password"), "password");
    userEvent.type(screen.getByLabelText("Confirm"), "pass");

    expect(button).toBeDisabled();
  });

  test('should open error div if button is disabled',()=>{
    render(
      <Provider store={store}>
        <ResetPassword token='token' />
      </Provider>
    );

    const buttonElement = screen.getByRole("button");

    userEvent.hover(buttonElement.parentElement as Element)

    expect(buttonElement).toBeDisabled();
    expect(screen.getByText('Some of the fields are invalid')).toBeInTheDocument()
    expect(screen.getByText('Please make sure the passwords contain at least 6 characters')).toBeInTheDocument()
  })

  test("should failed to submit for different passwords", () => {
    render(
      <Provider store={store}>
        <ResetPassword token={"token"} />
      </Provider>
    );

    const button = screen.getByRole("button");

    userEvent.type(screen.getByLabelText("Password"), "password1");
    userEvent.type(screen.getByLabelText("Confirm"), "password2");
    userEvent.click(button);

    const errorState = store.getState().errorsReducer;

    expect(errorState.errorTitle).toBe("Passwords need to be a match");
    expect(errorState.errorMessage).toBe("");
  });

  test("should handle form submission failed", async () => {
    render(
      <Provider store={store}>
        <ResetPassword token={"token"} />
      </Provider>
    );

    const button = screen.getByRole("button");

    userEvent.type(screen.getByLabelText("Password"), "password");
    userEvent.type(screen.getByLabelText("Confirm"), "password");
    userEvent.click(button);

    const errorState = store.getState().errorsReducer;

    const expectedPayload = {
      newError: true,
      errorTitle: "Changing Password Failed",
      errorMessage: "",
      errorStatusCode: null,
    };

    await waitFor(() => {
      expect(errorState).toStrictEqual(expectedPayload);
      expect(mockedAxiosInstance.mock.calls[0][0]).toEqual(
        "/auth/reset/password-reset"
      );
    });
  });

  test("should handle form submission succeed", async () => {
    render(
      <Provider store={store}>
        <ResetPassword token={"token"} />
      </Provider>
    );

    const button = screen.getByRole("button");

    userEvent.type(screen.getByLabelText("Password"), "password");
    userEvent.type(screen.getByLabelText("Confirm"), "password");
    userEvent.click(button);

    const messageState = store.getState().messagesReducer;

    const expectedPayload = {
      newMessage: true,
      messageTitle: "Password Changed Successfully",
      message: "message",
    };

    await waitFor(() => {
      expect(messageState).toStrictEqual(expectedPayload);
      expect(spiedRouter.mock.calls[0][0]).toEqual("/auth/login");
    });
  });

  test("should call axios with the correct payload", async () => {
    render(
      <Provider store={store}>
        <ResetPassword token={"token"} />
      </Provider>
    );

    const button = screen.getByRole("button");

    userEvent.type(screen.getByLabelText("Password"), "password");
    userEvent.type(screen.getByLabelText("Confirm"), "password");
    userEvent.click(button);

    const expectedFields = {
      password: "password",
      passwordConfirmation: "password",
      resetToken: "token",
    };

    await waitFor(() => {
      expect(mockedAxiosInstance.mock.calls[2][0]).toEqual(
        "/auth/reset/password-reset"
      );
      expect(mockedAxiosInstance.mock.calls[2][1]).toStrictEqual(
        expectedFields
      );
    });
  });
});
