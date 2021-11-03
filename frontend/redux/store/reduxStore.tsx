import { configureStore } from '@reduxjs/toolkit';

import usersReducer from '../slices/auth/authSlice';
import errorsReducer from '../slices/errors/errorsSlice';
import messagesReducer from '../slices/messages/messagesSlice';
import goalsReducer from '../slices/goals/goalsSlice';
import statsReducer from '../slices/stats/statsSlice';
import settingsReducer from '../slices/settings/settingsSlice';
import loadingReducer from '../slices/loading/loadingSlice';

const store = configureStore({
  reducer: {
    usersReducer,
    errorsReducer,
    messagesReducer,
    goalsReducer,
    statsReducer,
    settingsReducer,
    loadingReducer,
  },
});
export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
