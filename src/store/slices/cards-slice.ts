import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Character } from '../../shared/interfaces';

interface CardsState {
  cards: Character[];
  selectedCards: Character[];
}

const initialState: CardsState = {
  cards: [],
  selectedCards: [],
};

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    selectCard: (state, action: PayloadAction<Character>) => {
      const alreadySelected = state.selectedCards.find(
        (card) => card.id === action.payload.id
      );

      if (!alreadySelected) state.selectedCards.push(action.payload);
    },
    deselectCard: (state, action: PayloadAction<Character>) => {
      state.selectedCards.filter((card) => card.id !== action.payload.id);
    },
    deleteCard: (state, action: PayloadAction<Character>) => {
      state.cards = state.cards.filter((el) => el.id !== action.payload.id);
    },
  },
});

export const { selectCard, deselectCard, deleteCard } = cardsSlice.actions;

export default cardsSlice.reducer;
