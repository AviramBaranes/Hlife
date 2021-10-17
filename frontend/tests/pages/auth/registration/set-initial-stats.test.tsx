import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import * as nookies from "nookies";

import SetInitialStats from "../../../../pages/auth/registration/set-initial-stats";
import * as RequiredFields from "../../../../components/Registration/statsFields/RequiredFields";
import * as MusclesMassField from "../../../../components/Registration/generalFields/MusclesMassField";
import * as FatPercentageField from "../../../../components/Registration/generalFields/FatPercentageField";
import * as UploadPhoto from "../../../../components/Registration/statsFields/UploadPhoto";
import { getServerSideProps } from "../../../../pages/auth/registration/set-initial-stats";
import store from "../../../../redux/store/reduxStore";
import userEvent from "@testing-library/user-event";
import axiosInstance from "../../../../utils/axios/axiosInstance";
import router from "next/router";
import { statsActions } from "../../../../redux/slices/stats/statsSlice";
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

describe("set-initial-stats page server side", () => {
  beforeAll(() => {
    jest
      .spyOn(protectRouteHandler, "default")
      .mockImplementationOnce(async () => "wrong path")
      .mockImplementation(async () => "/auth/registration/set-initial-stats");
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

describe("set-initial-stats page tests", () => {
  const testFile = new File(["(⌐□_□)"], "photo.png", {
    type: "image/png",
  });
  let spiedRequiredField: jest.SpyInstance;
  let spiedFatPercentageField: jest.SpyInstance;
  let spiedMusclesMassField: jest.SpyInstance;
  let spiedUploadPhotoField: jest.SpyInstance;
  let spiedAxiosInstance: jest.SpyInstance;
  let spiedRouter: jest.SpyInstance;

  beforeEach(() => {
    global.URL.createObjectURL = jest.fn();
    spiedRequiredField = jest.spyOn(RequiredFields, "default");
    spiedFatPercentageField = jest.spyOn(FatPercentageField, "default");
    spiedMusclesMassField = jest.spyOn(MusclesMassField, "default");
    spiedUploadPhotoField = jest.spyOn(UploadPhoto, "default");
    spiedAxiosInstance = jest
      .spyOn(axiosInstance, "post")
      .mockImplementation(async () => ({ data: "data" }));
    spiedRouter = jest.spyOn(router, "push");
  });

  afterEach(() => store.dispatch(statsActions.resetState()));

  test("should render the correct dom", () => {
    const { container } = render(
      <Provider store={store}>
        <SetInitialStats redirected={false} />
      </Provider>
    );

    const mainTitle = container.children[0];
    const subTitle = container.children[1];
    const requiredFieldTitle = container.children[2].children[0];
    const fatPercentageFieldTitle = container.children[3].children[0];
    const musclesMassFieldTitle = container.children[4].children[0];

    expect(mainTitle.textContent).toEqual("Create your initial stats");
    expect(subTitle.textContent).toEqual(
      "This action will gain you 15 points!"
    );
    expect(requiredFieldTitle.textContent).toEqual(
      "What is your current level?*"
    );
    expect(fatPercentageFieldTitle.textContent).toEqual(
      "What is your current fat percentage?"
    );
    expect(musclesMassFieldTitle.textContent).toEqual(
      "What is your current muscles mass?"
    );
  });

  test("should display only one field each time in chronological order and change the state accordingly", async () => {
    render(
      <Provider store={store}>
        <SetInitialStats redirected={false} />
      </Provider>
    );

    const requiredFieldCalls = spiedRequiredField.mock.calls;
    const fatPercentageFieldCalls = spiedFatPercentageField.mock.calls;
    const musclesMassFieldCalls = spiedMusclesMassField.mock.calls;
    const uploadPhotoCalls = spiedUploadPhotoField.mock.calls;

    expect(requiredFieldCalls[0][0].shouldDisplay).toEqual(true);
    expect(fatPercentageFieldCalls[0][0].shouldDisplay).toEqual(false);
    expect(musclesMassFieldCalls[0][0].shouldDisplay).toEqual(false);
    expect(uploadPhotoCalls[0][0].shouldDisplay).toEqual(false);
    //display only fatPercentageField

    //filling the required fields
    const rankSelection = screen.getByText("Intermediate");
    const inputs = screen.getAllByRole("textbox");
    const continueButtons = screen.getAllByText("Continue");

    userEvent.click(rankSelection);
    userEvent.type(inputs[0], "70");
    userEvent.type(inputs[1], "170");
    userEvent.click(continueButtons[0]);

    expect(store.getState().statsReducer.rank).toEqual("Intermediate");
    expect(store.getState().statsReducer.weight).toEqual(70);
    expect(store.getState().statsReducer.height).toEqual(170);
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
    expect(
      uploadPhotoCalls[uploadPhotoCalls.length - 1][0].shouldDisplay
    ).toEqual(false);

    //change fat percentage
    const rangInput = screen.getByTestId("fatPercentageInput");

    fireEvent.change(rangInput, {
      target: { value: "30" },
    });
    userEvent.click(continueButtons[1]);

    expect(store.getState().statsReducer.fatPercentage).toEqual(30);
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
    expect(
      uploadPhotoCalls[uploadPhotoCalls.length - 1][0].shouldDisplay
    ).toEqual(false);

    //change musclesMass input
    const muscleMassFieldInput = screen.getByTestId("musclesMassInput");

    fireEvent.change(muscleMassFieldInput, { target: { value: "100" } });
    userEvent.click(continueButtons[2]);

    expect(store.getState().statsReducer.musclesMass).toEqual(100);
    expect(
      requiredFieldCalls[requiredFieldCalls.length - 1][0].shouldDisplay
    ).toEqual(false);
    expect(
      fatPercentageFieldCalls[fatPercentageFieldCalls.length - 1][0]
        .shouldDisplay
    ).toEqual(false);
    expect(
      musclesMassFieldCalls[musclesMassFieldCalls.length - 1][0].shouldDisplay
    ).toEqual(false);
    expect(
      uploadPhotoCalls[uploadPhotoCalls.length - 1][0].shouldDisplay
    ).toEqual(true);

    //uploading file

    const uploadPhotoFieldInput = screen.getByTestId("uploadPhotoInput");
    userEvent.upload(uploadPhotoFieldInput, testFile);
    userEvent.click(continueButtons[3]);

    expect(spiedAxiosInstance.mock.calls[0][0]).toEqual("/stats/set-ranking");
    expect(spiedAxiosInstance.mock.calls[0][1]).toStrictEqual({
      selfRank: "Intermediate",
    });
    await waitFor(() => {
      const requestData = spiedAxiosInstance.mock.calls[1][1];
      expect(spiedAxiosInstance.mock.calls[1][0]).toEqual("/stats");
      expect(requestData.get("weight")).toEqual("70");
      expect(requestData.get("musclesMass")).toEqual("100");
      expect(requestData.get("height")).toEqual("170");
      expect(requestData.get("fatPercentage")).toEqual("30");
      expect(requestData.get("file")).toBeInstanceOf(File);
    });

    const expectedMessageState = {
      messageTitle: "Initial Stats created!",
      message: "data",
      newMessage: true,
    };

    await waitFor(() => {
      expect(store.getState().messagesReducer).toStrictEqual(
        expectedMessageState
      );
      expect(spiedRouter.mock.calls[0][0]).toEqual(
        "/auth/registration/choose-workout"
      );
    });
  });

  test("should render the fields with the appropriate props (goal is lose fat)", () => {
    //display only requiredField
    render(
      <Provider store={store}>
        <SetInitialStats redirected={false} />
      </Provider>
    );

    const fatPercentageFieldCalls = spiedFatPercentageField.mock.calls;
    const musclesMassFieldCalls = spiedMusclesMassField.mock.calls;

    expect(fatPercentageFieldCalls[0][0].instructions).toEqual(
      "This field is optional"
    );
    expect(musclesMassFieldCalls[0][0].instructions).toEqual(
      "This field is optional"
    );

    expect(fatPercentageFieldCalls[0][0].title).toEqual(
      "What is your current fat percentage?"
    );
    expect(musclesMassFieldCalls[0][0].title).toEqual(
      "What is your current muscles mass?"
    );
  });

  test("should allow to skip the optional fields", async () => {
    render(
      <Provider store={store}>
        <SetInitialStats redirected={false} />
      </Provider>
    );

    const rankSelection = screen.getByText("Beginner");
    const input = screen.getByPlaceholderText("weight");
    const continueButtons = screen.getAllByText("Continue");
    const skipButtons = screen.getAllByText("Skip");

    userEvent.click(rankSelection);
    userEvent.type(input, "70");
    userEvent.click(continueButtons[0]);
    userEvent.click(skipButtons[0]);
    userEvent.click(skipButtons[1]);
    userEvent.click(skipButtons[2]);

    expect(spiedAxiosInstance.mock.calls[2][0]).toEqual("/stats/set-ranking");
    expect(spiedAxiosInstance.mock.calls[2][1]).toStrictEqual({
      selfRank: "Beginner",
    });
    await waitFor(() => {
      const requestData = spiedAxiosInstance.mock.calls[3][1];
      expect(spiedAxiosInstance.mock.calls[3][0]).toEqual("/stats");
      expect(requestData.get("weight")).toEqual("70");
      expect(requestData.get("musclesMass")).toEqual(null);
      expect(requestData.get("height")).toEqual(null);
      expect(requestData.get("fatPercentage")).toEqual(null);
      expect(requestData.get("file")).toEqual(null);
    });

    const expectedMessageState = {
      messageTitle: "Initial Stats created!",
      message: "data",
      newMessage: true,
    };

    await waitFor(() => {
      expect(store.getState().messagesReducer).toStrictEqual(
        expectedMessageState
      );
      expect(spiedRouter.mock.calls[0][0]).toEqual(
        "/auth/registration/choose-workout"
      );
    });
  });
});
