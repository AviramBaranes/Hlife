import "@testing-library/jest-dom/extend-expect";

import { render, screen } from "@testing-library/react";

import Layout from "../../../components/Layout/Layout";
import LoadingSpinner from "../../../components/UI/Spinner/Spinner";
import ErrorContainer from "../../../components/UI/ErrorContainer/ErrorContainer";

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

jest.mock("../../../Redux/Slices/tokens");

const middlewares = getDefaultMiddleware();
const mockStore = configureStore(middlewares);

describe("Layout component", () => {
  test("should render error container", () => {
    const initialState = {
      tokensReducer: {
        error: "Getting token failed",
      },
      usersReducer: {
        loading: false,
      },
      errorsReducer: {},
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <ErrorContainer />
        <Layout children={"not important"} />
      </Provider>
    );
    const errorTitle = screen.getByText("Server Error");

    expect(errorTitle).toBeInTheDocument();
  });
});

//tests:

//1- useSelector returned an error
//2- useSelector returned loading state set to true
//3- no error and no loading
