import type { PayloadAction } from "@reduxjs/toolkit";
import { Stat } from "@/app/api/interfaces/stats";
import { createSlice } from "@reduxjs/toolkit";

export interface StatsSlice {
  stats: Stat[] | null;
}

const initialState: StatsSlice = {
  stats: null,
};

export const statsSlice = createSlice({
  name: "statsSlice",
  initialState,
  reducers: {
    setStats: (state, action: PayloadAction<Stat[]>) => {
      state.stats = action.payload;
    },
    updateStat: (state, action: PayloadAction<Stat>) => {
      if (state.stats) {
        const statsWithoutCurrentStat: Stat[] = state.stats.filter(
          (stat) => stat.type !== action.payload.type
        );

        state.stats = [...statsWithoutCurrentStat, action.payload];
      }
    },
  },
});

export const { setStats, updateStat } = statsSlice.actions;

export default statsSlice.reducer;
