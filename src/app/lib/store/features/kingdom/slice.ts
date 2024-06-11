import { Kingdom } from "@/app/interfaces";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { emptyKingdom } from "./emptyKingdom";

export interface KingdomState {
  kingdom: Kingdom;
  selectedCell: number | null;
}

const initialState: KingdomState = {
  kingdom: emptyKingdom,
  selectedCell: null,
};

export const kingdomSlice = createSlice({
  name: "kingdom",
  initialState,
  reducers: {
    setKingdom: (state, action: PayloadAction<Kingdom>) => {
      state.kingdom = action.payload;
    },
    setSelectedCell: (state, action: PayloadAction<number | null>) => {
      state.selectedCell = action.payload;
    },
  },
});

export const { setKingdom, setSelectedCell } = kingdomSlice.actions;

export default kingdomSlice.reducer;
