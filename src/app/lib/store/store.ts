import { configureStore } from "@reduxjs/toolkit";
import kingdomReducer from "./features/kingdom/slice";
import rewardsReducer from "./features/rewards/slice";
import userReducer from "./features/user/slice";

export const store = configureStore({
  reducer: {
    kingdom: kingdomReducer,
    rewards: rewardsReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
