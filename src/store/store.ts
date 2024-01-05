import { configureStore } from '@reduxjs/toolkit';
import { graphqlApi } from './graphqlApi/graphqlApi';
import { graphqlQueryDataReducer } from './graphqlQueryData/graphqlQueryDataSlice';
import { localeApi } from './localeApi/localeApi';

const store = configureStore({
  reducer: {
    [localeApi.reducerPath]: localeApi.reducer,
    [graphqlApi.reducerPath]: graphqlApi.reducer,
    graphqlQueryData: graphqlQueryDataReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localeApi.middleware, graphqlApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
