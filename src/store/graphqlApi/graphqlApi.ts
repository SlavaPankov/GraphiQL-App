import {
  BaseQueryApi,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { IGraphqlQueryDataState } from '@store/graphqlQueryData/graphqlQueryDataSlice';
import { RootState } from '@store/store';
import { getIntrospectionQuery } from 'graphql/utilities';

const getStateArgs = ({ getState }: BaseQueryApi): IGraphqlQueryDataState =>
  (getState() as RootState).graphqlQueryData;

export const graphqlApi = createApi({
  reducerPath: 'graphqlApi',
  baseQuery: fetchBaseQuery(),
  endpoints: (build) => ({
    getGraphQLResponse: build.query({
      queryFn: (_arg, api, _extraOptions, baseQuery) => {
        const { url, headers, query, variables } = getStateArgs(api);
        const body = { query, variables };
        return baseQuery({ url, method: 'POST', headers, body });
      },
    }),
    getSchema: build.query({
      queryFn(_arg, api, _extraOptions, baseQuery) {
        const { url, headers } = getStateArgs(api);
        const body = { query: getIntrospectionQuery() };
        return baseQuery({ url, method: 'POST', headers, body });
      },
    }),
  }),
});

export const { useLazyGetSchemaQuery, useLazyGetGraphQLResponseQuery } =
  graphqlApi;
