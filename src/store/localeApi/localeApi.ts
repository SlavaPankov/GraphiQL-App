import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const localeApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getLocale: builder.query<Record<string, string>, string>({
      query: (locale) => `localization/${locale}/localization.json`,
    }),
  }),
});

export const { useGetLocaleQuery } = localeApi;
