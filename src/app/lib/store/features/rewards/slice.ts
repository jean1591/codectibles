import { Reward } from "@/app/interfaces";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialRewards: Reward[] = [
  { title: "12 PR milestone 📍", reward: 10 },
  { title: "Documentation guru 📝", reward: 50 },
]

export interface RewardsState {
  isRewardsModalOpen: boolean;
  rewards: Reward[];
}

const initialState: RewardsState = {
  isRewardsModalOpen: false,
  rewards: initialRewards,
};

export const rewardsSlice = createSlice({
  name: "rewardsSlice",
  initialState,
  reducers: {
    claimReward: (state, action: PayloadAction<string>) => {
      state.rewards = state.rewards.filter(({title}) => title !== action.payload)
    },
    setIsRewardsModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isRewardsModalOpen = action.payload
    },
  },
});

export const { claimReward, setIsRewardsModalOpen } = rewardsSlice.actions;

export default rewardsSlice.reducer;
