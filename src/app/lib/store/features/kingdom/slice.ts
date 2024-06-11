import { Kingdom } from "@/app/interfaces";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { preFilledKingdom } from "./preFilledlKingdom";

export interface KingdomState {
  coins: number;
  kingdom: Kingdom;
}

const initialState: KingdomState = {
  coins: 10,
  kingdom: preFilledKingdom,
};

export const kingdomSlice = createSlice({
  name: "kingdom",
  initialState,
  reducers: {
    setCoins: (state, action: PayloadAction<number>) => {
      state.coins = action.payload
    },
    setKingdom: (state, action: PayloadAction<Kingdom>) => {
      state.kingdom = action.payload;
    },
  },
});

export const { setCoins, setKingdom } = kingdomSlice.actions;

export default kingdomSlice.reducer;
