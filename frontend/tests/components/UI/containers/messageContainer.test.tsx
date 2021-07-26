import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

import { Provider } from "react-redux";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import configureStore from "redux-mock-store";

import MessageContainer from "../../../../components/UI/containers/Messages/MessageContainer";

const middleware = getDefaultMiddleware();
const mockStore = configureStore(middleware);

describe("message modal test", () => {
  jest.useFakeTimers();
  test("should render the message with fields", () => {
    const initialState = {
      messagesReducer: {
        newMessage: true,
        messageTitle: "title",
        message: "message",
      },
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <MessageContainer />
      </Provider>
    );

    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByText("message")).toBeInTheDocument();
  });
  test("should not render the message with fields", () => {
    const initialState = {
      messagesReducer: {
        newMessage: false,
        messageTitle: "title",
        message: "message",
      },
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <MessageContainer />
      </Provider>
    );

    expect(screen.queryByText("title")).not.toBeInTheDocument();
    expect(screen.queryByText("message")).not.toBeInTheDocument();
  });
  test("should stop render the container after timeout", () => {
    const initialState = {
      messagesReducer: {
        newMessage: true,
        messageTitle: "title",
        message: "message",
      },
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <MessageContainer />
      </Provider>
    );
    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByText("message")).toBeInTheDocument();

    jest.runAllTimers();

    const action = store.getActions()[0];

    expect(action.type).toBe("messages/messageConfirmed");
  });
});
