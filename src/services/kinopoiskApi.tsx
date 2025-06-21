import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const kinopoiskApiKey = import.meta.env.VITE_KINOPOISK_KEY;

export const kinopoiskApi = createApi({
  reducerPath: 'kinopoiskApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://kinopoiskapiunofficial.tech/api',
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      headers.set('X-API-KEY', kinopoiskApiKey);
    },
  }),
  endpoints: (builder) => ({
    getFilmsTop: builder.query({
      query: ({ type, page }) =>
        `v2.2/films/collections?type=${type}&page=${page}`,
    }),
    getFilms: builder.query({
      query: ({ keyword = '' }) =>
        `v2.1/films/search-by-keyword?keyword=${keyword}&page=1`,
    }),
    getMovieById: builder.query({
      query: (id) => `v2.2/films/${id}`,
    }),
  }),
});

export const {
  useGetFilmsTopQuery,
  useGetFilmsQuery,
  useGetMovieByIdQuery,
} = kinopoiskApi;
