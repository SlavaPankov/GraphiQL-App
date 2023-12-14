import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { RootState } from '@store/store';

const graphqlBaseQuery: BaseQueryFn = async (_, { getState }) => {
  try {
    const { graphqlQueryData } = getState() as RootState;
    const { endpoint, query, variables, headers } = graphqlQueryData;

    const body = { query, variables };

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: JSON.stringify(body),
    });

    const data = (await res.json()) as unknown;

    return { data };
  } catch (error) {
    return { error };
  }
};

export const graphqlApi = createApi({
  reducerPath: 'graphqlApi',
  baseQuery: graphqlBaseQuery,
  endpoints: (build) => ({
    getGraphQLResponse: build.query({
      query: () => '/',
      transformResponse: (data) => JSON.stringify(data, null, 2),
    }),
  }),
});

export const { useGetGraphQLResponseQuery, useLazyGetGraphQLResponseQuery } =
  graphqlApi;
