import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface State {
  endpoint: string;
  query: string;
  headers: string;
  variables: string;
}

const initialState = (): State => ({
  endpoint: 'https://rickandmortyapi.graphcdn.app/',
  query: '',
  headers: '',
  variables: '',
});

const { actions, reducer } = createSlice({
  name: 'graphqlQueryData',
  initialState,
  reducers: {
    setGQLEndpoint(state, { payload }: PayloadAction<State['endpoint']>) {
      state.endpoint = payload;
    },
    setGQLQuery(state, { payload }: PayloadAction<State['query']>) {
      state.query = payload;
    },
    setGQLHeaders(state, { payload }: PayloadAction<State['headers']>) {
      state.headers = payload;
    },
    setGQLVariables(state, { payload }: PayloadAction<State['variables']>) {
      state.variables = payload;
    },
  },
});

export const graphqlQueryDataReducer = reducer;
export const { setGQLEndpoint, setGQLQuery, setGQLHeaders, setGQLVariables } =
  actions;
