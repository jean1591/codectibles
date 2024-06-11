import { configureStore } from "@reduxjs/toolkit";
import kingdomReducer from "./features/kingdom/slice";

export const store = configureStore({
  reducer: {
    kingdom: kingdomReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
