import { configureStore } from "@reduxjs/toolkit";
import interactionsReducer from "./features/interactions/slice";
import userReducer from "./features/user/slice";

export const store = configureStore({
  reducer: {
    interactions: interactionsReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
