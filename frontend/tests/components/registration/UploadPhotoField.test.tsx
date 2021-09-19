import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import UploadPhoto from "../../../components/Registration/statsFields/UploadPhoto";

describe("MusclesMassField tests", () => {
  test("should render the dom correctly", () => {
    const props = {
      shouldDisplay: true,
      buttonsEvents: { continue() {}, skip() {} },
    };

    const { container } = render(<UploadPhoto {...props} />);

    const parentDiv = container.children[0];
    const titleElem = screen.getByText("Upload an image");
    const subTitleElem = screen.getByText(
      "This field is optional, and will help you follow your progress"
    );
    const input = screen.getByTestId("uploadPhotoInput");
    const continueButton = screen.getByText("Continue");
    const skipButton = screen.getByText("Skip");

    expect(parentDiv).toHaveStyle("Display: block");
    expect(titleElem.tagName).toEqual("H3");
    expect(subTitleElem.tagName).toEqual("P");
    expect(input).toHaveAttribute("type", "file");
    expect(continueButton).toHaveAttribute("type", "button");
    expect(skipButton).toHaveAttribute("type", "button");
  });
  test("should have display:none if shouldDisplay prop is false", () => {
    const props = {
      shouldDisplay: false,
      buttonsEvents: { continue() {}, skip() {} },
    };
    const { container } = render(<UploadPhoto {...props} />);

    const section = container.children[0];

    expect(section.tagName).toEqual("DIV");
    expect(section).toHaveStyle("display: none;");
  });
  test("buttons should not be disabled", () => {
    global.URL.createObjectURL = jest.fn();
    const testFile = new File(["(⌐□_□)"], "photo.png", {
      type: "image/png",
    });
    const props = {
      shouldDisplay: false,
      buttonsEvents: { continue() {}, skip() {} },
    };
    render(<UploadPhoto {...props} />);

    const skipButton = screen.getByText("Skip");
    const continueButton = screen.getByText("Continue");
    const input = screen.getByTestId("uploadPhotoInput");

    userEvent.upload(input, testFile);

    expect(skipButton).not.toBeDisabled();
    expect(continueButton).not.toBeDisabled();
  });
});
