import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { isStringHashTable } from '@utils/typeguards/is-string-hash-table';

export interface IGraphqlQueryDataState {
  endpoint: string;
  query: string;
  headers: Record<string, string>;
  variables: Record<string, string>;
  response: string;
}

const { actions, reducer } = createSlice({
  name: 'graphqlQueryData',
  initialState: (): IGraphqlQueryDataState => ({
    endpoint: 'https://rickandmortyapi.graphcdn.app/',
    query: 'query($v:String){characters(filter:{name:$v}){results{name}}}',
    headers: {},
    variables: {},
    response: '',
  }),
  reducers: {
    setGQLEndpoint(state, { payload }: PayloadAction<string>) {
      state.endpoint = payload;
    },
    setGQLQuery(state, { payload }: PayloadAction<string>) {
      state.query = payload;
    },
    setGQLHeaders(state, { payload }: PayloadAction<string>) {
      try {
        const parsed = JSON.parse(payload) as unknown;
        state.headers = isStringHashTable(parsed) ? parsed : {};
      } catch (error) {
        state.headers = {};
      }
    },
    setGQLVariables(state, { payload }: PayloadAction<string>) {
      try {
        const parsed = JSON.parse(payload) as unknown;
        state.variables = isStringHashTable(parsed) ? parsed : {};
      } catch (error) {
        state.variables = {};
      }
    },
    setGQLResponse(state, { payload }: PayloadAction<string>) {
      state.response = payload;
    },
  },
});

export const graphqlQueryDataReducer = reducer;
export const {
  setGQLEndpoint,
  setGQLQuery,
  setGQLHeaders,
  setGQLVariables,
  setGQLResponse,
} = actions;
