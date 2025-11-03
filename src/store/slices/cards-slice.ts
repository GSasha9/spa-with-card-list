import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

import { BASE_URL, ERROR_MESSAGES } from '../../shared/constants';
import type {
  Character,
  CreateProductFormValues,
} from '../../shared/interfaces';

interface CardsState {
  selectedCards: number[];
  cards: Character[];
  createdCard: CreateProductFormValues[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CardsState = {
  selectedCards: [],
  cards: [],
  createdCard: [],
  isLoading: false,
  error: null,
};

export const fetchAllCards = createAsyncThunk<
  Character[],
  undefined,
  { rejectValue: string }
>('cards/fetchAll', async (_, { rejectWithValue }) => {
  try {
    let allCards: Character[] = [];
    let nextUrl: string | null = `${BASE_URL}/character`;

    while (nextUrl) {
      const response = await fetch(nextUrl);

      if (!response.ok) {
        throw new Error(ERROR_MESSAGES.responseErr);
      }

      const data = await response.json();

      allCards = [...allCards, ...data.results];
      nextUrl = data.info.next;
    }

    return allCards;
  } catch (error: unknown) {
    if (error instanceof Error) return rejectWithValue(error.message);

    return rejectWithValue(ERROR_MESSAGES.unknownErr);
  }
});

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    selectCard: (state, action: PayloadAction<number>) => {
      const alreadySelected = state.selectedCards.find(
        (card) => card === action.payload
      );

      if (!alreadySelected) {
        state.selectedCards.push(action.payload);
      } else {
        state.selectedCards = state.selectedCards.filter(
          (card) => card !== action.payload
        );
      }
    },
    deleteCard: (
      state,
      action: PayloadAction<Character | CreateProductFormValues>
    ) => {
      state.cards = state.cards.filter((card) => card.id !== action.payload.id);
      state.createdCard = state.createdCard.filter(
        (card) => card.id !== action.payload.id
      );
    },
    createCard: (state, action: PayloadAction<CreateProductFormValues>) => {
      state.createdCard.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCards.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllCards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cards = action.payload;
      })
      .addCase(fetchAllCards.rejected, (state) => {
        state.isLoading = false;
        state.error = ERROR_MESSAGES.smthWentWrong;
      });
  },
});

export const { selectCard, deleteCard, createCard } = cardsSlice.actions;

export default cardsSlice.reducer;
