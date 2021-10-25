import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loadingSlice',
  initialState: { loading: false },
  reducers: {
    setToTrue(state) {
      state.loading = true;
    },
    setToFalse(state) {
      state.loading = false;
    },
  },
});
export default loadingSlice.reducer;
export const loadingAction = loadingSlice.actions;
