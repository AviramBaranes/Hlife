import "@testing-library/jest-dom";
import { render, screen, waitFor,MatcherFunction  } from "@testing-library/react";
import { Provider } from "react-redux";

import store from "../../../redux/store/reduxStore";
import userEvent from "@testing-library/user-event";
import CreateDefaultWorkout from "../../../components/Registration/workout/CreateDefaultWorkout";
import axiosInstance from "../../../utils/axios/axiosInstance";
import router from "next/router";
import { act } from "react-dom/test-utils";

jest.setTimeout(30000);

const withMarkup = (query: any) => (text: string): HTMLElement =>
  query((content: string, node: HTMLElement) => {
    const hasText = (node: HTMLElement) => node.textContent === text
    const childrenDontHaveText = Array.from(node.children).every(
      child => !hasText(child as HTMLElement)
    )
    return hasText(node) && childrenDontHaveText
  })

describe("Create default workout tests", () => {
  let spiedAxios: jest.SpyInstance;
  let spiedRouter: jest.SpyInstance;

  beforeAll(() => {
    window.scroll = jest.fn()
    window.scrollTo = jest.fn()
    spiedAxios = jest
      .spyOn(axiosInstance, "post")
      .mockImplementation(async () => "");
    spiedRouter = jest.spyOn(router, "push");
  });

  test("should handle submission", async () => {
    const { container } = render(
      <Provider store={store}>
        <CreateDefaultWorkout programStyle="AB" />
      </Provider>
    );


    const generalForm = screen.getAllByTestId("GeneralForm");
    const title = screen.getByText('Create A-Workout :')
    const notRenderedTitle = screen.queryByText('Create B-Workout :')

    expect(generalForm.length).toBe(1)
    expect(title).toBeInTheDocument()
    expect(notRenderedTitle).not.toBeInTheDocument()


    const workoutNameInput_A =screen.getByLabelText('Workout name');
    const timeInput_A = screen.getByLabelText('Total time')

    userEvent.type(workoutNameInput_A, "Legs");
    userEvent.type(timeInput_A, "01:30");

    const submitBtn = screen.getByText("Submit");
    const exerciseNameInput = screen.getAllByTestId('customInput')
    const repsInput = screen.getAllByTestId('repsInput')
    const setsInput = screen.getAllByTestId('setsInput')
    const addBtn = screen.getAllByText("Add");

    for (let i = 0; i <= 2; i++) {
      userEvent.type(exerciseNameInput[i].children[0], "data" + i);
      userEvent.type(repsInput[i].children[0], (1 + i).toString());
      userEvent.type(setsInput[i].children[0], (1 + i).toString());
      userEvent.click(addBtn[i]);
    }

    const getByTextWithMarkup = withMarkup(screen.getByText)

    const domElements_A = [
      getByTextWithMarkup("Exercise: data0"),
      getByTextWithMarkup("Exercise: data1"),
      getByTextWithMarkup("Exercise: data2"),
      getByTextWithMarkup("Reps: 1"),
      getByTextWithMarkup("Reps: 2"),
      getByTextWithMarkup("Reps: 3"),
      getByTextWithMarkup("Sets: 1"),
      getByTextWithMarkup("Sets: 2"),
      getByTextWithMarkup("Sets: 3"),
    ];

    domElements_A.forEach((el) => expect(el).toBeInTheDocument());

    act(() => {
      userEvent.click(submitBtn);
    });

    const expectedBodyRequest_A = {
      trainingDayName: "A",
      name: "Legs",
      time: 90,
      exercises: [
        {
          name: "data0",
          sets: 1,
          reps: 1,
        },
        {
          name: "data1",
          sets: 2,
          reps: 2,
        },
        {
          name: "data2",
          sets: 3,
          reps: 3,
        },
      ],
    };
    await waitFor(() => {
      expect(spiedAxios.mock.calls[0][0]).toBe("/workout");
      expect(spiedAxios.mock.calls[0][1]).toStrictEqual(expectedBodyRequest_A);
    });


    const generalForm2 = screen.getAllByTestId("GeneralForm");
    const title2 = screen.getByText('Create B-Workout :')
    const notRenderedTitle2 = screen.queryByText('Create A-Workout :')

    expect(generalForm2.length).toBe(1)
    expect(title2).toBeInTheDocument() 
    expect(notRenderedTitle2).not.toBeInTheDocument()

    const workoutNameInput_B = screen.getByLabelText('Workout name')
    const timeInput_B = screen.getByLabelText('Total time')

    userEvent.type(workoutNameInput_B, "Chest");
    userEvent.type(timeInput_B, "03:00");

    const exerciseNameInput_B = screen.getAllByTestId('customInput')
    const submitBtn_B = screen.getByText("Submit");
    const repsInput_B = screen.getAllByTestId('repsInput')
    const setsInput_B = screen.getAllByTestId('setsInput')
    const addBtn_B = screen.getAllByText("Add");

    for (let i = 0; i <= 2; i++) {
      userEvent.type(exerciseNameInput_B[i].children[0], "data" + (i+4));
      userEvent.type(repsInput_B[i].children[0], (4 + i).toString());
      userEvent.type(setsInput_B[i].children[0], (4 + i).toString());
      userEvent.click(addBtn_B[i]);
    }
    const domElements_B = [
      getByTextWithMarkup("Exercise: data4"),
      getByTextWithMarkup("Exercise: data5"),
      getByTextWithMarkup("Exercise: data6"),
      getByTextWithMarkup("Reps: 4"),
      getByTextWithMarkup("Reps: 5"),
      getByTextWithMarkup("Reps: 6"),
      getByTextWithMarkup("Sets: 4"),
      getByTextWithMarkup("Sets: 5"),
      getByTextWithMarkup("Sets: 6"),
    ];

    domElements_B.forEach((el) => expect(el).toBeInTheDocument());
    userEvent.click(submitBtn_B);

    const expectedBodyRequest_B = {
      trainingDayName: "B",
      name: "Chest",
      time: 180,
      exercises: [
        {
          name: "data4",
          sets: 4,
          reps: 4,
        },
        {
          name: "data5",
          sets: 5,
          reps: 5,
        },
        {
          name: "data6",
          sets: 6,
          reps: 6,
        },
      ],
    };

    await waitFor(() => {
      expect(spiedAxios.mock.calls[1][0]).toBe("/workout");
      expect(spiedAxios.mock.calls[1][1]).toStrictEqual(expectedBodyRequest_B);
      expect(spiedAxios.mock.calls[2][0]).toBe("/workout/hasAllWorkout");
      expect(spiedRouter.mock.calls[0][0]).toBe(
        "/auth/registration/schedule-program"
      );
    });
  });
});
