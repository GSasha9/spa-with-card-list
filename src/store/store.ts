import { configureStore } from '@reduxjs/toolkit';

import { rickAndMortyApi } from './rick-and-morty-api/rick-and-morty-api';
import cardsReducer from './slices/cards-slice';

export const store = configureStore({
  reducer: {
    [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
    cards: cardsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rickAndMortyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
