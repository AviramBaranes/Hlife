import { createSlice } from '@reduxjs/toolkit';

const initialState  = { loading: false }

const loadingSlice = createSlice({
  name: 'loadingSlice',
  initialState ,
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
