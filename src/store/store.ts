import { configureStore } from '@reduxjs/toolkit';
import { localeApi } from './localeApi/localeApi';
import { graphqlQueryDataReducer } from './graphqlQueryData/graphqlQueryDataSlice';

const store = configureStore({
  reducer: {
    [localeApi.reducerPath]: localeApi.reducer,
    graphqlQueryData: graphqlQueryDataReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localeApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
