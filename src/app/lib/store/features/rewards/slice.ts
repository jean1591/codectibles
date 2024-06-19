import type { PayloadAction } from "@reduxjs/toolkit";
import { Reward } from "@/app/interfaces";
import { createSlice } from "@reduxjs/toolkit";

export interface RewardsState {
  isRewardsModalOpen: boolean;
  nextRewards: Reward[];
  rewards: Reward[];
}

const initialState: RewardsState = {
  isRewardsModalOpen: false,
  nextRewards: [],
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
    setNextRewards: (state, action: PayloadAction<Reward[]>) => {
      state.nextRewards = action.payload;
    },
    setRewards: (state, action: PayloadAction<Reward[]>) => {
      state.rewards = action.payload;
    },
  },
});

export const {
  claimReward,
  setIsRewardsModalOpen,
  setNextRewards,
  setRewards,
} = rewardsSlice.actions;

export default rewardsSlice.reducer;
