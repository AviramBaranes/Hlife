import { createSlice } from "@reduxjs/toolkit";

const initialState: { themeClass: "DarkMode" | "LightMode" } = {
  themeClass: "DarkMode",
};

const settingsSlice = createSlice({
  name: "appSetting",
  initialState,
  reducers: {
    getTheme(state) {
      state.themeClass =
        (localStorage.getItem("theme") as "DarkMode" | "LightMode") ||
        "DarkMode";
    },
    changeTheme(state) {
      if (state.themeClass === "DarkMode") {
        localStorage.setItem("theme", "LightMode");
        state.themeClass = "LightMode";
        return;
      }
      if (state.themeClass === "LightMode") {
        localStorage.setItem("theme", "DarkMode");
        state.themeClass = "DarkMode";
        return;
      }
    },
  },
});

export default settingsSlice.reducer;
export const settingsSliceActions = settingsSlice.actions;
