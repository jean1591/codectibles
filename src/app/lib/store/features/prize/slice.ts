import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface PrizeState {
  isPrizesModalOpen: boolean;
}

const initialState: PrizeState = {
  isPrizesModalOpen: false
};

export const prizeSlice = createSlice({
  name: "prizeSlice",
  initialState,
  reducers: {
    setIsPrizesModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isPrizesModalOpen = action.payload
    },
  },
});

export const { setIsPrizesModalOpen } = prizeSlice.actions;

export default prizeSlice.reducer;
