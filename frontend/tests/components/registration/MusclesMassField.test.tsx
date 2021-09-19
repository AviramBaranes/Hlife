import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

import MusclesMassField from "../../../components/Registration/generalFields/MusclesMassField";

describe("MusclesMassField tests", () => {
  test("should render the dom correctly", () => {
    const props = {
      instructions: "instructions",
      basicGoal: "increase muscles mass",
      shouldDisplay: true,
      title: "title",
      buttonsEvents: { continue() {}, skip() {} },
    };
    const { container } = render(<MusclesMassField {...props} />);

    const section = container.children[0];
    const titleElem = screen.getByText("title");
    const subTitleElem = screen.getByText("instructions");
    const input = screen.getByTestId("musclesMassInput");
    const continueButton = screen.getByText("Continue");
    const skipButton = screen.getByText("Skip");

    expect(section).toHaveStyle("Display: block");
    expect(titleElem.tagName).toEqual("H3");
    expect(subTitleElem.tagName).toEqual("P");
    expect(input).toHaveAttribute("type", "range");
    expect(continueButton).toHaveAttribute("type", "button");
    expect(skipButton).toHaveStyle("display: none;");
  });
  test("should have display:none if shouldDisplay prop is false", () => {
    const props = {
      instructions: "instructions",
      basicGoal: "increase muscles mass",
      shouldDisplay: false,
      title: "title",
      buttonsEvents: { continue() {}, skip() {} },
    };
    const { container } = render(<MusclesMassField {...props} />);

    const section = container.children[0];

    expect(section.tagName).toEqual("SECTION");
    expect(section).toHaveStyle("display: none;");
  });
  test("should not display skip button", () => {
    const props = {
      instructions: "instructions",
      shouldDisplay: false,
      title: "title",
      buttonsEvents: { continue() {}, skip() {} },
    };
    render(<MusclesMassField {...props} />);

    const skipButton = screen.getByText("Skip");

    expect(skipButton.tagName).toEqual("BUTTON");
    expect(skipButton).toHaveStyle("display: block;");
  });

  test("buttons should not be disabled", () => {
    const props = {
      instructions: "instructions",
      shouldDisplay: false,
      title: "title",
      buttonsEvents: { continue() {}, skip() {} },
    };
    render(<MusclesMassField {...props} />);

    const skipButton = screen.getByText("Skip");
    const continueButton = screen.getByText("Continue");
    const input = screen.getByTestId("musclesMassInput");

    fireEvent.change(input, { target: { value: "30" } });

    expect(skipButton).not.toBeDisabled();
    expect(continueButton).not.toBeDisabled();
  });
});
