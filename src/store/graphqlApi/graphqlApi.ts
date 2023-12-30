import {
  BaseQueryApi,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { IGraphqlQueryDataState } from '@store/graphqlQueryData/graphqlQueryDataSlice';
import { RootState } from '@store/store';
import { getIntrospectionQuery, IntrospectionQuery } from 'graphql/utilities';
import { parseIntrospection } from '@utils/parseIntrospection';

const getStateArgs = ({ getState }: BaseQueryApi): IGraphqlQueryDataState =>
  (getState() as RootState).graphqlQueryData;

export const graphqlApi = createApi({
  reducerPath: 'graphqlApi',
  baseQuery: fetchBaseQuery(),
  endpoints: (build) => ({
    getGraphQLResponse: build.query<string, unknown>({
      async queryFn(_arg, api, _extraOptions, baseQuery) {
        const { url, headers, query, variables } = getStateArgs(api);
        const body = { query, variables };
        const method = 'POST';
        const { error, data } = await baseQuery({ url, method, headers, body });
        return error ? { error } : { data: JSON.stringify(data, null, 2) };
      },
    }),
    getSchema: build.query<IntrospectionQuery, unknown>({
      async queryFn(_arg, api, _extraOptions, baseQuery) {
        const { url, headers } = getStateArgs(api);
        const body = { query: getIntrospectionQuery() };
        const method = 'POST';
        const { error, data } = await baseQuery({ url, method, headers, body });
        return error ? { error } : { data: await parseIntrospection(data) };
      },
    }),
  }),
});

export const { useLazyGetSchemaQuery, useLazyGetGraphQLResponseQuery } =
  graphqlApi;
