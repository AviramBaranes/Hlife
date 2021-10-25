import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

import GoalsRequiredField from "../../../components/Registration/goalsFields/RequiredFields";
import StatsRequiredField from "../../../components/Registration/statsFields/RequiredFields";
import store from "../../../redux/store/reduxStore";

describe("goals required fields tests", () => {
  test("should render the dom correctly", () => {
    const props = {
      shouldDisplay: true,
    };
    const { container } = render(
      <Provider store={store}>
        <GoalsRequiredField {...props} />
      </Provider>
    );
    const section = container.children[0];
    const titleElem = screen.getByText("What is your basic goal ?");
    const basicGoal1 = screen.getByText("Lose Fat");
    const basicGoal2 = screen.getByText("Gain Muscle");
    const input = screen.getByTestId("goalsRequiredFields");
    const continueButton = screen.getByText("Continue");

    expect(section).toHaveStyle("Display: block");
    expect(titleElem.tagName).toEqual("H3");
    expect(basicGoal1.tagName).toEqual("H4");
    expect(basicGoal2.tagName).toEqual("H4");
    expect(input).toHaveAttribute("type", "range");
    expect(continueButton).toBeDisabled();

    fireEvent.change(input, { target: { value: "40" } });
    userEvent.click(basicGoal1);

    expect(continueButton).not.toBeDisabled();
  });
  test("should have display:none if shouldDisplay prop is false", () => {
    const props = {
      shouldDisplay: false,
    };
    const { container } = render(
      <Provider store={store}>
        <GoalsRequiredField {...props} />
      </Provider>
    );

    const section = container.children[0];

    expect(section.tagName).toEqual("SECTION");
    expect(section).toHaveStyle("display: none;");
  });
});

describe("stats required fields tests", () => {
  test("should render the dom correctly", () => {
    const props = {
      shouldDisplay: true,
    };
    const { container } = render(
      <Provider store={store}>
        <StatsRequiredField {...props} />
      </Provider>
    );
    const section = container.children[0];
    const titleElem = screen.getByText("What is your current level?");
    const rank1 = screen.getByText("Beginner");
    const rank2 = screen.getByText("Intermediate");
    const rank3 = screen.getByText("Advanced");
    const rank4 = screen.getByText("Pro");
    const inputs = screen.getAllByRole("textbox");
    const continueButton = screen.getByText("Continue");

    expect(section).toHaveStyle("Display: block");
    expect(titleElem.tagName).toEqual("H3");
    expect(rank1.tagName).toEqual("H4");
    expect(rank2.tagName).toEqual("H4");
    expect(rank3.tagName).toEqual("H4");
    expect(rank4.tagName).toEqual("H4");
    expect(inputs[0]).toHaveAttribute("type", "text");
    expect(inputs[1]).toHaveAttribute("type", "text");
    expect(continueButton).toBeDisabled();
  });
  test("should have display:none if shouldDisplay prop is false", () => {
    const props = {
      shouldDisplay: false,
    };
    const { container } = render(
      <Provider store={store}>
        <StatsRequiredField {...props} />
      </Provider>
    );

    const section = container.children[0];

    expect(section.tagName).toEqual("SECTION");
    expect(section).toHaveStyle("display: none;");
  });

  test("button should not be disabled", () => {
    const props = {
      shouldDisplay: false,
    };
    render(
      <Provider store={store}>
        <StatsRequiredField {...props} />
      </Provider>
    );

    const continueButton = screen.getByText("Continue");
    const rankSelection = screen.getByText("Pro");
    const weightInput = screen.getByLabelText("Weight (KG)");
    const heightInput = screen.getByLabelText("Height (Cm)");

    //nothing was filled
    expect(continueButton).toBeDisabled();

    userEvent.click(rankSelection);
    userEvent.type(weightInput, "150");

    //rank and weight filled
    expect(continueButton).not.toBeDisabled();

    userEvent.clear(weightInput);
    userEvent.type(weightInput, "500");

    //weight is invalid
    expect(continueButton).toBeDisabled();

    userEvent.clear(weightInput);
    userEvent.type(weightInput, "150");
    userEvent.type(heightInput, "300");

    //weight is valid and height is not
    expect(continueButton).toBeDisabled();

    userEvent.clear(heightInput);
    userEvent.type(heightInput, "170");
    expect(continueButton).not.toBeDisabled();
  });
});
