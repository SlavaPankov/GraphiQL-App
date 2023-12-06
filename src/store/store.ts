import { configureStore } from '@reduxjs/toolkit';
import { localeApi } from './localeApi/localeApi';

const store = configureStore({
  reducer: {
    [localeApi.reducerPath]: localeApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localeApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
