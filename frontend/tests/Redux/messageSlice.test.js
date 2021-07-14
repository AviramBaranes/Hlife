import { waitFor } from "@testing-library/dom";

import store from "../../Redux/store";
import { messagesActions } from "../../Redux/Slices/messages";

describe("Errors slice tests", () => {
  test("should have the correct initialState", () => {
    const expectedInitialState = {
      newMessage: false,
      messageTitle: null,
      message: null,
    };

    const initialState = store.getState().messagesReducer;

    expect(initialState).toStrictEqual(expectedInitialState);
  });
  test("should have the correct state after newMessage called", () => {
    const expectedState = {
      newMessage: true,
      messageTitle: "title",
      message: "my message",
    };

    store.dispatch(
      messagesActions.newMessage({
        messageTitle: "title",
        message: "my message",
      })
    );

    const currentState = store.getState().messagesReducer;

    expect(currentState).toStrictEqual(expectedState);
  });
  test("should reset the message state if messageConfirmed is called", async () => {
    const expectedState = {
      newMessage: false,
      messageTitle: null,
      message: null,
    };

    store.dispatch(
      messagesActions.newMessage({
        messageTitle: "title",
        message: "my message",
      })
    );

    store.dispatch(messagesActions.messageConfirmed());

    expect(store.getState().messagesReducer).toStrictEqual(expectedState);
  });
});
