import { settingsSliceActions } from "../../redux/slices/settings/settingsSlice";
import store from "../../redux/store/reduxStore";

describe("setting slice tests", () => {
  test("initial test", () => {
    const expectedState = { themeClass: "DarkMode" };

    expect(store.getState().settingsReducer).toStrictEqual(expectedState);
  });

  test("get theme", () => {
    store.dispatch(settingsSliceActions.getTheme());

    //default
    expect(store.getState().settingsReducer.themeClass).toBe("DarkMode");

    //from localStorage
    localStorage.setItem("theme", "LightMode");
    store.dispatch(settingsSliceActions.getTheme());
    expect(store.getState().settingsReducer.themeClass).toBe("LightMode");
  });

  test("change theme", () => {
    expect(localStorage.getItem("theme")).toBe("LightMode");
    store.dispatch(settingsSliceActions.changeTheme());
    expect(store.getState().settingsReducer.themeClass).toBe("DarkMode");
    expect(localStorage.getItem("theme")).toBe("DarkMode");

    store.dispatch(settingsSliceActions.changeTheme());
    expect(store.getState().settingsReducer.themeClass).toBe("LightMode");
    expect(localStorage.getItem("theme")).toBe("LightMode");
  });
});
