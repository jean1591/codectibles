import { Prize } from "@/app/interfaces";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialPrizes: Prize[] = [
  { title: "12 PR milestone 📍", prize: 10 },
  { title: "Documentation guru 📝", prize: 50 },
]

export interface PrizeState {
  isPrizesModalOpen: boolean;
  prizes: Prize[];
}

const initialState: PrizeState = {
  isPrizesModalOpen: false,
  prizes: initialPrizes,
};

export const prizeSlice = createSlice({
  name: "prizeSlice",
  initialState,
  reducers: {
    claimPrize: (state, action: PayloadAction<string>) => {
      state.prizes = state.prizes.filter(({title}) => title !== action.payload)
    },
    setIsPrizesModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isPrizesModalOpen = action.payload
    },
  },
});

export const { claimPrize, setIsPrizesModalOpen } = prizeSlice.actions;

export default prizeSlice.reducer;
