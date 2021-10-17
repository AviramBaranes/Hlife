import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";

import SetGoals from "../../../../pages/auth/registration/set-goals";
import * as RequiredFields from "../../../../components/Registration/goalsFields/RequiredFields";
import * as MusclesMassField from "../../../../components/Registration/generalFields/MusclesMassField";
import * as FatPercentageField from "../../../../components/Registration/generalFields/FatPercentageField";
import { getServerSideProps } from "../../../../pages/auth/registration/set-goals";
import store from "../../../../redux/store/reduxStore";
import userEvent from "@testing-library/user-event";
import axiosInstance from "../../../../utils/axios/axiosInstance";
import router from "next/router";
import { goalsActions } from "../../../../redux/slices/goals/goalsSlice";
import * as protectRouteHandler from "../../../../utils/protectedRoutes/protectedRoutes";

jest.mock(
  "../../../../utils/registration/fields/fatPercentageFieldHelpers",
  () => ({
    fatPercentageChangeHandler: jest.fn(),
  })
);

jest.mock("nookies", () => ({
  destroyCookie: jest.fn().mockImplementation(() => ({})),
  parseCookies: jest
    .fn()
    .mockImplementationOnce(() => ({ redirected: "true" }))
    .mockImplementationOnce(() => ({ redirected: "" })),
}));

describe("set-goals page server side", () => {
  beforeAll(() => {
    jest
      .spyOn(protectRouteHandler, "default")
      .mockImplementationOnce(async () => "wrong path")
      .mockImplementation(async () => "/auth/registration/set-goals");
  });

  test("should redirect if the wrong destination is returned", async () => {
    const setHeader = jest.fn();
    const result = (await getServerSideProps({
      res: { setHeader },
    } as any)) as any;

    expect(setHeader.mock.calls[0]).toEqual(["set-cookie", "redirected=true"]);
    expect(result.redirect.permanent).toEqual(false);
    expect(result.redirect.destination).toEqual("wrong path");
  });

  test("should return props with redirected set to true", async () => {
    const result = (await getServerSideProps({} as any)) as any;

    expect(result.props).toStrictEqual({ redirected: true });
    expect(result.redirect).toEqual(undefined);
  });

  test("should return props with redirected set to false", async () => {
    const result = (await getServerSideProps({} as any)) as any;

    expect(result.props).toStrictEqual({ redirected: false });
    expect(result.redirect).toEqual(undefined);
  });
});

