import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface InteractionSlice {
  displayGetEmojisModal: boolean;
}

const initialState: InteractionSlice = {
  displayGetEmojisModal: false,
};

export const interactionsSlice = createSlice({
  name: "interactionsSlice",
  initialState,
  reducers: {
    setDisplayGetEmojisModal: (state, action: PayloadAction<boolean>) => {
      state.displayGetEmojisModal = action.payload;
    },
    
  },
});

export const { setDisplayGetEmojisModal } = interactionsSlice.actions;

export default interactionsSlice.reducer;
