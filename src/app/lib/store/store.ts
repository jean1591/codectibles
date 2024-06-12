import { configureStore } from "@reduxjs/toolkit";
import kingdomReducer from "./features/kingdom/slice";
import rewardsReducer from "./features/rewards/slice";

export const store = configureStore({
  reducer: {
    kingdom: kingdomReducer,
    rewards: rewardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
