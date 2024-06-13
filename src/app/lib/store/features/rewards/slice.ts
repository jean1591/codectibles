import type { PayloadAction } from "@reduxjs/toolkit";
import { Reward } from "@/app/interfaces";
import { createSlice } from "@reduxjs/toolkit";

export interface RewardsState {
  isRewardsModalOpen: boolean;
  rewards: Reward[];
}

const initialState: RewardsState = {
  isRewardsModalOpen: false,
  rewards: [],
};

export const rewardsSlice = createSlice({
  name: "rewardsSlice",
  initialState,
  reducers: {
    claimReward: (state, action: PayloadAction<string>) => {
      state.rewards = state.rewards.filter(
        ({ title }) => title !== action.payload
      );
    },
    setIsRewardsModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isRewardsModalOpen = action.payload;
    },
    setRewards: (state, action: PayloadAction<Reward[]>) => {
      state.rewards = action.payload;
    },
  },
});

export const { claimReward, setIsRewardsModalOpen, setRewards } =
  rewardsSlice.actions;

export default rewardsSlice.reducer;
