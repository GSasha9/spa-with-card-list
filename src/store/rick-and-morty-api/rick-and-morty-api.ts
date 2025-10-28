import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '../../shared/constants';
import type { Character } from '../../shared/interfaces';
import type { CharactersAPIResponse } from '../../shared/interfaces';

export const rickAndMortyApi = createApi({
  reducerPath: 'rickAndMortyApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getAllCharacters: builder.query<CharactersAPIResponse, undefined>({
      query: () => `/character`,
    }),
    getCharacterById: builder.query<Character, number>({
      query: (id) => `/character/${id}`,
    }),
  }),
});

export const { useGetAllCharactersQuery, useGetCharacterByIdQuery } =
  rickAndMortyApi;
