import { Follow, Rank } from "@/app/api/interfaces/social";

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface SocialSlice {
  follows: Follow[] | null;
  leaderboard: Rank[] | null;
}

const initialState: SocialSlice = {
  follows: null,
  leaderboard: null,
};

export const socialSlice = createSlice({
  name: "socialSlice",
  initialState,
  reducers: {
    setFollows: (state, action: PayloadAction<Follow[]>) => {
      state.follows = action.payload;
    },
    setLeaderboard: (state, action: PayloadAction<Rank[]>) => {
      state.leaderboard = action.payload;
    },
  },
});

export const { setFollows, setLeaderboard } = socialSlice.actions;

export default socialSlice.reducer;
