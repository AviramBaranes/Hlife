import "@testing-library/jest-dom/extend-expect";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Provider } from "react-redux";
import store from "../../../redux/store/reduxStore";
import ForgotPasswordForm from "../../../components/auth/forms/forgotPassword-form";
import router from "next/router";
import axiosInstance from "../../../utils/axios/axiosInstance";

describe("ForgotPasswordForm", () => {
  let spiedRouter: jest.SpyInstance;
  let spiedAxios: jest.SpyInstance;

  beforeAll(() => {
    spiedAxios = jest
      .spyOn(axiosInstance, "post")
      .mockImplementation(async () => ({ data: {} }));
    spiedRouter = jest.spyOn(router, "push");
  });

  test("should render the correct dom elements", () => {
    render(
      <Provider store={store}>
        <ForgotPasswordForm />
      </Provider>
    );

    const formElement = screen.getByRole("form");
    const labelElement = screen.getByLabelText("Email:");
    const buttonElement = screen.getByRole("button");

    expect(formElement).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test("should add 'invalid' class to input if input is invalid and disable the button", () => {
    render(
      <Provider store={store}>
        <ForgotPasswordForm />
      </Provider>
    );

    const inputElement = screen.getByLabelText("Email:");
    const buttonElement = screen.getByRole("button");

    userEvent.type(inputElement, "not an email");

    expect(inputElement.classList[0]).toEqual("inValid");
    expect(buttonElement).toBeDisabled();
  });

  test("should behave appropriately if input is valid", async () => {
    render(
      <Provider store={store}>
        <ForgotPasswordForm />
      </Provider>
    );

    const inputElement = screen.getByLabelText("Email:");
    const buttonElement = screen.getByRole("button");

    userEvent.type(inputElement, "email@email.com");

    expect(inputElement.className).toEqual("");
    expect(buttonElement).not.toBeDisabled();
  });

  test('should open error div if button is disabled',()=>{
    render(
      <Provider store={store}>
        <ForgotPasswordForm />
      </Provider>
    );

    const buttonElement = screen.getByRole("button");

    userEvent.hover(buttonElement.parentElement as Element)

    expect(buttonElement).toBeDisabled();
    expect(screen.getByText('Email field is invalid')).toBeInTheDocument()
    expect(screen.getByText('Please make sure you enter a valid email')).toBeInTheDocument()
  })

  test("should handle form submission", async () => {
    render(
      <Provider store={store}>
        <ForgotPasswordForm />
      </Provider>
    );

    const inputElement = screen.getByLabelText("Email:");
    const buttonElement = screen.getByRole("button");

    userEvent.type(inputElement, "email@email.com");
    userEvent.click(buttonElement);
    await waitFor(() => {
      expect(spiedAxios.mock.calls[0][0]).toEqual("/auth/password/send-token");
      expect(spiedAxios.mock.calls[0][1]).toStrictEqual({
        email: "email@email.com",
      });
      expect(spiedRouter.mock.calls[0][0]).toEqual("/auth/login");
    });
  });
});
