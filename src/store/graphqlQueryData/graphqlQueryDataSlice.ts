import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isStringHashTable } from '@utils/typeguards/is-string-hash-table';
import { IntrospectionQuery } from 'graphql/utilities';

export const defaultEndpoint = 'https://rickandmortyapi.graphcdn.app/';

export interface IGraphqlQueryDataState {
  url: string;
  query: string;
  headers: Record<string, string>;
  variables: Record<string, string>;
  response: string;
  sdlIntrospection: IntrospectionQuery | null;
}

const { actions, reducer } = createSlice({
  name: 'graphqlQueryData',
  initialState: (): IGraphqlQueryDataState => ({
    url: defaultEndpoint,
    query: 'query($v:String){characters(filter:{name:$v}){results{name}}}',
    headers: {},
    variables: {},
    response: '',
    sdlIntrospection: null,
  }),
  reducers: {
    setGQLUrl(state, { payload }: PayloadAction<string>) {
      state.url = payload;
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
    setGQLSDLIntrospection(
      state,
      { payload }: PayloadAction<IntrospectionQuery>
    ) {
      return { ...state, sdlIntrospection: payload };
    },
  },
});

export const graphqlQueryDataReducer = reducer;
export const {
  setGQLUrl,
  setGQLQuery,
  setGQLHeaders,
  setGQLVariables,
  setGQLResponse,
  setGQLSDLIntrospection,
} = actions;
