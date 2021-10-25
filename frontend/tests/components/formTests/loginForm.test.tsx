import "@testing-library/jest-dom/extend-expect";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Provider } from "react-redux";
import store from "../../../redux/store/reduxStore";
import LoginForm from "../../../components/auth/forms/login-form";
import router from "next/router";
import axiosInstance from "../../../utils/axios/axiosInstance";

describe("LoginForm", () => {
  let spiedRouter: jest.SpyInstance;
  let spiedAxios: jest.SpyInstance;

  beforeAll(() => {
    jest.spyOn(axiosInstance,'get').mockImplementation(async()=>{})
    spiedAxios = jest
      .spyOn(axiosInstance, "post")
      .mockImplementation(async () => ({ data: "" }));
    spiedRouter = jest.spyOn(router, "push");
  });

  test("should render the correct dom elements", async () => {
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    const formElement = screen.getByRole("form");
    const emailLabelElement = screen.getByLabelText("Email");
    const passwordLabelElement = screen.getByLabelText("Password");
    const buttonElement = screen.getByRole("button");

    expect(formElement).toBeInTheDocument();
    expect(emailLabelElement).toBeInTheDocument();
    expect(passwordLabelElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test("should add 'invalid' class to input if inputs are invalid and disable the button", () => {
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    const emailInputElement = screen.getByLabelText("Email");
    const passwordInputElement = screen.getByLabelText("Password");
    const buttonElement = screen.getByRole("button");

    userEvent.type(emailInputElement, "not an email");
    userEvent.type(passwordInputElement, "123");

    expect(emailInputElement.className).toEqual("inValid");
    expect(passwordInputElement.className).toEqual("inValid");
    expect(buttonElement).toBeDisabled();
  });

  test("should behave appropriately if inputs are valid", () => {
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    const emailInputElement = screen.getByLabelText("Email");
    const passwordInputElement = screen.getByLabelText("Password");
    const buttonElement = screen.getByRole("button");

    userEvent.type(emailInputElement, "email@email.com");
    userEvent.type(passwordInputElement, "123456");

    expect(emailInputElement.className).toEqual("");
    expect(passwordInputElement.className).toEqual("");
    expect(buttonElement).not.toBeDisabled();
  });

  test('should open error div if button is disabled',()=>{
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    const buttonElement = screen.getByRole("button");

    userEvent.hover(buttonElement.parentElement as Element)

    expect(buttonElement).toBeDisabled();
    expect(screen.getByText('Some of the fields are invalid')).toBeInTheDocument()
    expect(screen.getByText('Please make sure you follow the following instructions')).toBeInTheDocument()
  })

  test("should handle form submission ", async () => {
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    const emailInputElement = screen.getByLabelText("Email");
    const passwordInputElement = screen.getByLabelText("Password");
    const buttonElement = screen.getByRole("button");

    userEvent.type(emailInputElement, "email@email.com");
    userEvent.type(passwordInputElement, "123456");
    userEvent.click(buttonElement);

    await waitFor(() => {
      expect(spiedAxios.mock.calls[0][0]).toEqual("/auth/login");
      expect(spiedAxios.mock.calls[0][1]).toStrictEqual({
        email: "email@email.com",
        password: "123456",
      });
      expect(spiedRouter.mock.calls[0][0]).toEqual("/");
    });
  });
});
