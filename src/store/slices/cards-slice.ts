import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
interface CardsState {
  selectedCards: number[];
  deletedCards: number[];
}

const initialState: CardsState = {
  selectedCards: [],
  deletedCards: [],
};

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
    deleteCard: (state, action: PayloadAction<number>) => {
      state.deletedCards.push(action.payload);
    },
  },
});

export const { selectCard, deleteCard } = cardsSlice.actions;

export default cardsSlice.reducer;
