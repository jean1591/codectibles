import { Badge, FormatedBadges, UserBadge } from "@/app/api/interfaces/badge";

import type { PayloadAction } from "@reduxjs/toolkit";
import { badges } from "@/app/api/badges/constants/badges";
import { createSlice } from "@reduxjs/toolkit";

export interface BadgesSlice {
  claimed: UserBadge[] | null;
  locked: Badge[];
  unlocked: Badge[] | null;
}

const initialState: BadgesSlice = {
  claimed: null,
  locked: badges,
  unlocked: null,
};

export const badgesSlice = createSlice({
  name: "badgesSlice",
  initialState,
  reducers: {
    setBadges: (state, action: PayloadAction<FormatedBadges>) => {
      state.claimed = action.payload.claimed;
      state.locked = action.payload.locked;
      state.unlocked = action.payload.unlocked;
    },
    claimBadge: (state, action: PayloadAction<Badge>) => {
      if (state.claimed && state.unlocked) {
        // Add to claimed
        state.claimed = [
          ...state.claimed,
          { ...action.payload, unlockedAt: new Date().toISOString() },
        ];

        // Remove from unlocked
        state.unlocked = state.unlocked.filter(
          ({ id }) => id !== action.payload.id
        );
      }
    },
  },
});

export const { claimBadge, setBadges } = badgesSlice.actions;

export default badgesSlice.reducer;
