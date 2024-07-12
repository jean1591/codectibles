import badgesReducer from "./features/badges/slice";
import { configureStore } from "@reduxjs/toolkit";
import interactionsReducer from "./features/interactions/slice";
import socialReducer from "./features/social/slice";
import statsReducer from "./features/stats/slice";
import userReducer from "./features/user/slice";

export const store = configureStore({
  reducer: {
    badges: badgesReducer,
    interactions: interactionsReducer,
    social: socialReducer,
    stats: statsReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