describe("set-goals page tests", () => {
  let spiedRequiredField: jest.SpyInstance;
  let spiedFatPercentageField: jest.SpyInstance;
  let spiedMusclesMassField: jest.SpyInstance;
  let spiedAxiosInstance: jest.SpyInstance;
  let spiedRouter: jest.SpyInstance;

  beforeEach(() => {
    spiedRequiredField = jest.spyOn(RequiredFields, "default");
    spiedFatPercentageField = jest.spyOn(FatPercentageField, "default");
    spiedMusclesMassField = jest.spyOn(MusclesMassField, "default");
    spiedAxiosInstance = jest
      .spyOn(axiosInstance, "post")
      .mockImplementation(async () => ({ data: "data" }));
    spiedRouter = jest.spyOn(router, "push");
  });

  afterEach(() => store.dispatch(goalsActions.resetState()));

  test("should render the correct dom", () => {
    const { container } = render(
      <Provider store={store}>
        <SetGoals redirected={false} />
      </Provider>
    );

    const mainTitle = container.children[0];
    const subTitle = container.children[1];
    const requiredFieldTitle = container.children[2].children[0];
    const fatPercentageFieldTitle = container.children[3].children[0];
    const musclesMassFieldTitle = container.children[4].children[0];

    expect(mainTitle.textContent).toEqual("Create Your Goals");
    expect(subTitle.textContent).toEqual(
      "this will help us create for you a program that suits you, and to track your progress"
    );
    expect(requiredFieldTitle.textContent).toEqual("What is your basic goal?*");
    expect(fatPercentageFieldTitle.textContent).toEqual(
      "What is your desired fat percentage?"
    );
    expect(musclesMassFieldTitle.textContent).toEqual(
      "What is your desired muscles mass?"
    );
  });

  test("should display only one field each time in chronological order and change the state accordingly", async () => {
    //display only requiredField
    render(
      <Provider store={store}>
        <SetGoals redirected={false} />
      </Provider>
    );

    const requiredFieldCalls = spiedRequiredField.mock.calls;
    const fatPercentageFieldCalls = spiedFatPercentageField.mock.calls;
    const musclesMassFieldCalls = spiedMusclesMassField.mock.calls;

    expect(requiredFieldCalls[0][0].shouldDisplay).toEqual(true);
    expect(fatPercentageFieldCalls[0][0].shouldDisplay).toEqual(false);
    expect(musclesMassFieldCalls[0][0].shouldDisplay).toEqual(false);
    //display only fatPercentageField

    //filling the required fields
    const basicGoalSelection = screen.getByText("Lose Fat");
    const continueButtons = screen.getAllByText("Continue");

    userEvent.click(basicGoalSelection);
    userEvent.click(continueButtons[0]);

    expect(store.getState().goalsReducer.basicGoal).toEqual("lose fat");
    expect(store.getState().goalsReducer.desiredWeight).toEqual(80);
    expect(
      requiredFieldCalls[requiredFieldCalls.length - 1][0].shouldDisplay
    ).toEqual(false);
    expect(
      fatPercentageFieldCalls[fatPercentageFieldCalls.length - 1][0]
        .shouldDisplay
    ).toEqual(true);
    expect(
      musclesMassFieldCalls[musclesMassFieldCalls.length - 1][0].shouldDisplay
    ).toEqual(false);

    //display only musclesMassFields

    //change fat percentage
    const rangInput = screen.getByTestId("fatPercentageInput");

    fireEvent.change(rangInput, {
      target: { value: "30" },
    });
    userEvent.click(continueButtons[1]);

    expect(store.getState().goalsReducer.desiredFatPercentage).toEqual(30);
    expect(
      requiredFieldCalls[requiredFieldCalls.length - 1][0].shouldDisplay
    ).toEqual(false);
    expect(
      fatPercentageFieldCalls[fatPercentageFieldCalls.length - 1][0]
        .shouldDisplay
    ).toEqual(false);
    expect(
      musclesMassFieldCalls[musclesMassFieldCalls.length - 1][0].shouldDisplay
    ).toEqual(true);

    const muscleMassFieldInput = screen.getByTestId("musclesMassInput");

    fireEvent.change(muscleMassFieldInput, { target: { value: "100" } });
    userEvent.click(continueButtons[2]);

    const expectedBodyRequest = {
      basicGoal: "lose fat",
      weight: 80,
      musclesMass: 100,
      fatPercentage: 30,
    };
    const expectedMessageState = {
      messageTitle: "Goals created!",
      message: "data",
      newMessage: true,
    };

    expect(store.getState().goalsReducer.desiredMusclesMass).toEqual(100);
    expect(spiedAxiosInstance.mock.calls[0][0]).toEqual("/goals");
    expect(spiedAxiosInstance.mock.calls[0][1]).toStrictEqual(
      expectedBodyRequest
    );
    await waitFor(() => {
      expect(store.getState().messagesReducer).toStrictEqual(
        expectedMessageState
      );
      expect(spiedRouter.mock.calls[0][0]).toEqual(
        "/auth/registration/set-initial-stats"
      );
    });
  });

  test("should render the fields with the appropriate props (goal is lose fat)", () => {
    //display only requiredField
    render(
      <Provider store={store}>
        <SetGoals redirected={false} />
      </Provider>
    );

    const requiredFieldCalls = spiedRequiredField.mock.calls;
    const fatPercentageFieldCalls = spiedFatPercentageField.mock.calls;
    const musclesMassFieldCalls = spiedMusclesMassField.mock.calls;

    expect(requiredFieldCalls[0][0].shouldDisplay).toEqual(true);

    //filling the required fields
    const basicGoalSelection = screen.getByText("Lose Fat");
    const continueButtons = screen.getAllByText("Continue");

    userEvent.click(basicGoalSelection);
    userEvent.click(continueButtons[0]);

    expect(
      fatPercentageFieldCalls[fatPercentageFieldCalls.length - 1][0]
        .shouldDisplay
    ).toEqual(true);
    expect(
      fatPercentageFieldCalls[fatPercentageFieldCalls.length - 1][0]
        .instructions
    ).toEqual("This field is required");
    expect(
      fatPercentageFieldCalls[fatPercentageFieldCalls.length - 1][0].basicGoal
    ).toEqual("lose fat");
    expect(
      fatPercentageFieldCalls[fatPercentageFieldCalls.length - 1][0].title
    ).toEqual("What is your desired fat percentage?");
    expect(
      fatPercentageFieldCalls[fatPercentageFieldCalls.length - 1][0]
        .buttonsEvents
    ).toBeTruthy();

    //change fat percentage
    const rangInput = screen.getByTestId("fatPercentageInput");

    fireEvent.change(rangInput, {
      target: { value: "30" },
    });
    userEvent.click(continueButtons[1]);

    expect(
      musclesMassFieldCalls[musclesMassFieldCalls.length - 1][0].instructions
    ).toEqual("This field is optional");
    expect(
      musclesMassFieldCalls[musclesMassFieldCalls.length - 1][0].basicGoal
    ).toEqual("lose fat");
    expect(
      musclesMassFieldCalls[musclesMassFieldCalls.length - 1][0].shouldDisplay
    ).toEqual(true);
    expect(
      musclesMassFieldCalls[musclesMassFieldCalls.length - 1][0].title
    ).toEqual("What is your desired muscles mass?");
    expect(
      musclesMassFieldCalls[musclesMassFieldCalls.length - 1][0].buttonsEvents
    ).toBeTruthy();
  });

  test("should allow skip fatPercentageField", () => {
    //display only requiredField
    render(
      <Provider store={store}>
        <SetGoals redirected={false} />
      </Provider>
    );

    const requiredFieldCalls = spiedRequiredField.mock.calls;
    const fatPercentageFieldCalls = spiedFatPercentageField.mock.calls;
    const musclesMassFieldCalls = spiedMusclesMassField.mock.calls;

    expect(requiredFieldCalls[0][0].shouldDisplay).toEqual(true);

    //filling the required fields
    const basicGoalSelection = screen.getByText("Gain Muscle");
    const continueButtons = screen.getAllByText("Continue");

    userEvent.click(basicGoalSelection);
    userEvent.click(continueButtons[0]);

    expect(
      fatPercentageFieldCalls[fatPercentageFieldCalls.length - 1][0]
        .shouldDisplay
    ).toEqual(true);
    expect(
      fatPercentageFieldCalls[fatPercentageFieldCalls.length - 1][0]
        .instructions
    ).toEqual("This field is optional");

    //change fat percentage
    const skipButton = screen.getAllByText("Skip")[0];
    userEvent.click(skipButton);

    expect(
      musclesMassFieldCalls[musclesMassFieldCalls.length - 1][0].instructions
    ).toEqual("This field is required");
    expect(
      musclesMassFieldCalls[musclesMassFieldCalls.length - 1][0].basicGoal
    ).toEqual("increase muscles mass");
    expect(
      musclesMassFieldCalls[musclesMassFieldCalls.length - 1][0].shouldDisplay
    ).toEqual(true);
  });

  test("should allow skip muscles mass field", () => {
    //display only requiredField
    render(
      <Provider store={store}>
        <SetGoals redirected={false} />
      </Provider>
    );

    const requiredFieldCalls = spiedRequiredField.mock.calls;
    const fatPercentageFieldCalls = spiedFatPercentageField.mock.calls;

    expect(requiredFieldCalls[0][0].shouldDisplay).toEqual(true);

    //filling the required fields
    const basicGoalSelection = screen.getByText("Lose Fat");
    const continueButtons = screen.getAllByText("Continue");

    userEvent.click(basicGoalSelection);
    userEvent.click(continueButtons[0]);

    expect(
      fatPercentageFieldCalls[fatPercentageFieldCalls.length - 1][0]
        .shouldDisplay
    ).toEqual(true);
    expect(
      fatPercentageFieldCalls[fatPercentageFieldCalls.length - 1][0]
        .instructions
    ).toEqual("This field is required");

    //change fat percentage
    const rangInput = screen.getByTestId("fatPercentageInput");

    fireEvent.change(rangInput, {
      target: { value: "30" },
    });
    userEvent.click(continueButtons[1]);
    const skipButton = screen.getAllByText("Skip")[1];
    userEvent.click(skipButton);

    expect(spiedAxiosInstance.mock.calls[1][0]).toEqual("/goals");
    expect(spiedAxiosInstance.mock.calls[1][1]).toStrictEqual({
      basicGoal: "lose fat",
      weight: 80,
      fatPercentage: 30,
    });
  });
});
