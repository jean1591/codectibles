import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./features/navigation/slice";
import rewardsReducer from "./features/rewards/slice";
import userReducer from "./features/user/slice";
import zooReducer from "./features/zoo/slice";

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    rewards: rewardsReducer,
    user: userReducer,
    zoo: zooReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
