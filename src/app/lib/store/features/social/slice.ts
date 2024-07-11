import type { PayloadAction } from "@reduxjs/toolkit";
import { Rank } from "@/app/api/interfaces/leaderboard";
import { createSlice } from "@reduxjs/toolkit";

export interface SocialSlice {
  leaderboard: Rank[] | null;
}

const initialState: SocialSlice = {
  leaderboard: null,
};

export const socialSlice = createSlice({
  name: "socialSlice",
  initialState,
  reducers: {
    setLeaderboard: (state, action: PayloadAction<Rank[]>) => {
      state.leaderboard = action.payload;
    },
  },
});

export const { setLeaderboard } = socialSlice.actions;

export default socialSlice.reducer;
